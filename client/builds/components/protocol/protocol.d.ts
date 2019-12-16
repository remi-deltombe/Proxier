declare module "sources/http/request" {
    export class HttpRequest {
        header: Map<string, string>;
        method: string;
        hostname: string;
        protocol: string;
        port: number;
        path: string;
    }
}
declare module "sources/http/response" {
    export class Response {
        header: Map<string, string>;
        body: string;
    }
}
declare module "sources/http/http" {
    export * from "sources/http/request";
    export * from "sources/http/response";
}
declare module "protocol" {
    import * as Http from "sources/http/http";
    export { Http };
}
