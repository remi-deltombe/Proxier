/// <reference path="../../components/constants/constants.d.ts" />
/// <reference types="react" />
declare module "link/sources/interfaces" {
    export interface LinkInterface {
        text: string;
        link: string;
        blank?: boolean;
    }
}
declare module "link/sources/styles" {
    export const style: import("@emotion/core").SerializedStyles;
}
declare module "link/sources/link" {
    import { LinkInterface } from "link/sources/interfaces";
    export function Link(config: LinkInterface): JSX.Element;
}
declare module "link" {
    export * from "link/sources/link";
}
