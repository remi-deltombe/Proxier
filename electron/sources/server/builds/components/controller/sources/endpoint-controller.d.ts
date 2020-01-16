import { Controller } from "./controller";
import { SerializableInterface, SerializableClass } from "../../serializable/serializable";
import { Api, Endpoint } from "../../api/api";
export declare abstract class EndpointController<C extends SerializableInterface> extends Controller {
    api: Api;
    endpoint: Endpoint<C>;
    private endpointRegistrations;
    constructor(api: Api, id: string, serializableClass: SerializableClass<C>);
    start(): void;
    stop(): void;
    protected handleOnList(serializables: C[]): Promise<SerializableInterface[]>;
    protected handleOnCreate(serializable: C): Promise<C>;
    protected handleOnUpdate(serializable: C): Promise<C>;
    protected handleOnDelete(serializable: C): Promise<boolean>;
}
