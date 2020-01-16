/// <reference path="../../components/api/api.d.ts" />
/// <reference path="../../components/serializable/serializable.d.ts" />
declare module "proxy/sources/exchange" {
    import { Serializable } from "serializable";
    export class Exchange implements Serializable {
        uuid: string;
        url: string;
        method: string;
        cached: boolean;
        constructor(url?: string);
        serialize(): any;
        deserialize(data: any): void;
    }
}
declare module "proxy/sources/proxy" {
    import { Serializable } from "serializable";
    import { Api, Endpoint } from "api";
    import { Exchange } from "proxy/sources/exchange";
    export class Proxy implements Serializable {
        uuid: string;
        url: string;
        hostname: string;
        port: number;
        constructor(url?: string);
        serialize(): any;
        deserialize(data: any): void;
        exchangeEndpoint(api: Api): Endpoint<Exchange>;
    }
}
declare module "proxy" {
    export * from "proxy/sources/proxy";
    export * from "proxy/sources/exchange";
}
