import { Controller } from "./controller";
import {
    SerializableInterface,
    SerializableClass,
} from "../../serializable/serializable";
import { Api, Endpoint } from "../../api/api";
import { Registration } from "../../event/event";

export abstract class EndpointController<
    C extends SerializableInterface
> extends Controller {
    public api: Api;
    public endpoint: Endpoint<C>;

    private endpointRegistrations: Registration[] = [];

    constructor(api: Api, id: string, serializableClass: SerializableClass<C>) {
        super();
        this.api = api;
        this.endpoint = this.api.registerEndpoint(id, serializableClass);
    }

    public start(): void {
        this.endpointRegistrations = [
            this.endpoint.onList.subscribe((serializables) =>
                this.handleOnList(serializables)
            ),
            this.endpoint.onCreate.subscribe((serializable) =>
                this.handleOnCreate(serializable)
            ),
            this.endpoint.onUpdate.subscribe((serializable) =>
                this.handleOnUpdate(serializable)
            ),
            this.endpoint.onDelete.subscribe((serializable) =>
                this.handleOnDelete(serializable)
            ),
        ];
    }

    public stop(): void {
        for (const registration of this.endpointRegistrations) {
            registration.unsubscribe();
        }
        this.endpointRegistrations = [];
    }

    protected async handleOnList(
        serializables: C[]
    ): Promise<SerializableInterface[]> {
        return serializables;
    }

    protected async handleOnCreate(serializable: C): Promise<C> {
        return serializable;
    }

    protected async handleOnUpdate(serializable: C): Promise<C> {
        return serializable;
    }

    protected async handleOnDelete(serializable: C): Promise<boolean> {
        return true;
    }
}
