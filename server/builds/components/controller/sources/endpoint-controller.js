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
const controller_1 = require("./controller");
class EndpointController extends controller_1.Controller {
    constructor(api, id, serializableClass) {
        super();
        this.endpointRegistrations = [];
        this.api = api;
        this.endpoint = this.api.registerEndpoint(id, serializableClass);
    }
    start() {
        this.endpointRegistrations = [
            this.endpoint.onCreate.subscribe(serializable => this.handleOnCreate(serializable)),
            this.endpoint.onUpdate.subscribe(serializable => this.handleOnUpdate(serializable)),
            this.endpoint.onDelete.subscribe(serializable => this.handleOnDelete(serializable))
        ];
    }
    stop() {
        for (const registration of this.endpointRegistrations) {
            registration.unsubscribe();
        }
        this.endpointRegistrations = [];
    }
    handleOnCreate(serializable) {
        return __awaiter(this, void 0, void 0, function* () {
            return serializable;
        });
    }
    handleOnUpdate(serializable) {
        return __awaiter(this, void 0, void 0, function* () {
            return serializable;
        });
    }
    handleOnDelete(serializable) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
}
exports.EndpointController = EndpointController;

//# sourceMappingURL=endpoint-controller.js.map
