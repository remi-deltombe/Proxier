"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registration_1 = require("./registration");
class Event {
    constructor() {
        this.registrations = new Map();
    }
    subscribe(callback) {
        const registration = new registration_1.Registration(this);
        this.registrations.set(registration, callback);
        return registration;
    }
    unsubscribe(registration) {
        if (this.registrations.has(registration)) {
            this.registrations.delete(registration);
        }
    }
    fire(payload) {
        let result = [];
        for (const registration of this.registrations) {
            result.push(registration[1](payload));
        }
        return result;
    }
}
exports.Event = Event;

//# sourceMappingURL=event.js.map
