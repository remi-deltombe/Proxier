/// <reference types="node" />
export declare class Request {
    header: Map<string, string>;
    method: string;
    hostname: string;
    protocol: string;
    port: number;
    path: string;
    rawBody: Buffer;
    static fromUrl(url: string): Request;
}
