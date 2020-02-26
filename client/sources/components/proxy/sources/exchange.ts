import { Serializable } from "serializable";
import { Http } from "protocol";
import { Timestamp } from "timestamp";

export class Exchange extends Http.Exchange implements Serializable {
    public uuid: string = "";
    public url: string = "";
    public method: string = "";
    public cached: boolean = true;
    public createdAt: Timestamp = new Timestamp();
    public requestedAt: Timestamp = new Timestamp();

    constructor(url?: string) {
        super();
        this.url = url;
    }

    serialize(): any {
        return {
            url: this.url,
            method: this.method,
            cached: this.cached,
            ...super.serialize()
        };
    }

    deserialize(data: any) {
        super.deserialize(data);
        this.url = data.url;
        this.method = data.method;
        this.cached = !!data.cached;
    }
}
