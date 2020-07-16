import * as express from "express";
import * as http from "http";
import { Express } from "express";

export class WebServer {
    private app: Express;
    private server: http.Server;
    private clientPath: string;

    constructor(clientPath: string = "./../client/") {
        this.clientPath = clientPath;
    }

    public get port(): number {
        return (this.http.address() as any).port;
    }

    public get url(): string {
        return "http://localhost:" + this.port;
    }

    public get http(): http.Server {
        return this.server;
    }

    public async listen(port: number = 0): Promise<boolean> {
        return new Promise((resolve) => {
            this.app = express();
            this.app.use(express.static(this.clientPath));
            this.server = this.app.listen(port, "127.0.0.1", () => {
                console.log(
                    `Webserver listening on ${
                        (this.server.address() as any).port
                    }`
                );
                resolve(true);
            });
        });
    }

    public stop() {
        //this.app.stop();
    }
}
