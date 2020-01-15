import * as React from "react";

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
