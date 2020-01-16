import { Http } from "../../protocol/protocol";
export declare class Parser {
    private internalTargetUrl;
    private internalSourceUrl;
    private internalTargetRequest;
    private internalSourceRequest;
    private responseAliases;
    private requestAliases;
    set source(url: string);
    get source(): string;
    set target(url: string);
    get target(): string;
    parseRequest(request: Http.Request): void;
    parseResponse(response: Http.Response): void;
    private buildAliases;
}
