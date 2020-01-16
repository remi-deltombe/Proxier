"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../../event/event");
const interfaces_1 = require("./interfaces");
class Endpoint {
    constructor(server, id, serializableClass) {
        this.onCreate = new event_1.AsyncEvent();
        this.onUpdate = new event_1.AsyncEvent();
        this.onDelete = new event_1.AsyncEvent();
        this.onList = new event_1.AsyncEvent();
        this.instances = new Map();
        this.server = server;
        this.internalId = id;
        this.internalSerializableClass = serializableClass;
    }
    get id() {
        return this.internalId;
    }
    get serializableClass() {
        return this.internalSerializableClass;
    }
    getInstances() {
        return Array.from(this.instances.values());
    }
    create(serializable) {
        this.instances.set(serializable.uuid.toString(), serializable);
        this.server.send(this.id, {
            action: interfaces_1.ApiAction.CREATE,
            uuid: serializable.uuid.toString(),
            payload: serializable.serialize()
        });
    }
    update(serializable) {
        this.instances.set(serializable.uuid.toString(), serializable);
        this.server.send(this.id, {
            action: interfaces_1.ApiAction.UPDATE,
            uuid: serializable.uuid.toString(),
            payload: serializable.serialize()
        });
    }
    delete(serializable) {
        this.instances.delete(serializable.uuid.toString());
        this.server.send(this.id, {
            action: interfaces_1.ApiAction.DELETE,
            uuid: serializable.uuid.toString()
        });
    }
    get(serializable) {
        this.server.send(this.id, {
            action: interfaces_1.ApiAction.GET,
            uuid: serializable.uuid.toString(),
            payload: serializable.serialize()
        });
    }
    list(serializables) {
        this.server.send(this.id, {
            action: interfaces_1.ApiAction.LIST,
            payload: serializables.map(v => (Object.assign({ uuid: v.uuid.toString() }, v.serialize())))
        });
    }
    dispatch(payload) {
        switch (payload.action) {
            case interfaces_1.ApiAction.GET:
                this.handleGet(payload);
                break;
            case interfaces_1.ApiAction.LIST:
                this.handleList(payload);
                break;
            case interfaces_1.ApiAction.CREATE:
                this.handleCreate(payload);
                break;
            case interfaces_1.ApiAction.UPDATE:
                this.handleUpdate(payload);
                break;
            case interfaces_1.ApiAction.DELETE:
                this.handleDelete(payload);
                break;
        }
    }
    handleGet(payload) {
        const instance = this.instances.get(payload.uuid);
        this.get(instance);
    }
    handleList(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.onList.fireAsync(this.getInstances());
            this.list(result[0]);
        });
    }
    handleCreate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = new this.internalSerializableClass();
            instance.deserialize(payload.payload);
            const result = yield this.onCreate.fireAsync(instance);
            if (result.length && result[0]) {
                this.create(result[0]);
            }
        });
    }
    handleUpdate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = this.instances.get(payload.uuid);
            instance.deserialize(payload.payload);
            const result = yield this.onUpdate.fireAsync(instance);
            if (result.length && result[0]) {
                this.update(result[0]);
            }
        });
    }
    handleDelete(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = this.instances.get(payload.uuid);
            const result = yield this.onDelete.fireAsync(instance);
            if (result && result[0]) {
                this.delete(instance);
            }
        });
    }
}
exports.Endpoint = Endpoint;

//# sourceMappingURL=endpoint.js.map
