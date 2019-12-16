
const { task } = require('gulp');

const build = require('./sources/commands/build');


task('build', build.command);
