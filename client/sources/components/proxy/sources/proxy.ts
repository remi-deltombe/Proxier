
import { Serializable } from 'serializable'
import { Api, Endpoint } from 'api'
import { Exchange } from './exchange'

export class Proxy implements Serializable
{
	public uuid: string = '';
	public url: string = '';
	public hostname: string = 'localhost';
	public port: number = 0;

	constructor(url?:string)
	{
		this.url=url;
	}

	public serialize() : any
	{
		return {
			url: this.url,
			hostname: this.hostname,
			port: this.port
		};
	}

	public deserialize(data: any) 
	{
		this.url = data.url;
		this.hostname = data.hostname;
		this.port = data.port;
	}

	public exchangeEndpoint(api: Api) : Endpoint<Exchange>
	{
		return api.registerEndpoint(this.uuid + '/exchanges', Exchange);
	}
}