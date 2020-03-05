import { Request } from "./request";
import { Response } from "./response";
import { Uuid } from "../../../uuid/uuid";
import { Timestamp } from "../../../timestamp/timestamp";
import { SerializableInterface } from "../../../serializable/serializable";

export class Exchange implements SerializableInterface {
    public uuid: Uuid = new Uuid();

    public createdAt: Timestamp;
    public requestedAt: Timestamp;

    public request: Request;
    public response: Response;

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

    public serialize(children: boolean): any {
        return {
            createdAt: this.createdAt.timestamp(),
            requestedAt: this.requestedAt.timestamp(),
            request: this.request.serialize(children),
            response: this.response.serialize(children)
        };
    }

    public deserialize(data: any): void {
        this.request.deserialize(data.request ?? {});
        this.response.deserialize(data.response ?? {});
    }

    public copy(exchange: Exchange) {
        this.uuid = exchange.uuid.clone();
        this.createdAt = exchange.createdAt.clone();
        this.requestedAt = exchange.requestedAt.clone();
        this.request = exchange.request.clone();
        this.response = exchange.response.clone();
    }
}
