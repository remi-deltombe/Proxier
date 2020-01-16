/// <reference path="../../components/api/api.d.ts" />
/// <reference path="../../components/button/button.d.ts" />
/// <reference path="../../components/proxy/proxy.d.ts" />
/// <reference types="react" />
declare module "proxy-list/sources/proxy-list" {
    import { Proxy } from "proxy";
    export interface ProxyListInterface {
        proxies: Proxy[];
        onAdd: () => void;
        onClick: (proxy: Proxy) => void;
    }
    export function ProxyList(config: ProxyListInterface): JSX.Element;
}
declare module "proxy-list" {
    export * from "proxy-list/sources/proxy-list";
}
