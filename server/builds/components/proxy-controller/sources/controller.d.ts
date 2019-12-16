import { Api } from '../../api/api';
import { EndpointController } from '../../controller/controller';
import { Serializable } from './serializable';
export declare class Controller extends EndpointController<Serializable> {
    private proxies;
    private controllers;
    constructor(api: Api);
    stop(): void;
    handleOnCreate(serializable: Serializable): Promise<Serializable>;
    handleOnUpdate(serializable: Serializable): Promise<Serializable>;
    handleOnDelete(serializable: Serializable): Promise<boolean>;
}
