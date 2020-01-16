declare module "protocol/sources/http/request" {
    export class HttpRequest {
        header: Map<string, string>;
        method: string;
        hostname: string;
        protocol: string;
        port: number;
        path: string;
    }
}
declare module "protocol/sources/http/response" {
    export class Response {
        header: Map<string, string>;
        body: string;
    }
}
declare module "protocol/sources/http/http" {
    export * from "protocol/sources/http/request";
    export * from "protocol/sources/http/response";
}
declare module "protocol" {
    import * as Http from "protocol/sources/http/http";
    export { Http };
}
