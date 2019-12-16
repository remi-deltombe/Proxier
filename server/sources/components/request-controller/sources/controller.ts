
import { Api } from '../../api/api'
import { Registration } from '../../event/event'
import { EndpointController } from '../../controller/controller'
import { Serializable } from './serializable'
import { Proxy, ProxyResponseEvent } from '../../proxy/proxy'
import { Uuid } from '../../uuid/uuid'
import { Http } from '../../protocol/protocol'

export class Controller extends EndpointController<Serializable>
{
	private proxy: Proxy;
	private registrations: Registration[];

	constructor(api: Api, proxy: Proxy)
	{
		super(api, proxy.uuid.toString() + '/requests', Serializable);
		this.proxy = proxy;
	}

	public start() : void
	{
		super.start();

		this.registrations = [
			this.proxy.onResponse.subscribe(event=>this.handleOnResponse(event))
		]
	}


	public stop() : void
	{
		super.stop();
		for(const registation of this.registrations)
		{
			registation.unsubscribe();
		}
	}

	public async handleOnCreate(serializable: Serializable) : Promise<Serializable>
	{
		return undefined;
	}

	public async handleOnUpdate(serializable: Serializable) : Promise<Serializable>
	{
		const request = Http.Request.fromUrl(serializable.url);
		console.log(request);
		request.method = serializable.method;
		if(serializable.cached)
		{
			this.proxy.enableCache(request);
		}
		else
		{
			this.proxy.disableCache(request);
		}
		return serializable;
	}

	public async handleOnDelete(serializable: Serializable) : Promise<boolean>
	{
		return undefined;
	}

	private handleOnResponse(event: ProxyResponseEvent)
	{
		const serializable = new Serializable();
		serializable.url = `${event.request.protocol}://${event.request.hostname}${event.request.path}`;
		serializable.method = event.request.method;
		serializable.cached = event.cached;
		this.endpoint.create(serializable);
	}
}
