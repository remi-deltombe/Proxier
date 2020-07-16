import { Http } from "../../protocol/protocol";
import * as https from "https";
import * as http from "http";

export class Client {
    public async send(request: Http.Request): Promise<Http.Response> {
        try {
            return request.protocol == "http"
                ? this.http(request)
                : this.https(request);
        } catch (e) {
            return Http.serverNotFound();
        }
    }

    private http(request: Http.Request): Promise<Http.Response> {
        return new Promise((resolve) => {
            const headers: any = {};
            const bannedHeader: string[] = [
                "host",
                "accept-encoding",
                "referer",
            ];

            for (const header of request.header) {
                if (!bannedHeader.includes(header[0])) {
                    headers[header[0]] = header[1];
                }
            }

            const req = http.request(
                {
                    hostname: request.hostname,
                    port: request.port,
                    path: request.path,
                    method: request.method,
                    headers: headers,
                },
                function (res) {
                    const response = new Http.Response();
                    response.code = res.statusCode;

                    for (let i in res.headers) {
                        if (Array.isArray(res.headers[i])) {
                            response.header.set(
                                i,
                                (res.headers[i] as string[]).join(",")
                            );
                        } else {
                            response.header.set(i, res.headers[i] as string);
                        }
                    }

                    const buffer: any = [];
                    res.on("data", (chunk) => {
                        buffer.push(chunk);
                    });

                    res.on("end", () => {
                        response.rawBody = Buffer.concat(buffer);
                        if (!response.isBinary()) {
                            response.body = response.rawBody.toString();
                        }
                        resolve(response);
                    });
                }
            );

            // write data to request body
            req.write(request.rawBody);
            req.end();
        });
    }

    private https(request: Http.Request): Promise<Http.Response> {
        return new Promise((resolve) => {
            const headers: any = {};

            const bannedHeader: string[] = ["accept-encoding"];

            for (const header of request.header) {
                if (!bannedHeader.includes(header[0])) {
                    headers[header[0]] = header[1];
                }
            }
            const req = https.request(
                {
                    hostname: request.hostname,
                    port: request.port,
                    path: request.path,
                    method: request.method,
                    headers: headers,
                },
                function (res) {
                    const response = new Http.Response();
                    response.code = res.statusCode;

                    for (let i in res.headers) {
                        if (Array.isArray(res.headers[i])) {
                            response.header.set(
                                i,
                                (res.headers[i] as string[]).join(",")
                            );
                        } else {
                            response.header.set(i, res.headers[i] as string);
                        }
                    }

                    const buffer: any = [];
                    res.on("data", (chunk) => {
                        buffer.push(chunk);
                    });

                    res.on("end", () => {
                        response.rawBody = Buffer.concat(buffer);
                        if (!response.isBinary()) {
                            response.body = response.rawBody.toString();
                        }
                        resolve(response);
                    });
                }
            );

            // write data to request body
            req.write(request.rawBody);
            req.end();
        });
    }
}
