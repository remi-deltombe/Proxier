
import { Uuid } from '../../uuid/uuid';

export interface SerializableInterface
{
	readonly uuid: Uuid;
	serialize() : any;
	deserialize(data: any) : void;
}
