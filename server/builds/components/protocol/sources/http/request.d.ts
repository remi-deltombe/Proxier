export declare class Request {
    header: Map<string, string>;
    method: string;
    hostname: string;
    protocol: string;
    port: number;
    path: string;
    static fromUrl(url: string): Request;
}
