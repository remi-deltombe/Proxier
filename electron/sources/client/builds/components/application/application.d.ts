/// <reference path="../../components/api/api.d.ts" />
/// <reference path="../../components/proxy-controller/proxy-controller.d.ts" />
declare module "application/sources/application" {
    export class Application {
        private api;
        start(): void;
    }
}
declare module "application" {
    export * from "application/sources/application";
}
