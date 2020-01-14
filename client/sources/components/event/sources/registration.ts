import { Event } from "./event";

export class Registration {
    private event: Event<any, any>;

    constructor(event: Event<any, any>) {
        this.event = event;
    }

    public unsubscribe() {
        this.event.unsubscribe(this);
    }
}
