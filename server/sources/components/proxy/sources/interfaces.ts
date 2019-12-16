

import { Http } from '../../protocol/protocol'

export interface ProxyRequestEvent
{
	request:Http.Request;
}

export interface ProxyResponseEvent
{
	cached: boolean;
	request:Http.Request;
	response:Http.Response;
}


export interface CacheEntry
{
	cached: boolean;
	request:Http.Request;
	response:Http.Response;
}