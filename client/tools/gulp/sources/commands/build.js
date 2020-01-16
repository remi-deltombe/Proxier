const component = require("../buildables/component");
const bootstrap = require("../buildables/bootstrap");
const gulp = require("gulp");
const merge = require("merge-stream");

//task('build', build.command);

const components = component.all();
const bootstraps = bootstrap.all();

const stack = [...components];
const sorted = [];
const built = [];
let looped = 0;

do {
	const current = stack.shift();
	const deps = current.dependencies().map(c => c.task());
	let ok = true;

	for (const dep of deps) {
		if (!built.includes(dep)) {
			ok = false;
			break;
		}
	}
	if (ok) {
		looped = 0;
		built.push(current.task());
		sorted.push(current);
		gulp.task(current.task(), () => merge(current.build()));
	} else {
		looped++;
		stack.push(current);
	}
} while (stack.length && looped < stack.length);

if (stack.length) {
	console.error("[ERROR] Circular dependencies detected");
	process.exit();
}

bootstraps.forEach(bootstrap =>
	gulp.task(bootstrap.task(), () => merge(bootstrap.build()))
);

const componentsToBuild = [];
const force = process.argv.includes("--force");

for (let i = process.argv.length; i > 0; --i) {
	if (process.argv[i - 1] == "-c") {
		componentsToBuild.push(process.argv[i]);
	}
}

const tobuild = sorted
	.filter(
		component =>
			componentsToBuild.length === 0 ||
			componentsToBuild.includes(component.name)
	)
	.filter(component => force || component.changed());

const series = [
	...tobuild.map(component => component.task()),
	...bootstraps
		.filter(bootstrap => bootstrap.changed())
		.map(bootstrap => bootstrap.task())
];

if (series.length) {
	gulp.task("build", gulp.series(series));
} else {
	gulp.task("build", () => Promise.resolve("nothing to build"));
}
