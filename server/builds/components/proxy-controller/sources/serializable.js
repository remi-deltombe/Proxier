"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("../../uuid/uuid");
class Serializable {
    constructor() {
        this.uuid = new uuid_1.Uuid();
        this.url = '';
        this.hostname = '';
        this.port = 0;
    }
    serialize() {
        return {
            url: this.url,
            hostname: this.hostname,
            port: this.port,
        };
    }
    deserialize(data) {
        this.url = data.url;
        this.hostname = data.hostname;
        this.port = data.port;
    }
}
exports.Serializable = Serializable;

//# sourceMappingURL=serializable.js.map
