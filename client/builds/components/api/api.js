define("sources/interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiAction;
    (function (ApiAction) {
        ApiAction["LIST"] = "LIST";
        ApiAction["CREATE"] = "CREATE";
        ApiAction["UPDATE"] = "UPDATE";
        ApiAction["DELETE"] = "DELETE";
    })(ApiAction = exports.ApiAction || (exports.ApiAction = {}));
});
define("sources/endpoint", ["require", "exports", "event", "sources/interfaces"], function (require, exports, event_1, interfaces_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Endpoint {
        constructor(client, id, serializableClass) {
            this.onList = new event_1.Event();
            this.onCreate = new event_1.Event();
            this.onUpdate = new event_1.Event();
            this.onDelete = new event_1.Event();
            this.instances = new Map();
            this.client = client;
            this.internalId = id;
            this.internalSerializableClass = serializableClass;
        }
        get id() {
            return this.internalId;
        }
        get serializableClass() {
            return this.internalSerializableClass;
        }
        create(serializable) {
            this.client.send(this.id, {
                action: interfaces_1.ApiAction.CREATE,
                payload: serializable.serialize()
            });
        }
        update(serializable) {
            this.client.send(this.id, {
                action: interfaces_1.ApiAction.UPDATE,
                uuid: serializable.uuid,
                payload: serializable.serialize()
            });
        }
        delete(serializable) {
            this.client.send(this.id, {
                action: interfaces_1.ApiAction.DELETE,
                uuid: serializable.uuid,
            });
        }
        list() {
            this.client.send(this.id, {
                action: interfaces_1.ApiAction.LIST
            });
        }
        dispatch(payload) {
            switch (payload.action) {
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
        handleList(payload) {
            const instances = new Map();
            const toFire = [];
            for (const data of payload.payload) {
                let instance;
                if (!this.instances.has(data.uuid)) {
                    instance = new this.internalSerializableClass();
                    instance.uuid = payload.uuid;
                }
                else {
                    instance = this.instances.get(payload.uuid);
                }
                instance.deserialize(payload.payload);
                instances.set(payload.uuid, instance);
                toFire.push(instance);
            }
            this.instances = instances;
            this.onList.fire(toFire);
        }
        handleCreate(payload) {
            const instance = new this.internalSerializableClass();
            instance.uuid = payload.uuid;
            instance.deserialize(payload.payload);
            this.instances.set(payload.uuid, instance);
            this.onCreate.fire(instance);
        }
        handleUpdate(payload) {
            const instance = this.instances.get(payload.uuid);
            instance.deserialize(payload.payload);
            this.instances.set(payload.uuid, instance);
            this.onUpdate.fire(instance);
        }
        handleDelete(payload) {
            const instance = this.instances.get(payload.uuid);
            this.instances.delete(payload.uuid);
            this.onDelete.fire(instance);
        }
    }
    exports.Endpoint = Endpoint;
});
define("sources/api", ["require", "exports", "socket-client", "sources/endpoint"], function (require, exports, socket_client_1, endpoint_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Api {
        constructor() {
            this.itoe = new Map();
            this.client = new socket_client_1.SocketClient();
            this.client.onMessage.subscribe(event => this.handleMessage(event.id, event.payload));
        }
        registerEndpoint(id, serializableClass) {
            if (!this.itoe.has(id)) {
                const endpoint = new endpoint_1.Endpoint(this.client, id, serializableClass);
                this.itoe.set(id, endpoint);
            }
            return this.itoe.get(id);
        }
        handleMessage(id, payload) {
            if (this.itoe.has(id)) {
                this.itoe.get(id).dispatch(payload);
            }
        }
    }
    exports.Api = Api;
});
/// <reference path="../../../builds/components/event/event.d.ts"/>
/// <reference path="../../../builds/components/proxy/proxy.d.ts"/>
/// <reference path="../../../builds/components/serializable/serializable.d.ts"/>
/// <reference path="../../../builds/components/socket-client/socket-client.d.ts"/>
define("api", ["require", "exports", "sources/api", "sources/endpoint"], function (require, exports, api_1, endpoint_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(api_1);
    __export(endpoint_2);
});

//# sourceMappingURL=api.js.map
