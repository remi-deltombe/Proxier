"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("../../uuid/uuid");
class Serializable {
    constructor() {
        this.uuid = new uuid_1.Uuid();
        this.url = '';
        this.method = '';
        this.cached = true;
    }
    serialize() {
        return {
            url: this.url,
            method: this.method,
            cached: this.cached,
        };
    }
    deserialize(data) {
        var _a, _b, _c;
        this.url = (_a = data.url, (_a !== null && _a !== void 0 ? _a : this.url));
        this.method = (_b = data.method, (_b !== null && _b !== void 0 ? _b : this.method));
        this.cached = (_c = data.cached, (_c !== null && _c !== void 0 ? _c : this.cached));
    }
}
exports.Serializable = Serializable;

//# sourceMappingURL=serializable.js.map
