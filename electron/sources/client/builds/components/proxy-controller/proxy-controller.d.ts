/// <reference path="../../components/api/api.d.ts" />
/// <reference path="../../components/proxy/proxy.d.ts" />
/// <reference path="../../components/proxy-create/proxy-create.d.ts" />
/// <reference path="../../components/proxy-detail/proxy-detail.d.ts" />
/// <reference path="../../components/proxy-list/proxy-list.d.ts" />
/// <reference types="react" />
declare module "proxy-controller/sources/proxy-controller" {
    import { Api } from "api";
    export interface ProxyControllerInterface {
        api: Api;
    }
    export function ProxyController(config: ProxyControllerInterface): JSX.Element;
}
declare module "proxy-controller" {
    export * from "proxy-controller/sources/proxy-controller";
}
