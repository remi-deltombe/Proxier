import { Request } from "./request";
import { Response } from "./response";
import { Serializable } from "serializable";

export class Exchange implements Serializable {
	public uuid: string;
	public request: Request;
	public response: Response;

	constructor(
		request: Request = new Request(),
		response: Response = new Response()
	) {
		this.request = request;
		this.response = response;
	}

	public serialize(): any {
		return {
			request: this.request.serialize(),
			response: this.response.serialize()
		};
	}

	public deserialize(data: any): void {
		this.request.deserialize(data.request ?? {});
		this.response.deserialize(data.response ?? {});
	}
}
