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
const protocol_1 = require("../../protocol/protocol");
class Controller extends controller_1.EndpointController {
    constructor(api, proxy) {
        super(api, proxy.uuid.toString() + '/requests', serializable_1.Serializable);
        this.proxy = proxy;
    }
    start() {
        super.start();
        this.registrations = [
            this.proxy.onResponse.subscribe(event => this.handleOnResponse(event))
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
            const request = protocol_1.Http.Request.fromUrl(serializable.url);
            console.log(request);
            request.method = serializable.method;
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
    handleOnResponse(event) {
        const serializable = new serializable_1.Serializable();
        serializable.url = `${event.request.protocol}://${event.request.hostname}${event.request.path}`;
        serializable.method = event.request.method;
        serializable.cached = event.cached;
        this.endpoint.create(serializable);
    }
}
exports.Controller = Controller;

//# sourceMappingURL=controller.js.map
