/// <reference path="../../components/constants/constants.d.ts" />
/// <reference path="../../components/input-text/input-text.d.ts" />
/// <reference types="react" />
declare module "table/sources/interfaces" {
    export interface TableRowItemInterface {
        text?: string;
        element?: JSX.Element;
    }
    export interface TableHeaderItemInterface extends TableRowItemInterface {
        width?: string;
    }
    export interface TableRowInterface {
        key: string;
        items?: TableRowItemInterface[];
    }
    export interface TableHeaderInterface {
        key: string;
        items?: TableHeaderItemInterface[];
    }
    export interface TableInterface {
        headers?: TableHeaderInterface[];
        rows?: TableRowInterface[];
    }
}
declare module "table/sources/styles" {
    export const style: import("@emotion/core").SerializedStyles;
}
declare module "table/sources/table" {
    import { TableRowItemInterface, TableRowInterface, TableHeaderItemInterface, TableInterface } from "table/sources/interfaces";
    export function TableRowItem(config: TableRowItemInterface): JSX.Element;
    export function TableRow(config: TableRowInterface): JSX.Element;
    export function TableHeaderItem(config: TableHeaderItemInterface): JSX.Element;
    export function TableHeader(config: TableRowInterface): JSX.Element;
    export function Table(config: TableInterface): JSX.Element;
}
declare module "table" {
    export * from "table/sources/table";
    export * from "table/sources/interfaces";
}
