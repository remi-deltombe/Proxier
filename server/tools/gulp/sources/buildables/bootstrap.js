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
		const path = "/bootstraps/" + this.name + "/" + this.name;
		try {
			const builded = fs
				.readFileSync(builds + path + ".checksum")
				.toString();
			return builded !== this.checksum();
		} catch (e) {}
		return true;
	}

	paths() {
		const components = component.all();
		let result = {};
		components.forEach(c => {
			result[c.name] = c.path();
		});
		return result;
	}

	build() {
		const path = "/bootstraps/" + this.name;
		const promises = [];
		if (fileExist(sources + path + "/index.jade")) {
			promises.push(
				...jade.compileFile(
					sources + path + "/index.jade",
					builds + path,
					{
						env: {
							paths: this.paths()
						},
						onBuild: () => {
							console.log("[build] jade:bootstrap/" + this.name);
						},
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

		if (fileExist(sources + path + "/index.ts")) {
			promises.push(
				...ts.compileFile(
					sources + path + "/index.ts",
					builds + path + "/index.js",
					{
						env: {
							paths: this.paths()
						},
						onBuild: () => {
							console.log("[build] jade:bootstrap/" + this.name);
						},
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

exports.all = all;
