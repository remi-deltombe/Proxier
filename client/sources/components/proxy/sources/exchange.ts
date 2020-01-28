import { Serializable } from "serializable";
import { Http } from "protocol";

export class Exchange implements Serializable {
    public uuid: string = "";
    public url: string = "";
    public method: string = "";
    public cached: boolean = true;
    public exchange: Http.Exchange;

    constructor(url?: string) {
        this.url = url;
    }

    serialize(): any {
        return {
            url: this.url,
            method: this.method,
            cached: this.cached,
            exchange: this.exchange.serialize()
        };
    }

    deserialize(data: any) {
        this.url = data.url;
        this.method = data.method;
        this.cached = !!data.cached;
        if (data.exchange) {
            this.exchange = new Http.Exchange();
            this.exchange.deserialize(data.exchange);
        }
    }
}
