/// <reference types="react" />
declare module "sources/link" {
    export interface LinkInterface {
        text: string;
        link: string;
        blank?: boolean;
    }
    export function Link(config: LinkInterface): JSX.Element;
}
declare module "link" {
    export * from "sources/link";
}
