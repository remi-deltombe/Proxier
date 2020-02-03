import { Request } from "./request";
import { Response } from "./response";
import { Uuid } from "../../../uuid/uuid";
import { Timestamp } from "../../../timestamp/timestamp";
import { SerializableInterface } from "../../../serializable/serializable";

export class Exchange implements SerializableInterface {
	public readonly uuid: Uuid = new Uuid();

	public createdAt: Timestamp;
	public requestedAt: Timestamp;

	public request: Request;
	public response: Response;

	constructor(
		request: Request,
		response: Response,
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
}
