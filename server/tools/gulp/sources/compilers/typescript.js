const { sources } = require('../helpers/filesystem')
const { src, dest } = require('gulp');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gap = require('gulp-append-prepend');

exports.compileFile = function(input, output, {
	refs=[],
	sourceRoot = undefined,
	onBuild=()=>{},
	onEnd=()=>{},
}={})
{
	const ouputParts = output.split('/')
	const outputFileName = ouputParts.pop();
	const outputDir = ouputParts.join('/');
	
	refs = refs.map(path=>`/// <reference path="${path}"/>`).join('\n') + ' ';

	let succeed = true;
    const result = src(input)
		.pipe(sourcemaps.init())
		.pipe(gap.prependText(refs))
    	.on('end', e=>{ onBuild() })
        .pipe(ts({
        	module: "commonjs",
        	jsx: "react",
        	target: "ES6",
            declaration: true,
	        noImplicitAny: true,
	        moduleResolution: 'Node'
        }))
        .on('error', e=>{ succeed = false; });

    return [
    	result
    		.dts
    		.pipe(dest(outputDir)),
    	result
	    	.js
	    	.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot}))
	    	.pipe(dest(outputDir))
    		.on('end', e=>{ if(succeed) { onEnd()} })
    ]
}


exports.compileDir = function(input, output, {
	refs=[],
	sourceRoot = undefined,
	onBuild=()=>{},
	onEnd=()=>{},
}={})
{
	const ouputParts = output.split('/')
	const outputDir = ouputParts.join('/');
	
	refs = refs.map(path=>`/// <reference path="${path}"/>`).join('\n') + ' ';

	let succeed = true;
    const result = src(input)
		.pipe(sourcemaps.init())
		.pipe(gap.prependText(refs))
    	.on('end', e=>{ onBuild() })
        .pipe(ts({
        	module: "commonjs",
        	jsx: "react",
        	target: "ES6",
            declaration: true,
	        noImplicitAny: true,
	        moduleResolution: 'Node',
        }))
        .on('error', e=>{ succeed = false; });

    return [
    	result
    		.dts
    		.pipe(dest(outputDir)),
    	result
	    	.js
	    	.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot}))
	    	.pipe(dest(outputDir))
    		.on('end', e=>{ if(succeed) { onEnd()} })
    ]
}