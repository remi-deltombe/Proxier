import { SerializableInterface } from "../../../serializable/serializable";
import { Uuid } from "../../../uuid/uuid";

export class Request implements SerializableInterface {
    public uuid: Uuid = new Uuid();
    public header: Map<string, string> = new Map();
    public method: string = "GET";
    public hostname: string = "localhost";
    public protocol: string = "http";
    public port: number = 80;
    public path: string = "/";

    public rawBody: Buffer = Buffer.from([]);

    public clone(): Request {
        const result = new Request();
        result.uuid = this.uuid.clone();
        result.header = new Map(this.header);
        result.method = this.method;
        result.hostname = this.hostname;
        result.protocol = this.protocol;
        result.port = this.port;
        result.path = this.path;
        result.rawBody = Buffer.from(this.rawBody);
        return result;
    }

    public static fromUrl(url: string): Request {
        let parts: string[];
        const request = new Request();

        // protocol extraction
        parts = url.split("://");
        if (parts.length > 0) {
            request.protocol = parts[0].trim();
            url = parts[1];
        } else {
            url = parts[0];
        }

        // path extraction
        parts = url.split("/");
        if (parts.length > 0) {
            request.path = "/" + parts.slice(1).join("/");
        }
        url = parts[0];

        // hostname + port extraction
        parts = url.split(":");
        if (parts.length > 1) {
            request.port = parseInt(parts[1]);
        } else {
            request.port = request.protocol === "https" ? 443 : 80;
        }
        request.hostname = parts[0];

        return request;
    }

    public url(): string {
        return `${this.protocol}://${this.hostname}${
            this.displayPort() ? ":" + this.port : ""
        }${this.path}`;
    }

    public serialize(children: boolean = false): any {
        const result = {
            header: {},
            method: this.method,
            hostname: this.hostname,
            protocol: this.protocol,
            port: this.port,
            path: this.path,
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
    }

    private displayPort(): boolean {
        return (
            (this.protocol === "http" && this.port !== 80) ||
            (this.protocol === "https" && this.port !== 443)
        );
    }
}
