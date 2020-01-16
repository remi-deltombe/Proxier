import { Http } from "../../protocol/protocol";
export declare class Client {
    send(request: Http.Request): Promise<Http.Response>;
    private http;
    private https;
}
