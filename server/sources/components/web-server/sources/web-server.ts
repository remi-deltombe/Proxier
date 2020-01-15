import * as express from "express";
import * as http from "http";
import * as opn from "opn";
import { Express } from "express";

export class WebServer {
    private app: Express;
    private server: http.Server;

    public socketInfo: any = {};

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
        return new Promise(resolve => {
            this.app = express();
            this.app.use(express.static("./../client/"));
            this.server = this.app.listen(port, () => {
                console.log(
                    `Webserver listening on ${
                        (this.server.address() as any).port
                    }`
                );
                opn('http://localhost:'+ (this.server.address() as any).port + '/builds/bootstraps/client/index.html')
                resolve(true);
            });
        });
    }

    public stop() {
        //this.app.stop();
    }
}
