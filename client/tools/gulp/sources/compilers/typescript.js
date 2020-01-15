const { sources, mkdir } = require("../helpers/filesystem");
const { src, dest } = require("gulp");
const ts = require("gulp-typescript");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const gap = require("gulp-append-prepend");
const replace = require("gulp-replace");

exports.compileFile = function(
	input,
	output,
	{
		pipes = [],
		definition = true,
		refs = [],
		sourceRoot = undefined,
		onBuild = () => {},
		onEnd = () => {}
	} = {}
) {
	const ouputParts = output.split("/");
	const outputFileName = ouputParts.pop();
	const outputDir = ouputParts.join("/");
	refs = refs.map(path => `/// <reference path="${path}"/>`).join("\n") + " ";
	mkdir(outputDir);
	let succeed = true;
	const result = src(input)
		.pipe(sourcemaps.init())
		.pipe(gap.prependText(refs))
		.on("end", e => {
			onBuild();
		})
		.pipe(
			ts({
				module: "amd",
				jsx: "react",
				target: "ES6",
				declaration: true,
				noImplicitAny: true,
				moduleResolution: "Node",
				out: outputFileName
			})
		)
		.on("error", e => {
			succeed = false;
		});

	const promises = [result.js];
	for (const pipe of pipes) {
		promises[0] = promises[0].pipe(pipe);
	}
	promises[0] = promises[0]
		.pipe(sourcemaps.write(".", { includeContent: false, sourceRoot }))
		.pipe(dest(outputDir))
		.on("end", e => {
			if (succeed) {
				onEnd();
			}
		});

	if (definition) {
		promises.push(result.dts);
		for (const pipe of pipes) {
			promises[1] = promises[1].pipe(pipe);
		}
		promises[1] = promises[1]
			.pipe(
				replace(
					'/// <reference path="../../builds/',
					'/// <reference path="../../'
				)
			)
			.pipe(dest(outputDir));
	}
	return promises;
};

exports.compileDir = function(
	input,
	output,
	{
		refs = [],
		sourceRoot = undefined,
		onBuild = () => {},
		onEnd = () => {}
	} = {}
) {
	const ouputParts = output.split("/");
	const outputDir = ouputParts.join("/");

	refs = refs.map(path => `/// <reference path="${path}"/>`).join("\n") + " ";

	let succeed = true;
	const result = src(input)
		.pipe(sourcemaps.init())
		.pipe(gap.prependText(refs))
		.on("end", e => {
			onBuild();
		})
		.pipe(
			ts({
				module: "commonjs",
				jsx: "react",
				target: "ES6",
				declaration: true,
				noImplicitAny: true,
				moduleResolution: "Node"
			})
		)
		.on("error", e => {
			succeed = false;
		});

	return [
		result.dts.pipe(dest(outputDir)),
		result.js
			.pipe(sourcemaps.write(".", { includeContent: false, sourceRoot }))
			.pipe(dest(outputDir))
			.on("end", e => {
				if (succeed) {
					onEnd();
				}
			})
	];
};
