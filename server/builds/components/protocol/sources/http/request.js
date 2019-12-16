"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Request {
    constructor() {
        this.header = new Map();
        this.method = 'GET';
        this.hostname = 'localhost';
        this.protocol = 'http';
        this.port = 80;
        this.path = '/';
    }
    static fromUrl(url) {
        let parts;
        const request = new Request();
        // protocol extraction
        parts = url.split('://');
        if (parts.length > 0) {
            request.protocol = parts[0].trim();
            url = parts[1];
        }
        else {
            url = parts[0];
        }
        // path extraction
        parts = url.split('/');
        if (parts.length > 0) {
            request.path = '/' + parts.slice(1).join('/');
        }
        url = parts[0];
        // hostname + port extraction
        parts = url.split(':');
        if (parts.length > 1) {
            request.port = parseInt(parts[1]);
        }
        else {
            request.port = request.protocol === 'https' ? 443 : 80;
        }
        request.hostname = parts[0];
        return request;
    }
}
exports.Request = Request;

//# sourceMappingURL=request.js.map
