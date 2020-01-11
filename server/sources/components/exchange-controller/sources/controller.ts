
import { Api } from '../../api/api'
import { Registration } from '../../event/event'
import { EndpointController } from '../../controller/controller'
import { Serializable } from './serializable'
import { Proxy, ProxyExchangeEvent } from '../../proxy/proxy'
import { Uuid } from '../../uuid/uuid'
import { Http } from '../../protocol/protocol'

export class Controller extends EndpointController<Serializable>
{
	private proxy: Proxy;
	private serializables: Serializable[] = [];
	private registrations: Registration[];

	constructor(api: Api, proxy: Proxy)
	{
		super(api, proxy.uuid.toString() + '/exchanges', Serializable);
		this.proxy = proxy;
	}

	public start() : void
	{
		super.start();

		this.registrations = [
			this.proxy.onExchange.subscribe(event=>this.handleOnExchange(event))
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

	private handleOnExchange(event: ProxyExchangeEvent)
	{
		const serializable = Serializable.fromProxyExchangeEvent(event);

		for(const existing of this.serializables)
		{
			if(existing.equal(serializable))
			{
				return;
			}
		}

		this.endpoint.create(serializable);
		this.serializables.push(serializable);
	}
}
