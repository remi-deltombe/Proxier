
const { root, sources, builds, checksum } = require('../helpers/filesystem')
const ts = require('../compilers/typescript')
const fs = require('fs');
const glob = require("glob");

class Component
{
	constructor(name)
	{
		this.name = name;
	}

	definition()
	{
		return  '../../' + this.name + '/' + this.name + '.d.ts'
	}

	path()
	{
		return builds + '/components/' + this.name 
	}

	js()
	{
		return this.path()+ '/' + this.name + '.js'
	}

	files()
	{
		const files = [];
	
		files.push(...glob.sync(sources + '/components/' + this.name + '/**/*.ts'))
		files.push(...glob.sync(sources + '/components/' + this.name + '/**/*.tsx'))
	
		return files;
	}

	checksum()
	{
		return this.files().map(file=>checksum(file)).join(':');
	}

	changed()
	{
		const path = '/components/' + this.name + '/' + this.name;
		try {
			const builded = fs.readFileSync(builds + path + '.checksum').toString();
			return builded !== this.checksum();
		}
		catch(e) {}
		return true;
	}

	build()
	{
		const path = '/components/' + this.name ;
		
		return ts.compileDir(
			[
				sources + path + '/**/*.ts',
				sources + path + '/**/*.tsx'
			],
			builds + path ,
			{
				refs : this.dependencies().map(component=>component.definition()),
				sourceRoot: sources + '/components',
				onBuild : ()=>{ console.log('[build] ts:component/' + this.name) },
				onEnd : ()=>{ fs.writeFileSync(builds + path + '/'+ this.name +'.checksum', this.checksum()) },
			}
		)
	}

	dependencies()
	{
		const imported = [];
		const files = this.files();

		files.forEach(file=>{
			const content = fs.readFileSync(file).toString();
			const lines = content.split('\n');
			lines.forEach(line=>{
				const parts = line.split(" from '");
				if(parts.length > 1)
				{
					imported.push(parts[1].split("'")[0]);
				}
			})
		})

		return all().filter(component=>imported.indexOf(component.name)!==-1)
	}
}

function all()
{
	const dir = sources + '/components';
	return fs.readdirSync(dir).map(path=>new Component(path));
}

exports.all = all