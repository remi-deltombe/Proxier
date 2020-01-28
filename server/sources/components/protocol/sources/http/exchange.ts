import { Request } from "./request";
import { Response } from "./response";
import { Uuid } from "../../../uuid/uuid";
import { SerializableInterface } from "../../../serializable/serializable";

export class Exchange implements SerializableInterface {
	public readonly uuid: Uuid = new Uuid();
	public request: Request;
	public response: Response;

	constructor(request: Request, response: Response) {
		this.request = request;
		this.response = response;
	}

	public serialize(children: boolean): any {
		return {
			request: this.request.serialize(children),
			response: this.response.serialize(children)
		};
	}

	public deserialize(data: any): void {
		this.request.deserialize(data.request ?? {});
		this.response.deserialize(data.response ?? {});
	}
}
