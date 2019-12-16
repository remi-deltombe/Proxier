/// <reference types="react" />
declare module "sources/interfaces" {
    export interface TableRowItemInterface {
        text?: string;
        element?: JSX.Element;
    }
    export interface TableRowInterface {
        items?: TableRowItemInterface[];
    }
    export interface TableInterface {
        headers?: TableRowInterface[];
        rows?: TableRowInterface[];
    }
}
declare module "sources/table" {
    import { TableRowItemInterface, TableRowInterface, TableInterface } from "sources/interfaces";
    export function TableRowItem(config: TableRowItemInterface): JSX.Element;
    export function TableRow(config: TableRowInterface): JSX.Element;
    export function TableHeaderItem(config: TableRowItemInterface): JSX.Element;
    export function TableHeader(config: TableRowInterface): JSX.Element;
    export function Table(config: TableInterface): JSX.Element;
}
declare module "table" {
    export * from "sources/table";
    export * from "sources/interfaces";
}
