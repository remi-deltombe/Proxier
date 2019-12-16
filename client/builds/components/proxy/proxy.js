define("sources/request", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Request {
        constructor(url) {
            this.uuid = '';
            this.url = '';
            this.method = '';
            this.cached = true;
            this.url = url;
        }
        serialize() {
            return {
                url: this.url,
                method: this.method,
                cached: this.cached,
            };
        }
        deserialize(data) {
            this.url = data.url;
            this.method = data.method;
            this.cached = !!data.cached;
        }
    }
    exports.Request = Request;
});
define("sources/proxy", ["require", "exports", "sources/request"], function (require, exports, request_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Proxy {
        constructor(url) {
            this.uuid = '';
            this.url = '';
            this.hostname = 'localhost';
            this.port = 0;
            this.url = url;
        }
        serialize() {
            return {
                url: this.url,
                hostname: this.hostname,
                port: this.port
            };
        }
        deserialize(data) {
            this.url = data.url;
            this.hostname = data.hostname;
            this.port = data.port;
        }
        requestEndpoint(api) {
            return api.registerEndpoint(this.uuid + '/requests', request_1.Request);
        }
    }
    exports.Proxy = Proxy;
});
/// <reference path="../../../builds/components/api/api.d.ts"/>
/// <reference path="../../../builds/components/serializable/serializable.d.ts"/>
define("proxy", ["require", "exports", "sources/proxy", "sources/request"], function (require, exports, proxy_1, request_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(proxy_1);
    __export(request_2);
});

//# sourceMappingURL=proxy.js.map
