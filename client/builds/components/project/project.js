define("sources/project", ["require", "exports", "react", "button", "input-text", "table", "link", "proxy"], function (require, exports, React, button_1, input_text_1, table_1, link_1, proxy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Project(config) {
        const [url, setUrl] = React.useState('https://hitek.fr');
        const [proxy, setProxy] = React.useState(null);
        const [rows, setRows] = React.useState([]);
        const proxyEndpoint = config.api.registerEndpoint('proxies', proxy_1.Proxy);
        React.useEffect(() => {
            const registrations = [
                proxyEndpoint.onCreate.subscribe((proxy) => {
                    setProxy(proxy);
                }),
                proxyEndpoint.onUpdate.subscribe((proxy) => {
                    setProxy(proxy);
                })
            ];
            return () => registrations.forEach(registration => registration.unsubscribe());
        });
        React.useEffect(() => {
            if (proxy) {
                const endpoint = proxy.requestEndpoint(config.api);
                const registrations = [
                    endpoint.onCreate.subscribe((request) => {
                        rows.push({
                            request,
                            items: [
                                { text: request.method },
                                { text: request.url },
                                { element: React.createElement(button_1.Button, { text: request.cached ? 'Disable' : 'Enable', onClick: () => {
                                            request.cached = !request.cached;
                                            endpoint.update(request);
                                        } }) },
                            ]
                        });
                        setRows([...rows]);
                    }),
                    endpoint.onUpdate.subscribe((request) => {
                        for (const i in rows) {
                            if (rows[i].request.uuid == request.uuid) {
                                rows[i] = {
                                    request,
                                    items: [
                                        { text: request.method },
                                        { text: request.url },
                                        { element: React.createElement(button_1.Button, { text: request.cached ? 'Disable' : 'Enable', onClick: () => {
                                                    request.cached = !request.cached;
                                                    endpoint.update(request);
                                                } }) },
                                    ]
                                };
                            }
                        }
                        setRows([...rows]);
                    })
                ];
                return () => registrations.forEach(registration => registration.unsubscribe());
            }
        }, [proxy]);
        if (!proxy) {
            return (React.createElement(React.Fragment, null,
                React.createElement(input_text_1.InputText, { label: "Url", value: url, onChange: v => setUrl(v) }),
                React.createElement(button_1.Button, { text: "Create", onClick: () => proxyEndpoint.create(new proxy_1.Proxy(url)) })));
        }
        const link = `http://${proxy.hostname}:${proxy.port}`;
        const requestEndpoint = proxy.requestEndpoint(config.api);
        return React.createElement("div", null,
            React.createElement(link_1.Link, { text: link, link: link, blank: true }),
            "->",
            React.createElement(link_1.Link, { text: proxy.url, link: proxy.url, blank: true }),
            React.createElement("hr", null),
            React.createElement(table_1.Table, { headers: [
                    {
                        items: [
                            { text: "Method" },
                            { text: "Request" },
                            { element: (React.createElement(React.Fragment, null,
                                    React.createElement(button_1.Button, { text: "Enable all", onClick: () => rows.forEach(row => {
                                            row.request.cached = true;
                                            requestEndpoint.update(row.request);
                                        }) }),
                                    React.createElement(button_1.Button, { text: "Disable all", onClick: () => rows.forEach(row => {
                                            row.request.cached = false;
                                            requestEndpoint.update(row.request);
                                        }) }))) }
                        ]
                    }
                ], rows: rows }));
    }
    exports.Project = Project;
});
/// <reference path="../../../builds/components/api/api.d.ts"/>
/// <reference path="../../../builds/components/button/button.d.ts"/>
/// <reference path="../../../builds/components/event/event.d.ts"/>
/// <reference path="../../../builds/components/input-text/input-text.d.ts"/>
/// <reference path="../../../builds/components/link/link.d.ts"/>
/// <reference path="../../../builds/components/proxy/proxy.d.ts"/>
/// <reference path="../../../builds/components/table/table.d.ts"/>
define("project", ["require", "exports", "sources/project"], function (require, exports, project_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(project_1);
});

//# sourceMappingURL=project.js.map
