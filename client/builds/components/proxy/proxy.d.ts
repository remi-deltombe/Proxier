/// <reference path="../../components/api/api.d.ts" />
/// <reference path="../../components/serializable/serializable.d.ts" />
declare module "sources/request" {
    import { Serializable } from 'serializable';
    export class Request implements Serializable {
        uuid: string;
        url: string;
        method: string;
        cached: boolean;
        constructor(url?: string);
        serialize(): any;
        deserialize(data: any): void;
    }
}
declare module "sources/proxy" {
    import { Serializable } from 'serializable';
    import { Api, Endpoint } from 'api';
    import { Request } from "sources/request";
    export class Proxy implements Serializable {
        uuid: string;
        url: string;
        hostname: string;
        port: number;
        constructor(url?: string);
        serialize(): any;
        deserialize(data: any): void;
        requestEndpoint(api: Api): Endpoint<Request>;
    }
}
declare module "proxy" {
    export * from "sources/proxy";
    export * from "sources/request";
}
