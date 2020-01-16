import { SerializableInterface } from "../../serializable/serializable";
import { ProxyExchangeEvent } from "../../proxy/proxy";
import { Http } from "../../protocol/protocol";
import { Uuid } from "../../uuid/uuid";
export declare class Serializable implements SerializableInterface {
    readonly uuid: Uuid;
    exchange: Http.Exchange;
    cached: boolean;
    serialize(): any;
    deserialize(data: any): void;
    equal(serializable: Serializable): boolean;
    static fromProxyExchangeEvent(event: ProxyExchangeEvent): Serializable;
}
