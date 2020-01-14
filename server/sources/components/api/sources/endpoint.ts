
import { AsyncEvent } from '../../event/event';
import { SerializableInterface, SerializableClass } from '../../serializable/serializable';
import { SocketServer } from '../../socket-server/socket-server';
import { ApiAction } from './interfaces';

export class Endpoint<C extends SerializableInterface>
{
	public onCreate : AsyncEvent<C, C> = new AsyncEvent();
	public onUpdate : AsyncEvent<C, C> = new AsyncEvent();
	public onDelete : AsyncEvent<C, boolean> = new AsyncEvent();
	public onList : AsyncEvent<C[], SerializableInterface[]> = new AsyncEvent();

	private internalId: string;
	private internalSerializableClass: SerializableClass<C>;
	private server: SocketServer
	private instances: Map<string, C> = new Map();

	constructor(server : SocketServer, id:string, serializableClass: SerializableClass<C>)
	{
		this.server = server;
		this.internalId = id; 
		this.internalSerializableClass = serializableClass; 
	}

	public get id() : string 
	{
		return this.internalId;
	}

	public get serializableClass() : SerializableClass<C>
	{
		return this.internalSerializableClass;
	}

	public getInstances() : C[]
	{
		return Array.from(this.instances.values());
	}

	public create(serializable: C)
	{
		this.instances.set(serializable.uuid.toString(), serializable);
		this.server.send(this.id, {
			action: ApiAction.CREATE,
			uuid: serializable.uuid.toString(),
			payload: serializable.serialize()
		});
	}

	public update(serializable: C)
	{
		this.instances.set(serializable.uuid.toString(), serializable);
		this.server.send(this.id, {
			action: ApiAction.UPDATE,
			uuid: serializable.uuid.toString(),
			payload: serializable.serialize()
		});
	}

	public delete(serializable: C)
	{
		this.instances.delete(serializable.uuid.toString());
		this.server.send(this.id, {
			action: ApiAction.DELETE,
			uuid: serializable.uuid.toString(),
		});
	}

	public get(serializable: SerializableInterface)
	{
		this.server.send(this.id, {
			action: ApiAction.GET,
			uuid: serializable.uuid.toString(),
			payload: serializable.serialize()
		});
	}

	public list(serializables: SerializableInterface[])
	{
		this.server.send(this.id, {
			action: ApiAction.LIST,
			payload: serializables.map(v=>({
						uuid:v.uuid.toString(), 
						...v.serialize()
					})
				)
		});
	}

	public dispatch(payload: any)
	{
		switch(payload.action)
		{
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

	private handleGet(payload:any)
	{
		const instance = this.instances.get(payload.uuid);
		this.get(instance);
	}

	private async handleList(payload:any)
	{
		const result = await this.onList.fireAsync(this.getInstances());
		this.list(result[0]);
	}

	private async handleCreate(payload:any)
	{
		const instance = new this.internalSerializableClass();
		instance.deserialize(payload.payload);
		
		const result = await this.onCreate.fireAsync(instance);
		if(result.length && result[0])
		{
			this.create(result[0]);
		}
	}

	private async handleUpdate(payload:any)
	{
		const instance = this.instances.get(payload.uuid);
		instance.deserialize(payload.payload);
		
		const result = await this.onUpdate.fireAsync(instance);
		if(result.length && result[0])
		{
			this.update(result[0]);
		}
	}

	private async handleDelete(payload:any)
	{
		const instance = this.instances.get(payload.uuid);
		const result = await this.onDelete.fireAsync(instance);
		if(result && result[0])
		{
			this.delete(instance);
		}
	}
}
