"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("../../uuid/uuid");
class Serializable {
    constructor() {
        this.uuid = new uuid_1.Uuid();
        this.cached = true;
    }
    serialize() {
        return {
            cached: this.cached,
            url: `${this.exchange.request.protocol}://${this.exchange.request.hostname}${this.exchange.request.path}`,
            method: this.exchange.request.method
        };
    }
    deserialize(data) {
        var _a;
        this.cached = (_a = data.cached, (_a !== null && _a !== void 0 ? _a : this.cached));
    }
    equal(serializable) {
        return (serializable.exchange.request.path == this.exchange.request.path &&
            serializable.exchange.request.method == this.exchange.request.method);
    }
    static fromProxyExchangeEvent(event) {
        const serializable = new Serializable();
        serializable.exchange = event.exchange;
        serializable.cached = event.cached;
        return serializable;
    }
}
exports.Serializable = Serializable;

//# sourceMappingURL=serializable.js.map
