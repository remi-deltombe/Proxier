const {
	root,
	sources,
	builds,
	checksum,
	isDir
} = require("../helpers/filesystem");
const ts = require("../compilers/typescript");
const fs = require("fs");
const glob = require("glob");
const bootstrap = require("./bootstrap");
const replace = require("gulp-replace");

class Component {
	constructor(name) {
		this.name = name;
	}

	definition() {
		return (
			"../../../builds/components/" +
			this.name +
			"/" +
			this.name +
			".d.ts"
		);
	}

	path() {
		return builds + "/components/" + this.name + "/" + this.name;
	}

	js() {
		return "../../" + this.name + "/" + this.name + ".js";
	}

	requirePath() {
		return "../../components/" + this.name + "/" + this.name;
	}

	files() {
		const files = [];

		files.push(
			...glob.sync(
				sources + "/components/" + this.name + "/sources/**/*.ts"
			)
		);
		files.push(
			...glob.sync(
				sources + "/components/" + this.name + "/sources/**/*.tsx"
			)
		);

		return files;
	}

	checksum() {
		return this.files()
			.concat(
				glob.sync(
					sources + "/components/" + this.name + "/host/**/*.tsx"
				)
			)
			.concat(this.dependencies().map(dep => dep.definition()))
			.map(file => checksum(file))
			.join(":");
	}

	changed() {
		if (!this._changedDone) {
			this._changed = false;
			this._changedDone = true;
			const path = "/components/" + this.name + "/" + this.name;
			try {
				const builded = fs
					.readFileSync(builds + path + ".checksum")
					.toString();
				this._changed = builded !== this.checksum();
			} catch (e) {
				this._changed = true;
			}
			for (const dep of this.dependencies()) {
				this._changed = this._changed || dep.changed();
			}
		}
		return this._changed;
	}

	build() {
		this._changedDone = false;
		if (!this.changed) {
			console.log("not build");
			return [Promise.resolve()];
		}
		const path = "/components/" + this.name;
		const result = [
			ts.compileFile(
				sources + path + "/" + this.name + ".ts",
				builds + path + "/" + this.name + ".js",
				{
					pipes: [replace("sources/", this.name + "/sources/")],
					refs: this.dependencies().map(component =>
						component.definition()
					),
					sourceRoot: "sources/components",
					onEnd: () => {
						fs.writeFileSync(
							builds + path + "/" + this.name + ".checksum",
							this.checksum()
						);
					}
				}
			)
		];

		const hasHost = isDir(sources + path + "/host");
		if (hasHost) {
			const hostBootstrap = bootstrap.withName("host");
			hostBootstrap.buildDir = builds + path + "/host";
			result.push(
				...hostBootstrap.build(),
				ts.compileFile(
					sources + path + "/host/index.tsx",
					builds + path + "/host/index.js",
					{
						pipes: [replace("sources/", this.name + "/sources/")],
						definition: false,
						refs: [
							...this.dependencies().map(
								component => "../" + component.definition()
							),
							"../" + this.definition()
						],
						sourceRoot: "sources/components",
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
		this._changed = false;
		return result;
	}

	dependencies() {
		if (!this._dependencies) {
			const imported = [];
			const files = this.files();

			files.forEach(file => {
				const content = fs.readFileSync(file).toString();
				const lines = content.split("\n");
				lines.forEach(line => {
					const parts = line.split(' from "');
					if (parts.length > 1) {
						imported.push(parts[1].split('"')[0]);
					}
				});
			});

			this._dependencies = all().filter(
				component => imported.indexOf(component.name) !== -1
			);
		}
		return this._dependencies;
	}

	task() {
		return `[component] ${this.name}`;
	}
}

const dir = sources + "/components";
components = fs.readdirSync(dir).map(path => new Component(path));
function all() {
	return components;
}

exports.all = all;
