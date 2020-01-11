

import { Http } from '../../protocol/protocol'

export interface ProxyRequestEvent
{
	request:Http.Request;
}

export interface ProxyResponseEvent
{
	response:Http.Response;
}

export interface ProxyExchangeEvent
{
	cached: boolean;
	exchange: Http.Exchange;
}


export interface CacheEntry
{
	cached: boolean;
	exchange: Http.Exchange;
}