define("application/sources/application", ["require", "exports", "react", "react-dom", "proxy-controller", "api"], function (require, exports, React, ReactDOM, proxy_controller_1, api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Application {
        constructor() {
            this.api = new api_1.Api();
        }
        start() {
            ReactDOM.render(React.createElement(proxy_controller_1.ProxyController, { api: this.api }), document.getElementById("APP"));
        }
    }
    exports.Application = Application;
    let app = new Application();
    app.start();
});
define("application", ["require", "exports", "application/sources/application"], function (require, exports, application_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="../../../builds/components/api/api.d.ts"/>
    /// <reference path="../../../builds/components/proxy-controller/proxy-controller.d.ts"/>
    __export(application_1);
});

//# sourceMappingURL=application.js.map
