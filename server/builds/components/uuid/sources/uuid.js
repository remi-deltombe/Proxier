"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Uuid {
    constructor(uuid) {
        if (uuid) {
            this.uuid = uuid;
            Uuid.used.push(uuid);
        }
        else {
            this.uuid = Uuid.generate();
        }
    }
    toString() {
        return this.uuid;
    }
    static generate() {
        let uuid;
        do {
            uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                const r = Math.random() * 16 | 0;
                const v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        } while (Uuid.used.includes(uuid));
        return uuid;
    }
}
exports.Uuid = Uuid;
Uuid.used = [];

//# sourceMappingURL=uuid.js.map
