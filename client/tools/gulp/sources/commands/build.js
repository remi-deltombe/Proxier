
const component = require('../buildables/component')
const bootstrap = require('../buildables/bootstrap')
const electron = require('../buildables/electron')

exports.command = function(){
	const streams = []

	const componentsToBuild = [];
	const force = process.argv.includes('--force');

	for(let i=process.argv.length; i>0; --i)
	{
		if(process.argv[i-1] == '-c')
		{
			componentsToBuild.push(process.argv[i]);
		}
	}


	streams.push(
		...component
			.all()
			.filter(component=>componentsToBuild.length===0 || componentsToBuild.includes(component.name))
			.filter(component=>force || component.changed())
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