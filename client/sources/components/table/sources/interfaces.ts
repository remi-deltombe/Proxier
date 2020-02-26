import * as React from "react";

export enum TableSortState {
    ASC = "asc",
    DESC = "desc",
    NONE = "none"
}

export interface TableRowItemInterface {
    text?: string;
    element?: JSX.Element;
}

export interface TableHeaderItemInterface extends TableRowItemInterface {
    width?: string;
    sortable?: boolean;
    sortState?: TableSortState;
    onSort?: () => TableSortState;
}

export interface TableRowInterface {
    key: string;
    items?: TableRowItemInterface[];
    onClick?: () => void;
}

export interface TableHeaderInterface {
    key: string;
    items?: TableHeaderItemInterface[];
}

export interface TableInterface {
    headers?: TableHeaderInterface[];
    rows?: TableRowInterface[];
    footers?: TableRowInterface[];
}
