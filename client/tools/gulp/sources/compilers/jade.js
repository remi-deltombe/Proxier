
const { src, dest } = require('gulp');
const jade = require('gulp-jade');

exports.compileFile = function(inputFile, outputDir, {
	env={}, 
	onBuild=()=>{},
	onEnd=()=>{}
} = {})
{
 	return [
 		src(inputFile)
    		.on('end', e=>{ onBuild() })
		    .pipe(jade({locals:env}))
		    .pipe(dest(outputDir))
    		.on('end', e=>{ onEnd() })
		]
}