import * as React from "react";
import * as ReactDOM from "react-dom";

import { Table } from "table";

function Component(props: any): JSX.Element {
    return <>{props.text}</>;
}

ReactDOM.render(
    <div>
        <Table
            headers={[
                {
                    key: "header",
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
                    key: "row1",
                    items: [
                        { element: <Component text="button 1" /> },
                        { text: "item 1" },
                        { text: "item 2" },
                        { text: "item 3" },
                        { element: <Component text="button 2" /> }
                    ]
                },
                {
                    key: "row2",
                    items: [
                        { element: <Component text="button 1" /> },
                        { text: "item 1" },
                        { text: "item 2" },
                        { text: "item 3" },
                        { element: <Component text="button 2" /> }
                    ]
                },
                {
                    key: "row3",
                    items: [
                        { element: <Component text="button 1" /> },
                        { text: "item 1" },
                        { text: "item 2" },
                        { text: "item 3" },
                        { element: <Component text="button 2" /> }
                    ]
                },
                {
                    key: "row4",
                    items: [
                        { element: <Component text="button 1" /> },
                        { text: "item 1" },
                        { text: "item 2" },
                        { text: "item 3" },
                        { element: <Component text="button 2" /> }
                    ]
                },
                {
                    key: "row5",
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
