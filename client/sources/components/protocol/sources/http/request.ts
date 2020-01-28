import { Serializable } from "serializable";

export class Request implements Serializable {
    public uuid: string;
    public header: Map<string, string> = new Map();
    public method: string = "GET";
    public hostname: string = "localhost";
    public protocol: string = "http";
    public port: number = 80;
    public path: string = "/";

    public serialize(): any {
        const result = {
            header: {},
            method: this.method,
            hostname: this.hostname,
            protocol: this.protocol,
            port: this.port,
            path: this.path
        };

        for (const h in this.header) {
            (result.header as any)[h] = this.header.get(h);
        }

        return result;
    }

    public deserialize(data: any): void {
        this.method = data.method ?? this.method;
        this.hostname = data.hostname ?? this.hostname;
        this.protocol = data.protocol ?? this.protocol;
        this.port = data.port ?? this.port;
        this.path = data.path ?? this.path;
        if (data.header) {
            this.header = new Map();
            for (const h in data.header) {
                this.header.set(h, data.header[h]);
            }
        }
    }
}
