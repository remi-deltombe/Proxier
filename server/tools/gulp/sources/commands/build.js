
const component = require('../buildables/component')
const bootstrap = require('../buildables/bootstrap')
const electron = require('../buildables/electron')

exports.command = function(){
	const streams = []

	streams.push(
		...component
			.all()
			.filter(component=>component.changed())
			.map(component=>component.build())
	);

	streams.push(
		...bootstrap
			.all()
			.filter(bootstrap=>bootstrap.changed())
			.map(bootstrap=>bootstrap.build())
	);

	streams.push(
		...electron
			.all()
			.map(electron=>electron.build())
	);
	
	return Promise.all(streams.flat());
}

/**
const ComponentTree = require('./component-tree')
const Json = require('./json')
const fs = require('fs');
const FileSystem = require('./filesystem');
const { src, dest } = require('gulp');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gap = require('gulp-append-prepend');

const root = __dirname+'/../../..'

function references(dependencies = [])
{
	return dependencies
		.map(dep=>root+'/builds/components/' + dep + '/' + dep + '.d.ts')
		.map(path=>`/// <reference path="${path}"/>`)
		.join('\n')+' ';
}

function merge(components)
{
	const result = {
		components : [],
		dependencies : []
	}

	for(const component of components)
	{
		result.components.push(component.name);
		result.components = result.components.concat(component.components);
		result.dependencies = result.dependencies.concat(component.dependencies);
	}

	result.components = result.components.filter((v,i)=>result.components.indexOf(v) === i);
	result.dependencies = result.dependencies.filter((v,i)=>result.dependencies.indexOf(v) === i);

	return result;
}

exports.build = async function() {
	const components = ComponentTree.list();
	const merged = merge(components);
	const promises = [];
	for(let component of components)
	{
		const refs = references(component.dependencies);
		const outputDir = root+'/builds/components/'+component.name;
		const inputDir = root+'/sources/components/'+component.name;
		const input = inputDir+'/'+component.name+'.ts';

	    const tsResult = src(input)
    		.pipe(sourcemaps.init())
    		.pipe(gap.prependText(refs))
	        .pipe(ts({
	        	module: "amd",
	        	jsx: "react",
	        	target: "ES6",
	            declaration: true,
		        noImplicitAny: true,
		        moduleResolution: 'Node',
		        out: component.name + '.js'
	        }))
	        .on('error', e=>{});

	    promises.push(
	    	tsResult
	    		.dts
	    		.pipe(dest(outputDir))
	    ),
	    promises.push(
	    	tsResult
		    	.js
		    	.pipe(sourcemaps.write('.'))
		    	.pipe(dest(outputDir))
	    )
	}

	return merge(promises);
}

*/