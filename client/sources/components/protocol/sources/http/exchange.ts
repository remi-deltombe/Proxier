import { Request } from "./request";
import { Response } from "./response";
import { Serializable } from "serializable";
import { Timestamp } from "timestamp";

export class Exchange implements Serializable {
    public uuid: string;
    public request: Request;
    public response: Response;

    public createdAt: Timestamp;
    public requestedAt: Timestamp;

    constructor(
        request: Request = new Request(),
        response: Response = new Response(),
        timestamp: Timestamp = new Timestamp()
    ) {
        this.request = request;
        this.response = response;

        this.createdAt = timestamp;
        this.requestedAt = this.createdAt.clone();
    }

    public serialize(): any {
        return {
            request: this.request.serialize(),
            response: this.response.serialize()
        };
    }

    public deserialize(data: any): void {
        if (data.createdAt) {
            this.createdAt.updateWith(data.createdAt);
        }
        if (data.requestedAt) {
            this.requestedAt.updateWith(data.requestedAt);
        }
        this.request.deserialize(data.request ?? {});
        this.response.deserialize(data.response ?? {});
    }
}
