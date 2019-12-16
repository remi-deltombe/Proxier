
export class HttpRequest
{
	public header : Map<string, string> = new Map();
	public method: string = 'GET';
	public hostname: string = 'localhost';
	public protocol: string = 'http';
	public port: number = 80;
	public path: string = '/';
}
