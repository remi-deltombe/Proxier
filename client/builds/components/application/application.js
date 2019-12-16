define("sources/application", ["require", "exports", "react", "react-dom", "project", "api"], function (require, exports, React, ReactDOM, project_1, api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Application {
        constructor() {
            this.api = new api_1.Api();
        }
        start() {
            ReactDOM.render(React.createElement(project_1.Project, { api: this.api }), document.getElementById('APP'));
        }
    }
    exports.Application = Application;
    console.log('[boot] init');
    let app;
    window.onload = function () {
        console.log('[boot] loaded');
        app = new Application();
        app.start();
    };
});
//setInterval(()=>console.log(window.onload.toString()), 1000)
/// <reference path="../../../builds/components/api/api.d.ts"/>
/// <reference path="../../../builds/components/project/project.d.ts"/>
/// <reference path="../../../builds/components/proxy/proxy.d.ts"/>
define("application", ["require", "exports", "sources/application"], function (require, exports, application_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(application_1);
});

//# sourceMappingURL=application.js.map
