import { Event } from "./event";
export declare class AsyncEvent<Payload, Result = void> extends Event<Payload, Promise<Result>> {
    fireAsync(payload: Payload): Promise<Result[]>;
}
