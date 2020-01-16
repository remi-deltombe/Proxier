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
const serializable_1 = require("./serializable");
class Controller extends controller_1.EndpointController {
    constructor(api, proxy) {
        super(api, proxy.uuid.toString() + "/exchanges", serializable_1.Serializable);
        this.serializables = [];
        this.proxy = proxy;
    }
    start() {
        super.start();
        this.registrations = [
            this.proxy.onExchange.subscribe(event => this.handleOnExchange(event))
        ];
    }
    stop() {
        super.stop();
        for (const registation of this.registrations) {
            registation.unsubscribe();
        }
    }
    handleOnCreate(serializable) {
        return __awaiter(this, void 0, void 0, function* () {
            return undefined;
        });
    }
    handleOnUpdate(serializable) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = serializable.exchange.request;
            if (serializable.cached) {
                this.proxy.enableCache(request);
            }
            else {
                this.proxy.disableCache(request);
            }
            return serializable;
        });
    }
    handleOnDelete(serializable) {
        return __awaiter(this, void 0, void 0, function* () {
            return undefined;
        });
    }
    handleOnExchange(event) {
        const serializable = serializable_1.Serializable.fromProxyExchangeEvent(event);
        for (const existing of this.serializables) {
            if (existing.equal(serializable)) {
                return;
            }
        }
        this.endpoint.create(serializable);
        this.serializables.push(serializable);
    }
}
exports.Controller = Controller;

//# sourceMappingURL=controller.js.map
