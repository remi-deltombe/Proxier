declare module "sources/serializable" {
    export interface Serializable {
        uuid: string;
        serialize(): any;
        deserialize(data: any): void;
    }
}
declare module "serializable" {
    export * from "sources/serializable";
}
