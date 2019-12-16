/// <reference types="node" />
export declare class Response {
    code: number;
    header: Map<string, string>;
    body: string;
    rawBody: Buffer;
    get contentType(): string;
    set contentType(type: string);
    isBinary(): boolean;
}
