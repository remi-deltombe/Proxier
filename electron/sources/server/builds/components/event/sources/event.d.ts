import { Registration } from "./registration";
export declare class Event<Payload, Result = void> {
    private registrations;
    subscribe(callback: (payload: Payload) => Result): Registration;
    unsubscribe(registration: Registration): void;
    fire(payload: Payload): Result[];
}
