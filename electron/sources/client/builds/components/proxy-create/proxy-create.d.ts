/// <reference path="../../components/button/button.d.ts" />
/// <reference path="../../components/input-text/input-text.d.ts" />
/// <reference path="../../components/proxy/proxy.d.ts" />
/// <reference types="react" />
declare module "proxy-create/sources/proxy-create" {
    import { Proxy } from "proxy";
    export interface ProxyCreateInterface {
        onCreate: (proxy: Proxy) => void;
    }
    export function ProxyCreate(config: ProxyCreateInterface): JSX.Element;
}
declare module "proxy-create" {
    export * from "proxy-create/sources/proxy-create";
}
