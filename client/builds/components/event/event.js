define("sources/registration", ["require", "exports"], function (require, exports) {
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
});
define("sources/event", ["require", "exports", "sources/registration"], function (require, exports, registration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
define("event", ["require", "exports", "sources/event", "sources/registration"], function (require, exports, event_1, registration_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(event_1);
    __export(registration_2);
});

//# sourceMappingURL=event.js.map
