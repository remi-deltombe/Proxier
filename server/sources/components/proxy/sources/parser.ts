
import { Http } from '../../protocol/protocol'

export class Parser
{
	private internalTargetUrl: string = '';
	private internalSourceUrl: string = '';
	private internalTargetRequest: Http.Request = new Http.Request();
	private internalSourceRequest: Http.Request = new Http.Request();
	private aliases: Map<RegExp, string> = new Map();

	public set source(url:string)
	{
		this.internalSourceUrl = url;
		this.internalSourceRequest = Http.Request.fromUrl(url);
		this.buildAliases();
	}

	public get source():string
	{
		return this.internalSourceUrl;
	}

	public set target(url:string)
	{
		this.internalTargetUrl = url;
		this.internalTargetRequest = Http.Request.fromUrl(url);
		this.buildAliases();
	}

	public get target():string
	{
		return this.internalTargetUrl;
	}

	public parseRequest(request: Http.Request) : void
	{
		request.protocol = this.internalTargetRequest.protocol;
		request.port = this.internalTargetRequest.port;
		request.hostname = request.hostname.replace(
			this.internalSourceRequest.hostname, 
			this.internalTargetRequest.hostname
		);
	}

	public parseResponse(response: Http.Response) : void
	{
		if(!response.isBinary())
		{
			for(let alias of this.aliases)
			{
				for(const [key, value] of response.header)
				{
					response.header.set(key, value.replace(alias[0], alias[1]));
				}
				response.body = response.body.replace(alias[0], alias[1])
			}
		}
	}

	private buildAliases() : void
	{
		this.aliases = new Map();


		// http://hostname/ -> http://localhost:port/
		this.aliases.set(
			new RegExp(`${this.internalTargetRequest.protocol}://${this.internalTargetRequest.hostname}`,'g'), 
			`${this.internalSourceRequest.protocol}://${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`
		)

		// http://(*).hostname/ -> http://$0.localhost:port/
		this.aliases.set(
			new RegExp(`${this.internalTargetRequest.protocol}://([a-zA-Z0-9\\-]*)\\.${this.internalTargetRequest.hostname}`,'g'), 
			`${this.internalSourceRequest.protocol}://$1.${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`
		)

		// http://hostname:port/ -> http://localhost:port/
		this.aliases.set(
			new RegExp(`${this.internalTargetRequest.protocol}://${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`,'g'), 
			`${this.internalSourceRequest.protocol}://${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`
		)

		// http://(*).hostname:port/ -> http://$0.localhost:port/
		this.aliases.set(
			new RegExp(`${this.internalTargetRequest.protocol}://([a-zA-Z0-9\\-]*)\\.${this.internalTargetRequest.hostname}:${this.internalTargetRequest.port}`,'g'), 
			`${this.internalSourceRequest.protocol}://$1.${this.internalSourceRequest.hostname}:${this.internalSourceRequest.port}`
		)
	}
}