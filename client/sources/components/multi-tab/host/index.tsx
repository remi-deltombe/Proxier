import * as React from "react";
import * as ReactDOM from "react-dom";
import { MultiTab } from "multi-tab";

ReactDOM.render(
	<MultiTab
		items={[
			{
				text: "Item 1",
				onClick: () => {
					console.log("1");
				}
			},
			{
				element: <>blabla</>,
				active: true,
				onClick: () => {
					console.log("2");
				}
			},
			{
				text: "Item 3",
				onClick: () => {
					console.log("3");
				}
			},
			{
				text: "Item 4",
				active: true,
				onClick: () => {
					console.log("4");
				}
			},
			{
				text: "Item 5",
				onClick: () => {
					console.log("5");
				}
			}
		]}
	/>,
	document.getElementById("APP")
);
