
import { SerializableInterface } from '../../serializable/serializable';
import { ProxyExchangeEvent } from '../../proxy/proxy'
import { Uuid } from '../../uuid/uuid';


export class Serializable implements SerializableInterface
{
	public readonly uuid: Uuid = new Uuid();

	public url: string = '';
	public method: string = '';
	public cached: boolean = true;

	public serialize() : any {
		return {
			url: this.url,
			method: this.method,
			cached: this.cached,
		};
	}

	public deserialize(data: any) : void {
		this.url = data.url ?? this.url;
		this.method = data.method ?? this.method;
		this.cached = data.cached ?? this.cached;
	}

	public equal(serializable: Serializable)
	{
		return (
			serializable.url == this.url &&
			serializable.method == this.method
		);
	}

	public static fromProxyExchangeEvent(event: ProxyExchangeEvent)
	{
		const serializable = new Serializable();		
		serializable.url = `${event.exchange.request.protocol}://${event.exchange.request.hostname}${event.exchange.request.path}`;
		serializable.method = event.exchange.request.method;
		serializable.cached = event.cached;
		return serializable
	}
}

