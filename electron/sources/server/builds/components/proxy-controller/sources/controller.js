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
const controller_1 = require("../../controller/controller");
const exchange_controller_1 = require("../../exchange-controller/exchange-controller");
const serializable_1 = require("./serializable");
const proxy_1 = require("../../proxy/proxy");
class Controller extends controller_1.EndpointController {
    constructor(api) {
        super(api, "proxies", serializable_1.Serializable);
        this.proxies = new Map();
        this.controllers = new Map();
    }
    stop() {
        for (const entry of this.proxies) {
            entry[1].stop();
        }
        for (const entry of this.controllers) {
            entry[1].stop();
        }
        this.proxies = new Map();
        super.stop();
    }
    handleOnCreate(serializable) {
        return __awaiter(this, void 0, void 0, function* () {
            const proxy = new proxy_1.Proxy(serializable.uuid);
            const controller = new exchange_controller_1.Controller(this.api, proxy);
            controller.start();
            this.controllers.set(serializable.uuid, controller);
            this.proxies.set(serializable.uuid, proxy);
            return this.handleOnUpdate(serializable);
        });
    }
    handleOnUpdate(serializable) {
        return __awaiter(this, void 0, void 0, function* () {
            const proxy = this.proxies.get(serializable.uuid);
            proxy.url = serializable.url;
            yield proxy.start();
            serializable.hostname = proxy.hostname;
            serializable.port = proxy.port;
            return serializable;
        });
    }
    handleOnDelete(serializable) {
        return __awaiter(this, void 0, void 0, function* () {
            const proxy = this.proxies.get(serializable.uuid);
            proxy.stop();
            return true;
        });
    }
}
exports.Controller = Controller;

//# sourceMappingURL=controller.js.map
