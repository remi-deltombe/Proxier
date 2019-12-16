
export class Request
{
	public header : Map<string, string> = new Map();
	public method: string = 'GET';
	public hostname: string = 'localhost';
	public protocol: string = 'http';
	public port: number = 80;
	public path: string = '/';

	public static fromUrl(url: string) : Request
	{
		let parts : string[];
		const request = new Request();
		
		// protocol extraction
		parts = url.split('://');
		if(parts.length > 0)
		{
			request.protocol = parts[0].trim();
			url = parts[1]
		} 
		else
		{
			url = parts[0]
		}

		// path extraction
		parts = url.split('/');
		if(parts.length > 0)
		{
			request.path = '/' + parts.slice(1).join('/');
		} 
		url = parts[0]

		// hostname + port extraction
		parts = url.split(':');
		if(parts.length > 1)
		{
			request.port = parseInt(parts[1]);
		} 
		else
		{
			request.port = request.protocol === 'https' ? 443 : 80;
		}
		request.hostname = parts[0];

		return request;
	}
}	
