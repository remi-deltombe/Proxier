define("index", ["require", "exports", "react", "react-dom", "button"], function (require, exports, React, ReactDOM, button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ReactDOM.render(React.createElement("div", null,
        React.createElement(button_1.Button, { text: "test", onClick: () => console.log("onClick") }),
        React.createElement(button_1.Button, { text: "test2", onClick: () => console.log("onClick") }),
        React.createElement(button_1.Button, { text: "test3", onClick: () => console.log("onClick") }),
        React.createElement(button_1.Button, { text: "test3", onClick: () => console.log("onClick") })), document.getElementById("APP"));
});

//# sourceMappingURL=index.js.map
