import { Event } from "../../event/event";
import { Http } from "../../protocol/protocol";

export class Cache {
    private exchanges: Map<string, Http.Exchange> = new Map();
    private disabled: string[] = [];

    public set(request: Http.Request, response: Http.Response) : Http.Exchange {
        const hash = this.hash(request);
        let exchange = this.exchanges.has(hash) 
            ? this.exchanges.get(hash)
            : new Http.Exchange(request);
        exchange.response = response;
        this.exchanges.set(hash, exchange);
        return exchange;
    }

    public get(request: Http.Request): Http.Exchange {
        const hash = this.hash(request);
        return this.exchanges.has(hash)
            ? this.exchanges.get(hash)
            : undefined;
    }

    public cached(request: Http.Request) {
        const hash = this.hash(request);
        return !this.disabled.includes(hash);
    }

    public disable(request: Http.Request) {
        const hash = this.hash(request);
        this.disabled.push(hash);
    }

    public enable(request: Http.Request) {
        const hash = this.hash(request);
        const index = this.disabled.indexOf(hash);
        if (index !== -1) {
            this.disabled.splice(index, 1);
        }
    }

    private hash(request: Http.Request): string {
        return `${request.method}|${request.hostname}|${
            request.path
        }|${request.rawBody.toString()}`;
    }
}
