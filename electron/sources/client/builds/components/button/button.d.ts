/// <reference path="../../components/constants/constants.d.ts" />
/// <reference types="react" />
declare module "button/sources/interfaces" {
    export enum ButtonColor {
        DEFAULT = 0,
        GREEN = 1,
        RED = 2
    }
    export interface ButtonInterface {
        text: string;
        color?: ButtonColor;
        onClick?: () => void;
    }
}
declare module "button/sources/styles" {
    import { ButtonColor } from "button/sources/interfaces";
    export const style: ({ color }: {
        color?: ButtonColor;
    }) => import("@emotion/core").SerializedStyles;
}
declare module "button/sources/button" {
    import { ButtonInterface } from "button/sources/interfaces";
    export function Button(config: ButtonInterface): JSX.Element;
}
declare module "button" {
    export * from "button/sources/button";
    export * from "button/sources/interfaces";
}
