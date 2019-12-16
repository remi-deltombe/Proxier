/// <reference types="react" />
declare module "sources/button" {
    export interface ButtonInterface {
        text: string;
        onClick?: () => void;
    }
    export function Button(config: ButtonInterface): JSX.Element;
}
declare module "button" {
    export * from "sources/button";
}
