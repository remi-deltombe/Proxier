
import { Api } from '../../api/api'
import { EndpointController } from '../../controller/controller'
import { Controller as ExchangeController } from '../../exchange-controller/exchange-controller'
import { Serializable } from './serializable'
import { Proxy } from '../../proxy/proxy'
import { Uuid } from '../../uuid/uuid'

export class Controller extends EndpointController<Serializable>
{
	private proxies: Map<Uuid, Proxy> = new Map();
	private controllers: Map<Uuid, ExchangeController> = new Map();

	constructor(api: Api)
	{
		super(api, 'proxies', Serializable);
	}

	public stop() : void
	{
		for(const entry of this.proxies)
		{
			entry[1].stop();
		}
		for(const entry of this.controllers)
		{
			entry[1].stop();
		}
		this.proxies = new Map();
		super.stop();
	}

	public async handleOnCreate(serializable: Serializable) : Promise<Serializable>
	{
		const proxy = new Proxy(serializable.uuid);
		const controller = new ExchangeController(this.api, proxy);

		controller.start();

		this.controllers.set(serializable.uuid, controller);
		this.proxies.set(serializable.uuid, proxy);
		
		return this.handleOnUpdate(serializable);
	}

	public async handleOnUpdate(serializable: Serializable) : Promise<Serializable>
	{
		const proxy = this.proxies.get(serializable.uuid);
		proxy.url = serializable.url;
		await proxy.start();
		serializable.hostname = proxy.hostname;
		serializable.port = proxy.port;
		return serializable;
	}

	public async handleOnDelete(serializable: Serializable) : Promise<boolean>
	{
		const proxy = this.proxies.get(serializable.uuid);
		proxy.stop();
		return true;
	}
}
