import { Serializable } from "serializable";

export class Exchange implements Serializable {
    public uuid: string = "";
    public url: string = "";
    public method: string = "";
    public cached: boolean = true;

    constructor(url?: string) {
        this.url = url;
    }

    serialize(): any {
        return {
            url: this.url,
            method: this.method,
            cached: this.cached
        };
    }

    deserialize(data: any) {
        this.url = data.url;
        this.method = data.method;
        this.cached = !!data.cached;
    }
}
