/// <reference path="../../components/api/api.d.ts" />
/// <reference path="../../components/button/button.d.ts" />
/// <reference path="../../components/event/event.d.ts" />
/// <reference path="../../components/input-text/input-text.d.ts" />
/// <reference path="../../components/link/link.d.ts" />
/// <reference path="../../components/proxy/proxy.d.ts" />
/// <reference path="../../components/table/table.d.ts" />
/// <reference types="react" />
declare module "proxy-detail/sources/proxy-detail" {
    import { Proxy, Exchange } from "proxy";
    export interface ProxyDetailInterface {
        proxy: Proxy;
        exchanges: Exchange[];
        onExchangeChange?: (exchange: Exchange) => void;
    }
    export function ProxyDetail(config: ProxyDetailInterface): JSX.Element;
}
declare module "proxy-detail" {
    export * from "proxy-detail/sources/proxy-detail";
}
