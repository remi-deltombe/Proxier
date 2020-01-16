import { Event } from "./event";
export declare class Registration {
    private event;
    constructor(event: Event<any, any>);
    unsubscribe(): void;
}
