
import * as React  from 'react';
import * as ReactDOM  from 'react-dom';
import { ProxyController } from 'proxy-controller';
import { Api } from 'api';

export class Application
{
	private api = new Api();

	public start()
	{
		ReactDOM.render(
			<ProxyController api={this.api}/>, 
			document.getElementById('APP')
		);
	}
}

console.log('[boot] init')
let app: Application;
window.onload = function()
{
	console.log('[boot] loaded')
	app = new Application();
	app.start();
}

//setInterval(()=>console.log(window.onload.toString()), 1000)