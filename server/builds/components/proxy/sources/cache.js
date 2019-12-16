"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cache {
    constructor() {
        this.cachedResponses = new Map();
        this.disabled = [];
    }
    set(request, response) {
        const hash = this.hash(request);
        this.cachedResponses.set(hash, response);
    }
    get(request) {
        const hash = this.hash(request);
        return this.cachedResponses.has(hash) ? this.cachedResponses.get(hash) : undefined;
    }
    cached(request) {
        const hash = this.hash(request);
        return !this.disabled.includes(hash);
    }
    disable(request) {
        const hash = this.hash(request);
        this.disabled.push(hash);
    }
    enable(request) {
        const hash = this.hash(request);
        const index = this.disabled.indexOf(hash);
        if (index !== -1) {
            this.disabled.splice(index, 1);
        }
    }
    hash(request) {
        return `${request.method}|${request.path}`;
    }
}
exports.Cache = Cache;

//# sourceMappingURL=cache.js.map
