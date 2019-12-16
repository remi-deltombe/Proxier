
import { BINARY_TYPES } from './constants'

export class Response
{
	public code: number = 200;
	public header: Map<string, string> = new Map();
	public body: string = '';
	public rawBody: Buffer;

	public get contentType() : string
	{
		return this.header.has('content-type') ? this.header.get('content-type') : 'text' 
	}

	public set contentType(type: string) 
	{
		this.header.set('content-type', type) 
	}

	public isBinary() : boolean
	{
		const type = this.contentType;
		for(const BINARY_TYPE of BINARY_TYPES)
		{
			if(BINARY_TYPE === type || BINARY_TYPE.indexOf(type + ';') === 0)
			{
				return true;
			}
		}
		return false;
	}
}
