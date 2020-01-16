const {
	sources,
	builds,
	checksum,
	fileExist
} = require("../helpers/filesystem");
const jade = require("../compilers/jade");
const ts = require("../compilers/typescript");
const fs = require("fs");
const glob = require("glob");
const component = require("./component");

class Bootstrap {
	constructor(name) {
		this.name = name;
	}

	files() {
		const files = [];

		files.push(
			...glob.sync(sources + "/bootstraps/" + this.name + "/**/*.jade")
		);

		return files;
	}

	checksum() {
		return this.files()
			.map(file => checksum(file))
			.join(":");
	}

	changed() {
		return true;
		const path = "/bootstraps/" + this.name;
		const buildDir = this.buildDir ? this.buildDir : builds + path;
		try {
			const builded = fs
				.readFileSync(builds + path + "/" + this.name + ".checksum")
				.toString();
			return builded !== this.checksum();
		} catch (e) {}
		return true;
	}

	paths() {
		const components = component.all();
		let result = {};
		components.forEach(c => {
			result[c.name] = c.requirePath();
		});
		return result;
	}

	task() {
		return `[bootstrap] ${this.name}`;
	}

	build() {
		const path = "/bootstraps/" + this.name;
		const promises = [];
		const buildDir = this.buildDir ? this.buildDir : builds + path;

		if (fileExist(sources + path + "/index.jade")) {
			promises.push(
				...jade.compileFile(sources + path + "/index.jade", buildDir, {
					env: {
						paths: this.paths()
					},
					onBuild: () => {},
					onEnd: () => {
						fs.writeFileSync(
							buildDir + "/" + this.name + ".checksum",
							this.checksum()
						);
					}
				})
			);
		}

		if (fileExist(sources + path + "/index.ts")) {
			promises.push(
				...ts.compileFile(
					sources + path + "/index.ts",
					buildDir + "/index.js",
					{
						env: {
							paths: this.paths()
						},
						onBuild: () => {},
						onEnd: () => {
							fs.writeFileSync(
								builds + path + "/" + this.name + ".checksum",
								this.checksum()
							);
						}
					}
				)
			);
		}
		return promises;
	}
}

function all() {
	const dir = sources + "/bootstraps";
	return fs.readdirSync(dir).map(path => new Bootstrap(path));
}

function withName(name) {
	return new Bootstrap(name);
}

exports.withName = withName;
exports.all = all;
