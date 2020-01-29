import { SerializableInterface } from "../../serializable/serializable";
import { ProxyExchangeEvent } from "../../proxy/proxy";
import { Http } from "../../protocol/protocol";
import { Uuid } from "../../uuid/uuid";

export class Serializable implements SerializableInterface {
    public readonly uuid: Uuid = new Uuid();

    public exchange: Http.Exchange;
    public cached: boolean = true;

    public serialize(children: boolean = false): any {
        return {
            cached: this.cached,
            url: this.exchange.request.url(),
            method: this.exchange.request.method,
            exchange: children ? this.exchange.serialize(true) : undefined
        };
    }

    public deserialize(data: any): void {
        this.cached = data.cached ?? this.cached;
        this.exchange.deserialize(data.exchange ?? {});
    }

    public equal(serializable: Serializable) {
        return (
            serializable.exchange.request.path == this.exchange.request.path &&
            serializable.exchange.request.method == this.exchange.request.method
        );
    }

    public static fromProxyExchangeEvent(event: ProxyExchangeEvent) {
        const serializable = new Serializable();
        serializable.exchange = event.exchange;
        serializable.cached = event.cached;
        return serializable;
    }
}
