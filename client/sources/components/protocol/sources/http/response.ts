import { BINARY_TYPES } from "./constants";
import { Serializable } from "serializable";

export class Response implements Serializable {
    public uuid: string;
    public code: number = 200;
    public header: Map<string, string> = new Map();
    public body: string = "";

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

    public serialize(): any {
        const result = {
            code: this.code,
            header: {},
            body: this.body
        };

        for (const [key, value] of this.header.entries()) {
            (result.header as any)[key] = value;
        }
        return result;
    }

    public deserialize(data: any): void {
        this.code = data.code ?? this.code;
        this.body = data.body ?? this.body;
        if (data.header) {
            this.header = new Map();
            for (const h in data.header) {
                this.header.set(h, data.header[h]);
            }
        }
    }
}
