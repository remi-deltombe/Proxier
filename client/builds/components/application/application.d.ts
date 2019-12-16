/// <reference path="../../components/api/api.d.ts" />
/// <reference path="../../components/project/project.d.ts" />
/// <reference path="../../components/proxy/proxy.d.ts" />
declare module "sources/application" {
    export class Application {
        private api;
        start(): void;
    }
}
declare module "application" {
    export * from "sources/application";
}
