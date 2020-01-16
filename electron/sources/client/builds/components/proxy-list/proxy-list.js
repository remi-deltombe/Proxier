define("proxy-list/sources/proxy-list", ["require", "exports", "react", "button"], function (require, exports, React, button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ProxyList(config) {
        const { proxies, onClick, onAdd } = config;
        function renderItem(proxy) {
            return (React.createElement(button_1.Button, { key: proxy.uuid, onClick: () => onClick(proxy), text: proxy.url }));
        }
        function renderAddButton() {
            return React.createElement(button_1.Button, { onClick: () => onAdd(), text: "+" });
        }
        return (React.createElement(React.Fragment, null,
            proxies.map(proxy => renderItem(proxy)),
            renderAddButton()));
    }
    exports.ProxyList = ProxyList;
});
define("proxy-list", ["require", "exports", "proxy-list/sources/proxy-list"], function (require, exports, proxy_list_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="../../../builds/components/api/api.d.ts"/>
    /// <reference path="../../../builds/components/button/button.d.ts"/>
    /// <reference path="../../../builds/components/proxy/proxy.d.ts"/>
    __export(proxy_list_1);
});

//# sourceMappingURL=proxy-list.js.map
