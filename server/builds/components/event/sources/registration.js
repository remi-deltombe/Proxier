"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Registration {
    constructor(event) {
        this.event = event;
    }
    unsubscribe() {
        this.event.unsubscribe(this);
    }
}
exports.Registration = Registration;

//# sourceMappingURL=registration.js.map
