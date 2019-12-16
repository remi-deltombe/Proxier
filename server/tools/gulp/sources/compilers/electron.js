const { mkdir, copy, write } = require('../helpers/filesystem')
const { src, dest } = require('gulp');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const gap = require('gulp-append-prepend');
const component = require('./../buildables/component');
//var electron = require('gulp-electron');

exports.compileApp = function(inputComponent, outputDir, {
	name = inputComponent,
	onBuild=()=>{},
	onEnd=()=>{}
} = {})
{
	mkdir(outputDir);
	mkdir(outputDir+'/caches');
	mkdir(outputDir+'/builds');
	mkdir(outputDir+'/sources');

	for(const c of component.all())
	{
		const path = outputDir+'/sources/' + c.name;
		copy(c.path(), path);
	}
	return Promise.resolve();
}