
import * as React from 'react';

import { Api, Endpoint } from 'api';
import { ProxyCreate } from 'proxy-create';
import { ProxyList } from 'proxy-list';
import { ProxyDetail } from 'proxy-detail';
import { Proxy } from 'proxy';

export interface ProxyControllerInterface
{
	api: Api
}

export function ProxyController(config: ProxyControllerInterface) : JSX.Element
{
	const { api } = config;
	const [proxyEndpoint, setProxyEndpoint] = React.useState<Endpoint<Proxy>>(undefined);
	const [proxy, setProxy] = React.useState(undefined);

	function handleOnCreate(proxy:Proxy) 
	{
		if(proxyEndpoint)
		{
			proxyEndpoint.create(proxy);
		}
	}

	React.useEffect(()=>{
		setProxyEndpoint(api.registerEndpoint('proxies', Proxy));
	}, [ api ])

	React.useEffect(()=>{
		if(proxyEndpoint)
		{
			const registrations = [
				proxyEndpoint.onCreate.subscribe(proxy=>setProxy(proxy))
			];
			return ()=>registrations.forEach(registration=>registration.unsubscribe())
		}
	},[ proxyEndpoint ])

	if(!proxyEndpoint)
	{
		return <></>	
	}

	return (
		<>
			<ProxyList endpoint={proxyEndpoint} onClick={proxy=>setProxy(proxy)}/>
			{ proxy && <ProxyDetail proxy={proxy} exchangeEndpoint={proxy.exchangeEndpoint(api)}/>}
			{!proxy && <ProxyCreate onCreate={handleOnCreate}/>}
		</>
	);
}