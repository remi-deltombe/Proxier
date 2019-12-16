
const { sources, builds } = require('../helpers/filesystem')
const fs = require('fs');
const glob = require("glob");
const component = require("./component")
const electron = require('./../compilers/electron');

class Electron
{
	constructor(name)
	{
		this.name = name;
	}

	path()
	{
		return builds + '/electrons/' + this.name;
	}

	build()
	{
		const path = this.path();
		return electron.compileApp('proxier', path,{
			onBuild : ()=>{ console.log('[build] ts:component/' + this.name) },
		});
	}
}

function all()
{
	try
	{
		const dir = sources + '/electrons';
		return fs.readdirSync(dir).map(path=>new Electron(path));
	}
	catch(e)
	{
		return []
	}
}


exports.all = all