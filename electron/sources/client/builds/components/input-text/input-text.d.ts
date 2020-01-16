/// <reference path="../../components/constants/constants.d.ts" />
/// <reference types="react" />
declare module "input-text/sources/interfaces" {
    export interface InputTextInterface {
        label?: string;
        value: string;
        onChange?: (value: string) => void;
    }
}
declare module "input-text/sources/styles" {
    export const style: import("@emotion/core").SerializedStyles;
}
declare module "input-text/sources/input-text" {
    import { InputTextInterface } from "input-text/sources/interfaces";
    export function InputText(config: InputTextInterface): JSX.Element;
}
declare module "input-text" {
    export * from "input-text/sources/input-text";
}
