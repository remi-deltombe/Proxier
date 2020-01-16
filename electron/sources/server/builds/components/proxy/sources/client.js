"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protocol_1 = require("../../protocol/protocol");
const https = require("https");
const http = require("http");
class Client {
    send(request) {
        return request.protocol == "http"
            ? this.http(request)
            : this.https(request);
    }
    http(request) {
        return new Promise(resolve => {
            const headers = {};
            const bannedHeader = [
                "host",
                "accept-encoding",
                "referer"
            ];
            for (const header of request.header) {
                if (!bannedHeader.includes(header[0])) {
                    headers[header[0]] = header[1];
                }
            }
            const req = http.request({
                hostname: request.hostname,
                port: request.port,
                path: request.path,
                method: request.method,
                headers: headers
            }, function (res) {
                const response = new protocol_1.Http.Response();
                response.code = res.statusCode;
                for (let i in res.headers) {
                    if (Array.isArray(res.headers[i])) {
                        response.header.set(i, res.headers[i].join(","));
                    }
                    else {
                        response.header.set(i, res.headers[i]);
                    }
                }
                const buffer = [];
                res.on("data", chunk => {
                    buffer.push(chunk);
                });
                res.on("end", () => {
                    response.rawBody = Buffer.concat(buffer);
                    if (!response.isBinary()) {
                        response.body = response.rawBody.toString();
                    }
                    resolve(response);
                });
            });
            // write data to request body
            req.write(request.rawBody);
            req.end();
        });
    }
    https(request) {
        return new Promise(resolve => {
            const headers = {};
            const bannedHeader = ["accept-encoding"];
            for (const header of request.header) {
                if (!bannedHeader.includes(header[0])) {
                    headers[header[0]] = header[1];
                }
            }
            const req = https.request({
                hostname: request.hostname,
                port: request.port,
                path: request.path,
                method: request.method,
                headers: headers
            }, function (res) {
                const response = new protocol_1.Http.Response();
                response.code = res.statusCode;
                for (let i in res.headers) {
                    if (Array.isArray(res.headers[i])) {
                        response.header.set(i, res.headers[i].join(","));
                    }
                    else {
                        response.header.set(i, res.headers[i]);
                    }
                }
                const buffer = [];
                res.on("data", chunk => {
                    buffer.push(chunk);
                });
                res.on("end", () => {
                    response.rawBody = Buffer.concat(buffer);
                    if (!response.isBinary()) {
                        response.body = response.rawBody.toString();
                    }
                    resolve(response);
                });
            });
            // write data to request body
            req.write(request.rawBody);
            req.end();
        });
    }
}
exports.Client = Client;

//# sourceMappingURL=client.js.map
