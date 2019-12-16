/// <reference types="react" />
declare module "sources/input-text" {
    export interface InputTextInterface {
        label: string;
        value: string;
        onChange?: (value: string) => void;
    }
    export function InputText(config: InputTextInterface): JSX.Element;
}
declare module "input-text" {
    export * from "sources/input-text";
}
