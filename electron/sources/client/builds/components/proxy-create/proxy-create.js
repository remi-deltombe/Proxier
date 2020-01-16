define("proxy-create/sources/proxy-create", ["require", "exports", "react", "proxy", "button", "input-text"], function (require, exports, React, proxy_1, button_1, input_text_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ProxyCreate(config) {
        const { onCreate } = config;
        const [url, setUrl] = React.useState("http://");
        return (React.createElement(React.Fragment, null,
            React.createElement(input_text_1.InputText, { label: "Url", value: url, onChange: v => setUrl(v) }),
            React.createElement(button_1.Button, { text: "Create", onClick: () => onCreate(new proxy_1.Proxy(url)) })));
    }
    exports.ProxyCreate = ProxyCreate;
});
define("proxy-create", ["require", "exports", "proxy-create/sources/proxy-create"], function (require, exports, proxy_create_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="../../../builds/components/button/button.d.ts"/>
    /// <reference path="../../../builds/components/input-text/input-text.d.ts"/>
    /// <reference path="../../../builds/components/proxy/proxy.d.ts"/>
    __export(proxy_create_1);
});

//# sourceMappingURL=proxy-create.js.map
