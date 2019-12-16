
import * as io from 'socket.io-client';

import { Event } from 'event';
import { SocketClientEvent } from './interfaces';

export class SocketClient
{
	private io : any;

	public onMessage : Event<SocketClientEvent> = new Event(); 

	constructor()
	{
		this.io = io();
		this.io.onevent = (data:any) => {
			this.onMessage.fire({
				id: data.data[0], 
				payload: data.data[1]
			})
		};
	}

	public send(id:string, payload: any)
	{
		this.io.emit(id, payload);
	}


}