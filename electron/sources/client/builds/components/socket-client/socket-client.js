define("socket-client/sources/interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("socket-client/sources/socket-client", ["require", "exports", "socket.io-client", "event"], function (require, exports, io, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SocketClient {
        constructor() {
            this.onMessage = new event_1.Event();
            this.io = io();
            this.io.onevent = (data) => {
                this.onMessage.fire({
                    id: data.data[0],
                    payload: data.data[1]
                });
            };
        }
        send(id, payload) {
            this.io.emit(id, payload);
        }
    }
    exports.SocketClient = SocketClient;
});
define("socket-client", ["require", "exports", "socket-client/sources/socket-client"], function (require, exports, socket_client_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="../../../builds/components/event/event.d.ts"/>
    __export(socket_client_1);
});

//# sourceMappingURL=socket-client.js.map
