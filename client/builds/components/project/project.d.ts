/// <reference path="../../components/api/api.d.ts" />
/// <reference path="../../components/button/button.d.ts" />
/// <reference path="../../components/event/event.d.ts" />
/// <reference path="../../components/input-text/input-text.d.ts" />
/// <reference path="../../components/link/link.d.ts" />
/// <reference path="../../components/proxy/proxy.d.ts" />
/// <reference path="../../components/table/table.d.ts" />
/// <reference types="react" />
declare module "sources/project" {
    import { Api } from 'api';
    export interface ProjectInterface {
        api: Api;
    }
    export function Project(config: ProjectInterface): JSX.Element;
}
declare module "project" {
    export * from "sources/project";
}
