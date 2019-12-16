
import { SerializableInterface } from '../../serializable/serializable';
import { Uuid } from '../../uuid/uuid';

export class Serializable implements SerializableInterface
{
	public readonly uuid: Uuid = new Uuid();

	public url: string = '';
	public hostname: string = '';
	public port: number = 0;


	public serialize() : any {
		return {
			url: this.url,
			hostname: this.hostname,
			port: this.port,
		};
	}

	public deserialize(data: any) : void {
		this.url = data.url;
		this.hostname = data.hostname;
		this.port = data.port;
	}
}

