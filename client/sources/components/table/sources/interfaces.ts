import * as React from "react";

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
