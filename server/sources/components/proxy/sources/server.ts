import { Event } from "../../event/event";
import { Http } from "../../protocol/protocol";

import * as express from "express";
import { Express } from "express";

export class Server {
    public onRequest: Event<Http.Request, Promise<Http.Response>> = new Event();

    private app: Express;
    private server: any;

    public get port(): number {
        return this.server.address().port;
    }

    public get hostname(): string {
        return "localhost";
    }

    public get url(): string {
        return "http://" + this.hostname + ":" + this.port + "/";
    }

    public async listen(port: number = 0): Promise<boolean> {
        return new Promise(resolve => {
            this.app = express();

            this.app.use(function(req, res, next) {
                const buffer: any = [];
                req.on("data", chunk => {
                    buffer.push(chunk);
                });

                req.on("end", () => {
                    req.body = Buffer.concat(buffer);
                    next();
                });
            });

            this.app.all("*", async (req, res) => {
                const request = new Http.Request();
                request.method = req.method;
                request.path = req.url;
                request.rawBody = req.body;

                for (const i in req.headers) {
                    if (Array.isArray(req.headers[i])) {
                        request.header.set(
                            i,
                            (req.headers[i] as string[]).join(",")
                        );
                    } else {
                        request.header.set(i, req.headers[i] as string);
                    }
                }

                const promises = this.onRequest.fire(request);
                const responses = await Promise.all(promises);

                res.removeHeader("Transfer-Encoding");
                res.removeHeader("X-Powered-By");
                res.removeHeader("ETag");

                if (responses.length) {
                    const response = responses[0];
                    res.status(response.code);
                    for (let h of response.header) {
                        res.set(h[0], h[1]);
                    }
                    res.send(
                        response.isBinary() ? response.rawBody : response.body
                    );
                } else {
                    res.status(404);
                    res.send("404");
                }
            });

            this.server = this.app.listen(port, () => resolve(true));
        });
    }

    public stop() {
        //this.app.stop();
    }
}
