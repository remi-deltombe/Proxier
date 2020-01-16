define("table/sources/interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("table/sources/styles", ["require", "exports", "@emotion/core", "constants"], function (require, exports, core_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.style = core_1.css `
    width: 100%;
    font-family: ${constants_1.fonts.normal};
    font-size: 14px;
    line-height: 16px;
    color: ${constants_1.colors.grey3};
    text-align: left;
    border-collapse: collapse;
    border: none;
    word-break: break-all;

    th,
    td {
        padding: 4px 14px;
    }

    th {
        color: ${constants_1.colors.grey1};
        border-bottom: 3px solid ${constants_1.colors.grey9};
    }

    td {
        border-bottom: 1px solid ${constants_1.colors.grey9};
    }

    tr:hover td {
        background: ${constants_1.colors.grey9};
    }
`;
});
define("table/sources/table", ["require", "exports", "@emotion/core", "table/sources/styles"], function (require, exports, core_2, styles_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function TableRowItem(config) {
        return (core_2.jsx("td", null,
            config.text,
            config.element));
    }
    exports.TableRowItem = TableRowItem;
    function TableRow(config) {
        return (core_2.jsx("tr", null, config.items.map((item, i) => (core_2.jsx(TableRowItem, Object.assign({ key: i }, item))))));
    }
    exports.TableRow = TableRow;
    function TableHeaderItem(config) {
        return (core_2.jsx("th", Object.assign({}, config),
            config.text,
            config.element));
    }
    exports.TableHeaderItem = TableHeaderItem;
    function TableHeader(config) {
        return (core_2.jsx("tr", null, config.items.map((item, i) => (core_2.jsx(TableHeaderItem, Object.assign({ key: i }, item))))));
    }
    exports.TableHeader = TableHeader;
    function Table(config) {
        return (core_2.jsx("table", { css: styles_1.style },
            core_2.jsx("thead", null, config.headers.map(header => (core_2.jsx(TableHeader, Object.assign({ key: header.key }, header))))),
            core_2.jsx("tbody", null, config.rows.map(row => (core_2.jsx(TableRow, Object.assign({ key: row.key }, row)))))));
    }
    exports.Table = Table;
});
define("table", ["require", "exports", "table/sources/table"], function (require, exports, table_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="../../../builds/components/constants/constants.d.ts"/>
    /// <reference path="../../../builds/components/input-text/input-text.d.ts"/>
    __export(table_1);
});

//# sourceMappingURL=table.js.map
