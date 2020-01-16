define("proxy/sources/exchange", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Exchange {
        constructor(url) {
            this.uuid = "";
            this.url = "";
            this.method = "";
            this.cached = true;
            this.url = url;
        }
        serialize() {
            return {
                url: this.url,
                method: this.method,
                cached: this.cached
            };
        }
        deserialize(data) {
            this.url = data.url;
            this.method = data.method;
            this.cached = !!data.cached;
        }
    }
    exports.Exchange = Exchange;
});
define("proxy/sources/proxy", ["require", "exports", "proxy/sources/exchange"], function (require, exports, exchange_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Proxy {
        constructor(url) {
            this.uuid = "";
            this.url = "";
            this.hostname = "localhost";
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
        exchangeEndpoint(api) {
            return api.registerEndpoint(this.uuid + "/exchanges", exchange_1.Exchange);
        }
    }
    exports.Proxy = Proxy;
});
define("proxy", ["require", "exports", "proxy/sources/proxy", "proxy/sources/exchange"], function (require, exports, proxy_1, exchange_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="../../../builds/components/api/api.d.ts"/>
    /// <reference path="../../../builds/components/serializable/serializable.d.ts"/>
    __export(proxy_1);
    __export(exchange_2);
});

//# sourceMappingURL=proxy.js.map
