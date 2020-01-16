declare module "event/sources/registration" {
    import { Event } from "event/sources/event";
    export class Registration {
        private event;
        constructor(event: Event<any, any>);
        unsubscribe(): void;
    }
}
declare module "event/sources/event" {
    import { Registration } from "event/sources/registration";
    export class Event<Payload, Result = void> {
        private registrations;
        subscribe(callback: (payload: Payload) => Result): Registration;
        unsubscribe(registration: Registration): void;
        fire(payload: Payload): Result[];
    }
}
declare module "event" {
    export * from "event/sources/event";
    export * from "event/sources/registration";
}
