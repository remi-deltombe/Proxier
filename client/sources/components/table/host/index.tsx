import * as React from "react";
import * as ReactDOM from "react-dom";

import { Table } from "table";

function Component(props: any): JSX.Element {
	return <>{props.text}</>;
}

/*
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
*/

ReactDOM.render(
	<div>
		<Table
			headers={[
				{
					items: [
						{ element: <Component text="button 1" /> },
						{ text: "item 1", width: "100%" },
						{ text: "item 2" },
						{ text: "item 3" },
						{ element: <Component text="button 2" /> }
					]
				}
			]}
			rows={[
				{
					items: [
						{ element: <Component text="button 1" /> },
						{ text: "item 1" },
						{ text: "item 2" },
						{ text: "item 3" },
						{ element: <Component text="button 2" /> }
					]
				},
				{
					items: [
						{ element: <Component text="button 1" /> },
						{ text: "item 1" },
						{ text: "item 2" },
						{ text: "item 3" },
						{ element: <Component text="button 2" /> }
					]
				},
				{
					items: [
						{ element: <Component text="button 1" /> },
						{ text: "item 1" },
						{ text: "item 2" },
						{ text: "item 3" },
						{ element: <Component text="button 2" /> }
					]
				},
				{
					items: [
						{ element: <Component text="button 1" /> },
						{ text: "item 1" },
						{ text: "item 2" },
						{ text: "item 3" },
						{ element: <Component text="button 2" /> }
					]
				},
				{
					items: [
						{ element: <Component text="button 1" /> },
						{ text: "item 1" },
						{ text: "item 2" },
						{ text: "item 3" },
						{ element: <Component text="button 2" /> }
					]
				}
			]}
		/>
	</div>,
	document.getElementById("APP")
);
