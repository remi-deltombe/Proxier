import { SerializableInterface } from "../../serializable/serializable";
import { ProxyExchangeEvent } from "../../proxy/proxy";
import { Http } from "../../protocol/protocol";
import { Uuid } from "../../uuid/uuid";

export class Serializable extends Http.Exchange
    implements SerializableInterface {
    public cached: boolean = true;

    public serialize(children: boolean = false): any {
        return {
            ...super.serialize(children),
            cached: this.cached,
            url: this.request.url(),
            method: this.request.method
        };
    }

    public deserialize(data: any): void {
        super.deserialize(data ?? {});
        this.cached = data.cached ?? this.cached;
    }

    public equal(serializable: Serializable) {
        return (
            serializable.request.path == this.request.path &&
            serializable.request.method == this.request.method
        );
    }

    public static fromProxyExchangeEvent(event: ProxyExchangeEvent) {
        const serializable = new Serializable();
        serializable.copy(event.exchange);
        serializable.cached = event.cached;
        return serializable;
    }
}
