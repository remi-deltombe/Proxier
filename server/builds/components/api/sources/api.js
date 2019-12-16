"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoint_1 = require("./endpoint");
class Api {
    constructor(server) {
        this.itoe = new Map();
        this.server = server;
        this.server.onMessage.subscribe(event => this.handleMessage(event.id, event.payload));
    }
    registerEndpoint(id, serializableClass) {
        const endpoint = new endpoint_1.Endpoint(this.server, id, serializableClass);
        this.itoe.set(id, endpoint);
        return endpoint;
    }
    handleMessage(id, payload) {
        if (this.itoe.has(id)) {
            this.itoe.get(id).dispatch(payload);
        }
        else {
            console.log(`[error] Unknow endpoint {${id}}`);
        }
    }
}
exports.Api = Api;

//# sourceMappingURL=api.js.map
