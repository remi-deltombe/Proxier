
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