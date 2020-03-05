import { Event } from "event";
import { Serializable } from "serializable";
import { ApiAction, SerializableClass } from "./interfaces";
import { SocketClient } from "socket-client";

export class Endpoint<C extends Serializable> {
    public onGet: Event<C, void> = new Event();
    public onList: Event<C[], void> = new Event();
    public onCreate: Event<C, void> = new Event();
    public onUpdate: Event<C, void> = new Event();
    public onDelete: Event<C, void> = new Event();

    private internalId: string;
    private internalSerializableClass: SerializableClass<C>;
    private client: SocketClient;
    private instances: Map<string, C> = new Map();

    constructor(
        client: SocketClient,
        id: string,
        serializableClass: SerializableClass<C>
    ) {
        this.client = client;
        this.internalId = id;
        this.internalSerializableClass = serializableClass;
    }

    public get id(): string {
        return this.internalId;
    }

    public getInstances(): C[] {
        return Array.from(this.instances.values());
    }

    public get serializableClass(): SerializableClass<C> {
        return this.internalSerializableClass;
    }

    public save(serializable: C) {
        if(this.instances.has(serializable.uuid.toString()))
        {
          this.update(serializable);  
        } 
        else
        {
            this.create(serializable);
        }
    }


    public create(serializable: C) {
        this.client.send(this.id, {
            action: ApiAction.CREATE,
            payload: serializable.serialize()
        });
    }

    public get(serializable: C) {
        this.client.send(this.id, {
            action: ApiAction.GET,
            uuid: serializable.uuid
        });
    }

    public update(serializable: C) {
        this.client.send(this.id, {
            action: ApiAction.UPDATE,
            uuid: serializable.uuid,
            payload: serializable.serialize()
        });
    }

    public delete(serializable: C) {
        this.client.send(this.id, {
            action: ApiAction.DELETE,
            uuid: serializable.uuid
        });
    }

    public list() {
        this.client.send(this.id, {
            action: ApiAction.LIST
        });
    }

    public dispatch(payload: any) {
        switch (payload.action) {
            case ApiAction.GET:
                this.handleGet(payload);
                break;
            case ApiAction.LIST:
                this.handleList(payload);
                break;
            case ApiAction.CREATE:
                this.handleCreate(payload);
                break;
            case ApiAction.UPDATE:
                this.handleUpdate(payload);
                break;
            case ApiAction.DELETE:
                this.handleDelete(payload);
                break;
        }
    }

    private handleGet(payload: any) {
        const instance = this.instances.get(payload.uuid);
        instance.deserialize(payload.payload);
        this.instances.set(payload.uuid, instance);
        this.onGet.fire(instance);
    }

    private handleList(payload: any) {
        const instances: Map<string, C> = new Map();
        const toFire: C[] = [];
        for (const data of payload.payload) {
            const uuid = data.uuid;
            let instance: C;
            if (!this.instances.has(data.uuid)) {
                instance = new this.internalSerializableClass();
                instance.uuid = uuid;
            } else {
                instance = this.instances.get(uuid);
            }
            instance.deserialize(data);
            instances.set(uuid, instance);
            toFire.push(instance);
        }
        this.instances = instances;
        this.onList.fire(toFire);
    }

    private handleCreate(payload: any) {
        const instance = new this.internalSerializableClass();
        instance.uuid = payload.uuid;
        instance.deserialize(payload.payload);
        this.instances.set(payload.uuid, instance);
        this.onCreate.fire(instance);
    }

    private handleUpdate(payload: any) {
        const instance = this.instances.get(payload.uuid);
        instance.deserialize(payload.payload);
        this.instances.set(payload.uuid, instance);
        this.onUpdate.fire(instance);
    }

    private handleDelete(payload: any) {
        const instance = this.instances.get(payload.uuid);
        this.instances.delete(payload.uuid);
        this.onDelete.fire(instance);
    }
}
