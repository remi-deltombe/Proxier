define("protocol/sources/http/request", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HttpRequest {
        constructor() {
            this.header = new Map();
            this.method = "GET";
            this.hostname = "localhost";
            this.protocol = "http";
            this.port = 80;
            this.path = "/";
        }
    }
    exports.HttpRequest = HttpRequest;
});
define("protocol/sources/http/response", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Response {
        constructor() {
            this.header = new Map();
            this.body = "";
        }
    }
    exports.Response = Response;
});
define("protocol/sources/http/http", ["require", "exports", "protocol/sources/http/request", "protocol/sources/http/response"], function (require, exports, request_1, response_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(request_1);
    __export(response_1);
});
define("protocol", ["require", "exports", "protocol/sources/http/http"], function (require, exports, Http) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Http = Http;
});

//# sourceMappingURL=protocol.js.map
