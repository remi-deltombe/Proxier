import { Http } from "../../protocol/protocol";
export declare class Cache {
    private cachedResponses;
    private disabled;
    set(request: Http.Request, response: Http.Response): void;
    get(request: Http.Request): Http.Response;
    cached(request: Http.Request): boolean;
    disable(request: Http.Request): void;
    enable(request: Http.Request): void;
    private hash;
}
