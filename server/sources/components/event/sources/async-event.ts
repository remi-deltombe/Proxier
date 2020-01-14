import { Event } from "./event";

export class AsyncEvent<Payload, Result = void> extends Event<
    Payload,
    Promise<Result>
> {
    public async fireAsync(payload: Payload): Promise<Result[]> {
        const promises = this.fire(payload);
        const result = await Promise.all(promises);
        return result;
    }
}
