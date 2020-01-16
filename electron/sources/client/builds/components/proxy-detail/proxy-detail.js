define("proxy-detail/sources/proxy-detail", ["require", "exports", "react", "button", "input-text", "table", "link"], function (require, exports, React, button_1, input_text_1, table_1, link_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ProxyDetail(config) {
        const { proxy, exchanges, onExchangeChange = () => { } } = config;
        const [filterMethod, setFilterMethod] = React.useState("");
        const [filterRequest, setFilterRequest] = React.useState("");
        const link = `http://${proxy.hostname}:${proxy.port}`;
        const regexp = [buildRegExp(filterMethod), buildRegExp(filterRequest)];
        const rows = exchanges
            .filter(exchange => regexp[0].test(exchange.method) && regexp[1].test(exchange.url))
            .map(exchangeToRow);
        function buildRegExp(input) {
            try {
                return new RegExp(input.length ? input.split("*").join(".*") : ".*");
            }
            catch (e) {
                return new RegExp(".*");
            }
        }
        function exchangeToRow(exchange) {
            return {
                exchange,
                key: exchange.uuid,
                items: [
                    { text: exchange.method },
                    {
                        element: (React.createElement(link_1.Link, { text: exchange.url, link: exchange.url, blank: true }))
                    },
                    {
                        element: (React.createElement(React.Fragment, null,
                            React.createElement(button_1.Button, { text: "Cache", onClick: () => {
                                    window.open(exchange.url, "_blank");
                                } }),
                            React.createElement(button_1.Button, { text: exchange.cached ? "Disable" : "Enable", color: exchange.cached
                                    ? button_1.ButtonColor.GREEN
                                    : button_1.ButtonColor.RED, onClick: () => {
                                    exchange.cached = !exchange.cached;
                                    onExchangeChange(exchange);
                                } })))
                    }
                ]
            };
        }
        return (React.createElement("div", null,
            React.createElement(link_1.Link, { text: link, link: link, blank: true }),
            "->",
            React.createElement(link_1.Link, { text: proxy.url, link: proxy.url, blank: true }),
            React.createElement("hr", null),
            React.createElement(table_1.Table, { headers: [
                    {
                        key: "titles",
                        items: [
                            { text: "Method", width: "1px" },
                            { text: "Request" },
                            { text: "Cache", width: "200px" }
                        ]
                    },
                    {
                        key: "filters",
                        items: [
                            {
                                element: (React.createElement(input_text_1.InputText, { value: filterMethod, onChange: v => setFilterMethod(v) }))
                            },
                            {
                                element: (React.createElement(input_text_1.InputText, { value: filterRequest, onChange: v => setFilterRequest(v) }))
                            },
                            {
                                element: (React.createElement(React.Fragment, null,
                                    React.createElement(button_1.Button, { text: "Enable", onClick: () => rows.forEach(row => {
                                            row.exchange.cached = true;
                                            onExchangeChange(row.exchange);
                                        }) }),
                                    React.createElement(button_1.Button, { text: "Disable", onClick: () => rows.forEach(row => {
                                            row.exchange.cached = false;
                                            onExchangeChange(row.exchange);
                                        }) })))
                            }
                        ]
                    }
                ], rows: rows })));
    }
    exports.ProxyDetail = ProxyDetail;
});
define("proxy-detail", ["require", "exports", "proxy-detail/sources/proxy-detail"], function (require, exports, proxy_detail_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="../../../builds/components/api/api.d.ts"/>
    /// <reference path="../../../builds/components/button/button.d.ts"/>
    /// <reference path="../../../builds/components/event/event.d.ts"/>
    /// <reference path="../../../builds/components/input-text/input-text.d.ts"/>
    /// <reference path="../../../builds/components/link/link.d.ts"/>
    /// <reference path="../../../builds/components/proxy/proxy.d.ts"/>
    /// <reference path="../../../builds/components/table/table.d.ts"/>
    __export(proxy_detail_1);
});

//# sourceMappingURL=proxy-detail.js.map
