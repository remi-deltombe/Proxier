"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Response {
    constructor() {
        this.code = 200;
        this.header = new Map();
        this.body = '';
    }
    get contentType() {
        return this.header.has('content-type') ? this.header.get('content-type') : 'text';
    }
    set contentType(type) {
        this.header.set('content-type', type);
    }
    isBinary() {
        const type = this.contentType;
        for (const BINARY_TYPE of constants_1.BINARY_TYPES) {
            if (BINARY_TYPE === type || BINARY_TYPE.indexOf(type + ';') === 0) {
                return true;
            }
        }
        return false;
    }
}
exports.Response = Response;

//# sourceMappingURL=response.js.map
