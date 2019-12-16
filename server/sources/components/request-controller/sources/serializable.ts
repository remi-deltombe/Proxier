
import { SerializableInterface } from '../../serializable/serializable';
import { Uuid } from '../../uuid/uuid';


export class Serializable implements SerializableInterface
{
	public readonly uuid: Uuid = new Uuid();

	public url: string = '';
	public method: string = '';
	public cached: boolean = true;

	public serialize() : any {
		return {
			url: this.url,
			method: this.method,
			cached: this.cached,
		};
	}

	public deserialize(data: any) : void {
		this.url = data.url ?? this.url;
		this.method = data.method ?? this.method;
		this.cached = data.cached ?? this.cached;
	}
}

