import * as React from "react";

export interface TableRowItemInterface {
	text?: string;
	element?: JSX.Element;
}

export interface TableHeaderItemInterface extends TableRowItemInterface {
	width?: string;
}

export interface TableRowInterface {
	items?: TableRowItemInterface[];
}

export interface TableHeaderInterface {
	items?: TableHeaderItemInterface[];
}

export interface TableInterface {
	headers?: TableHeaderInterface[];
	rows?: TableRowInterface[];
}
