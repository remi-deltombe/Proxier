export interface Serializable {
    uuid: string;
    serialize(children?: boolean): any;
    deserialize(data: any): void;
}
