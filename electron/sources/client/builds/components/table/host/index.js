define("index", ["require", "exports", "react", "react-dom", "table"], function (require, exports, React, ReactDOM, table_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Component(props) {
        return React.createElement(React.Fragment, null, props.text);
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
    ReactDOM.render(React.createElement("div", null,
        React.createElement(table_1.Table, { headers: [
                {
                    items: [
                        { element: React.createElement(Component, { text: "button 1" }) },
                        { text: "item 1", width: "100%" },
                        { text: "item 2" },
                        { text: "item 3" },
                        { element: React.createElement(Component, { text: "button 2" }) }
                    ]
                }
            ], rows: [
                {
                    items: [
                        { element: React.createElement(Component, { text: "button 1" }) },
                        { text: "item 1" },
                        { text: "item 2" },
                        { text: "item 3" },
                        { element: React.createElement(Component, { text: "button 2" }) }
                    ]
                },
                {
                    items: [
                        { element: React.createElement(Component, { text: "button 1" }) },
                        { text: "item 1" },
                        { text: "item 2" },
                        { text: "item 3" },
                        { element: React.createElement(Component, { text: "button 2" }) }
                    ]
                },
                {
                    items: [
                        { element: React.createElement(Component, { text: "button 1" }) },
                        { text: "item 1" },
                        { text: "item 2" },
                        { text: "item 3" },
                        { element: React.createElement(Component, { text: "button 2" }) }
                    ]
                },
                {
                    items: [
                        { element: React.createElement(Component, { text: "button 1" }) },
                        { text: "item 1" },
                        { text: "item 2" },
                        { text: "item 3" },
                        { element: React.createElement(Component, { text: "button 2" }) }
                    ]
                },
                {
                    items: [
                        { element: React.createElement(Component, { text: "button 1" }) },
                        { text: "item 1" },
                        { text: "item 2" },
                        { text: "item 3" },
                        { element: React.createElement(Component, { text: "button 2" }) }
                    ]
                }
            ] })), document.getElementById("APP"));
});

//# sourceMappingURL=index.js.map
