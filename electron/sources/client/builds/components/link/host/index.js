define("index", ["require", "exports", "react", "react-dom", "link"], function (require, exports, React, ReactDOM, link_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ReactDOM.render(React.createElement("div", null,
        React.createElement(link_1.Link, { text: "link 1", link: "link 1" }),
        React.createElement(link_1.Link, { text: "link 2", link: "link 2" }),
        React.createElement(link_1.Link, { text: "link 3", link: "link 3" }),
        React.createElement(link_1.Link, { text: "link 3", link: "link 3" })), document.getElementById("APP"));
});

//# sourceMappingURL=index.js.map
