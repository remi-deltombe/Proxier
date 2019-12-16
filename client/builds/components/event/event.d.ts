declare module "sources/registration" {
    import { Event } from "sources/event";
    export class Registration {
        private event;
        constructor(event: Event<any, any>);
        unsubscribe(): void;
    }
}
declare module "sources/event" {
    import { Registration } from "sources/registration";
    export class Event<Payload, Result = void> {
        private registrations;
        subscribe(callback: (payload: Payload) => Result): Registration;
        unsubscribe(registration: Registration): void;
        fire(payload: Payload): Result[];
    }
}
declare module "event" {
    export * from "sources/event";
    export * from "sources/registration";
}
