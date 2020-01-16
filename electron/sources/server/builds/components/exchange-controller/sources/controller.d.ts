import { Api } from "../../api/api";
import { EndpointController } from "../../controller/controller";
import { Serializable } from "./serializable";
import { Proxy } from "../../proxy/proxy";
export declare class Controller extends EndpointController<Serializable> {
    private proxy;
    private serializables;
    private registrations;
    constructor(api: Api, proxy: Proxy);
    start(): void;
    stop(): void;
    handleOnCreate(serializable: Serializable): Promise<Serializable>;
    handleOnUpdate(serializable: Serializable): Promise<Serializable>;
    handleOnDelete(serializable: Serializable): Promise<boolean>;
    private handleOnExchange;
}
