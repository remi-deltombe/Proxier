
import { Serializable } from 'serializable';
import { SocketClient } from 'socket-client';
import { SerializableClass } from './interfaces';
import { Endpoint } from './endpoint';

import * as ProxyEndpointable from 'proxy'

export class Api
{
	private client : SocketClient;

	private itoe : Map<string, Endpoint<Serializable>> = new Map();

	constructor()
	{
		this.client = new SocketClient();
		this.client.onMessage.subscribe(event=>this.handleMessage(event.id, event.payload));
	}


	public registerEndpoint<C extends Serializable>(id:string, serializableClass: SerializableClass<C>) : Endpoint<C>
	{
		if(!this.itoe.has(id))
		{
			const endpoint = new Endpoint(this.client, id, serializableClass);
			this.itoe.set(id, endpoint);
		}
		return this.itoe.get(id) as Endpoint<C>;
	}


	private handleMessage(id:string, payload:any)
	{
		if(this.itoe.has(id))
		{
			this.itoe.get(id).dispatch(payload);
		}
	}
}
