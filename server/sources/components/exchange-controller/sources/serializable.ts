
import { SerializableInterface } from '../../serializable/serializable';
import { ProxyExchangeEvent } from '../../proxy/proxy'
import { Http } from '../../protocol/protocol'
import { Uuid } from '../../uuid/uuid';


export class Serializable implements SerializableInterface
{
	public readonly uuid: Uuid = new Uuid();

	public exchange: Http.Exchange;
	public cached: boolean = true;

	public serialize() : any {
		return {
			cached: this.cached,
		};
	}

	public deserialize(data: any) : void {
		this.cached = data.cached ?? this.cached;
	}

	public equal(serializable: Serializable)
	{
		return (
			serializable.exchange.request.path == this.exchange.request.path &&
			serializable.exchange.request.method == this.exchange.request.method
		);
	}

	public static fromProxyExchangeEvent(event: ProxyExchangeEvent)
	{
		const serializable = new Serializable();		
		serializable.exchange = event.exchange;
		serializable.cached = event.cached;
		return serializable
	}
}


export class SerializableList implements SerializableInterface
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

	public static fromSerializable(serializable: Serializable)
	{
		const result = new SerializableList();		
		result.url = `${serializable.exchange.request.protocol}://${serializable.exchange.request.hostname}${serializable.exchange.request.path}`;
		result.method = serializable.exchange.request.method;
		result.cached = serializable.cached;
		return result
	}
}

