
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
			url : `${this.exchange.request.protocol}://${this.exchange.request.hostname}${this.exchange.request.path}`,
			method : this.exchange.request.method,
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