import { Request } from "./request";
import { Response } from "./response";

export class Exchange {
    public request: Request;
    public response: Response;

    constructor(request: Request, response: Response) {
        this.request = request;
        this.response = response;
    }
}
