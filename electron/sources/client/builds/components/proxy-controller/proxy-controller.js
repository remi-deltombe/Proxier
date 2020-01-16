define("proxy-controller/sources/proxy-controller", ["require", "exports", "react", "proxy-create", "proxy-list", "proxy-detail", "proxy"], function (require, exports, React, proxy_create_1, proxy_list_1, proxy_detail_1, proxy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ProxyController(config) {
        const { api } = config;
        const [proxyEndpoint, setProxyEndpoint] = React.useState(undefined);
        const [exchangeEndpoint, setExchangeEndpoint] = React.useState(undefined);
        const [proxy, setProxy] = React.useState(undefined);
        const [proxies, setProxies] = React.useState([]);
        const [exchanges, setExchanges] = React.useState([]);
        function handleOnCreate(proxy) {
            proxyEndpoint.create(proxy);
        }
        function refreshProxies(focus) {
            var _a, _b;
            setProxies((_b = (_a = proxyEndpoint) === null || _a === void 0 ? void 0 : _a.getInstances(), (_b !== null && _b !== void 0 ? _b : [])));
            setProxy((focus !== null && focus !== void 0 ? focus : proxy));
        }
        function refreshExchanges() {
            var _a, _b;
            setExchanges((_b = (_a = exchangeEndpoint) === null || _a === void 0 ? void 0 : _a.getInstances(), (_b !== null && _b !== void 0 ? _b : [])));
        }
        React.useEffect(() => {
            var _a, _b;
            setExchangeEndpoint((_b = (_a = proxy) === null || _a === void 0 ? void 0 : _a.exchangeEndpoint(api), (_b !== null && _b !== void 0 ? _b : undefined)));
        }, [proxy]);
        React.useEffect(() => {
            setProxyEndpoint(api.registerEndpoint("proxies", proxy_1.Proxy));
        }, [api]);
        React.useEffect(() => {
            if (proxyEndpoint) {
                const registrations = [
                    proxyEndpoint.onCreate.subscribe(proxy => refreshProxies(proxy)),
                    proxyEndpoint.onUpdate.subscribe(proxy => refreshProxies()),
                    proxyEndpoint.onDelete.subscribe(proxy => refreshProxies()),
                    proxyEndpoint.onList.subscribe(proxies => refreshProxies())
                ];
                proxyEndpoint.list();
                return () => registrations.forEach(registration => registration.unsubscribe());
            }
        }, [proxyEndpoint]);
        React.useEffect(() => {
            if (exchangeEndpoint) {
                const registrations = [
                    exchangeEndpoint.onCreate.subscribe(exchange => refreshExchanges()),
                    exchangeEndpoint.onUpdate.subscribe(exchange => refreshExchanges()),
                    exchangeEndpoint.onDelete.subscribe(exchange => refreshExchanges()),
                    exchangeEndpoint.onList.subscribe(exchanges => refreshExchanges())
                ];
                exchangeEndpoint.list();
                return () => registrations.forEach(registration => registration.unsubscribe());
            }
        }, [exchangeEndpoint]);
        return (React.createElement(React.Fragment, null,
            React.createElement(proxy_list_1.ProxyList, { proxies: proxies, onClick: proxy => setProxy(proxy), onAdd: () => setProxy(undefined) }),
            React.createElement("br", null),
            React.createElement("hr", null),
            React.createElement("br", null),
            proxy && (React.createElement(proxy_detail_1.ProxyDetail, { proxy: proxy, exchanges: exchanges, onExchangeChange: exchange => exchangeEndpoint.update(exchange) })),
            !proxy && React.createElement(proxy_create_1.ProxyCreate, { onCreate: handleOnCreate })));
    }
    exports.ProxyController = ProxyController;
});
define("proxy-controller", ["require", "exports", "proxy-controller/sources/proxy-controller"], function (require, exports, proxy_controller_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="../../../builds/components/api/api.d.ts"/>
    /// <reference path="../../../builds/components/proxy/proxy.d.ts"/>
    /// <reference path="../../../builds/components/proxy-create/proxy-create.d.ts"/>
    /// <reference path="../../../builds/components/proxy-detail/proxy-detail.d.ts"/>
    /// <reference path="../../../builds/components/proxy-list/proxy-list.d.ts"/>
    __export(proxy_controller_1);
});

//# sourceMappingURL=proxy-controller.js.map
