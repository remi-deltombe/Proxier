export interface Serializable {
    uuid: string;
    serialize(): any;
    deserialize(data: any): void;
}
