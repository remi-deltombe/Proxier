import { BINARY_TYPES } from "./constants";
import { SerializableInterface } from "../../../serializable/serializable";
import { Uuid } from "../../../uuid/uuid";

export class Response implements SerializableInterface {
    public readonly uuid: Uuid = new Uuid();
    public code: number = 200;
    public header: Map<string, string> = new Map();
    public body: string = "";
    public rawBody: Buffer = Buffer.from([]);

    public get contentType(): string {
        return this.header.has("content-type")
            ? this.header.get("content-type")
            : "text";
    }

    public set contentType(type: string) {
        this.header.set("content-type", type);
    }

    public isBinary(): boolean {
        const type = this.contentType;
        for (const BINARY_TYPE of BINARY_TYPES) {
            if (BINARY_TYPE === type || BINARY_TYPE.indexOf(type + ";") === 0) {
                return true;
            }
        }
        return false;
    }

    public serialize(children: boolean = false): any {
        const result = {
            code: this.code,
            header: {},
            body: this.body
        };

        for (const h in this.header) {
            (result.header as any)[h] = this.header.get(h);
        }
        return result;
    }

    public deserialize(data: any): void {}
}
