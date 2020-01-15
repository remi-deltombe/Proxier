import { Event } from "../../event/event";
import { Http } from "../../protocol/protocol";

export class Cache {
    private cachedResponses: Map<string, Http.Response> = new Map();
    private disabled: string[] = [];

    public set(request: Http.Request, response: Http.Response) {
        const hash = this.hash(request);
        this.cachedResponses.set(hash, response);
    }

    public get(request: Http.Request): Http.Response {
        const hash = this.hash(request);
        return this.cachedResponses.has(hash)
            ? this.cachedResponses.get(hash)
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
