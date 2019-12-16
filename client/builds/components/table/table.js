define("sources/interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("sources/table", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function TableRowItem(config) {
        return (React.createElement("td", null,
            config.text,
            config.element));
    }
    exports.TableRowItem = TableRowItem;
    function TableRow(config) {
        return (React.createElement("tr", null, config.items.map((item, i) => React.createElement(TableRowItem, Object.assign({ key: i }, item)))));
    }
    exports.TableRow = TableRow;
    function TableHeaderItem(config) {
        return (React.createElement("th", null,
            config.text,
            config.element));
    }
    exports.TableHeaderItem = TableHeaderItem;
    function TableHeader(config) {
        return (React.createElement("tr", null, config.items.map((item, i) => React.createElement(TableHeaderItem, Object.assign({ key: i }, item)))));
    }
    exports.TableHeader = TableHeader;
    function Table(config) {
        return (React.createElement("table", null,
            React.createElement("thead", null, config.headers.map((header, i) => React.createElement(TableHeader, Object.assign({ key: i }, header)))),
            React.createElement("tbody", null, config.rows.map((row, i) => React.createElement(TableRow, Object.assign({ key: i }, row))))));
    }
    exports.Table = Table;
});
define("table", ["require", "exports", "sources/table"], function (require, exports, table_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(table_1);
});

//# sourceMappingURL=table.js.map
