import { Http } from "../../protocol/protocol";

export class Parser {
    private internalTargetUrl: string = "";
    private internalSourceUrl: string = "";
    private internalTargetRequest: Http.Request = new Http.Request();
    private internalSourceRequest: Http.Request = new Http.Request();

    private responseAliases: Map<RegExp, string> = new Map();
    private requestAliases: Map<RegExp, string> = new Map();

    public set source(url: string) {
        this.internalSourceUrl = url;
        this.internalSourceRequest = Http.Request.fromUrl(url);
        this.buildAliases();
    }

    public get source(): string {
        return this.internalSourceUrl;
    }

    public set target(url: string) {
        this.internalTargetUrl = url;
        this.internalTargetRequest = Http.Request.fromUrl(url);
        this.buildAliases();
    }

    public get target(): string {
        return this.internalTargetUrl;
    }

    public parseRequest(request: Http.Request): void {
        request.protocol = this.internalTargetRequest.protocol;
        request.port = this.internalTargetRequest.port;
        request.hostname = request.hostname.replace(
            this.internalSourceRequest.hostname,
            this.internalTargetRequest.hostname
        );

        for (let alias of this.requestAliases) {
            for (const [key, value] of request.header) {
                request.header.set(key, value.replace(alias[0], alias[1]));
            }
        }
    }

    public parseResponse(response: Http.Response): void {
        if (!response.isBinary()) {
            for (let alias of this.responseAliases) {
                for (const [key, value] of response.header) {
                    response.header.set(key, value.replace(alias[0], alias[1]));
                }
                response.body = response.body.replace(alias[0], alias[1]);
            }
        }
    }

    private buildAliases(): void {
        this.responseAliases = new Map();
        this.requestAliases = new Map();

        // http://(*).hostname:port/ <-> http://$0.localhost:port/
        this.responseAliases.set(
            new RegExp(
                `${this.internalTargetRequest.protocol}://([a-zA-Z0-9\\-]*)\\.${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`,
                "g"
            ),
            `${this.internalSourceRequest.protocol}://$1.${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`
        );
        this.requestAliases.set(
            new RegExp(
                `${this.internalSourceRequest.protocol}://([a-zA-Z0-9\\-]*)\\.${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`,
                "g"
            ),
            `${this.internalTargetRequest.protocol}://$1.${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`
        );

        // http://hostname:port/ <-> http://localhost:port/
        this.responseAliases.set(
            new RegExp(
                `${this.internalTargetRequest.protocol}://${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`,
                "g"
            ),
            `${this.internalSourceRequest.protocol}://${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`
        );
        this.requestAliases.set(
            new RegExp(
                `${this.internalSourceRequest.protocol}://${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`,
                "g"
            ),
            `${this.internalTargetRequest.protocol}://${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`
        );

        // http://(*).hostname/ -> http://$0.localhost:port/
        this.responseAliases.set(
            new RegExp(
                `${this.internalTargetRequest.protocol}://([a-zA-Z0-9\\-]*)\\.${this.internalTargetRequest.hostname}`,
                "g"
            ),
            `${this.internalSourceRequest.protocol}://$1.${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`
        );

        // http://hostname/ -> http://localhost:port/
        this.responseAliases.set(
            new RegExp(
                `${this.internalTargetRequest.protocol}://${this.internalTargetRequest.hostname}`,
                "g"
            ),
            `${this.internalSourceRequest.protocol}://${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`
        );

        // hostname:port <- localhost:port
        this.requestAliases.set(
            new RegExp(
                `${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`,
                "g"
            ),
            `${this.internalTargetRequest.hostname}`
        );
    }
}
