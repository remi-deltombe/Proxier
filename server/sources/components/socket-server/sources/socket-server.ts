
import * as io from 'socket.io';
import { Event } from '../../event/event'
import { WebServer } from '../../web-server/web-server'
import { SocketClientEvent } from './interfaces';

export class SocketServer
{
	public onMessage: Event<SocketClientEvent, void> = new Event();

	private io : io.Server;

	public get port() : number
	{
		return this.io ? (this.io as any).httpServer.address().port : undefined;
	}

	public async listen(webServer: WebServer) : Promise<boolean>
	{
		return new Promise(resolve=>{
			this.io = io();

			this.io.attach(webServer.http)

			this.io.on('connection', (socket) => {
				socket.use((data)=>{
					this.onMessage.fire({ 
						id: data[0], 
						payload: data[1]
					})
				});
			});
		})
	}

	public send(id:string, payload:any)
	{
		if(this.io)
		{
			this.io.emit(id, payload)			
		}
	}

	public stop()
	{
		//this.app.stop();
	}

}

