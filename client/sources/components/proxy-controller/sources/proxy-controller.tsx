
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
	const [exchangeEndpoint, setExchangeEndpoint] = React.useState<Endpoint<Proxy>>(undefined);

	const [proxy, setProxy] = React.useState(undefined);
	const [proxies, setProxies] = React.useState([]);
	const [exchanges, setExchanges] = React.useState([]);

	function handleOnCreate(proxy: Proxy)
	{
		proxyEndpoint.create(proxy)
	}

	function refreshProxies(focus?: Proxy)
	{
		setProxies(proxyEndpoint?.getInstances() ?? []);
		setProxy(focus ?? proxy);
	}

	function refreshExchanges()
	{
		setExchanges(exchangeEndpoint?.getInstances() ?? []);
	}

	React.useEffect(()=>{
		setExchangeEndpoint(proxy?.exchangeEndpoint(api) ?? undefined);
	}, [proxy]);

	React.useEffect(()=>{
		setProxyEndpoint(api.registerEndpoint('proxies', Proxy));
	}, [ api ])

	React.useEffect(()=>{
		if(proxyEndpoint)
		{
			const registrations = [
				proxyEndpoint.onCreate.subscribe((proxy)=>refreshProxies(proxy)),
				proxyEndpoint.onUpdate.subscribe((proxy)=>refreshProxies()),
				proxyEndpoint.onDelete.subscribe((proxy)=>refreshProxies()),
				proxyEndpoint.onList.subscribe((proxies)=>refreshProxies())
			]

			proxyEndpoint.list();

			return ()=>registrations.forEach(registration=>registration.unsubscribe())
		}
	}, [proxyEndpoint]);

	React.useEffect(()=>{
		if(exchangeEndpoint)
		{
			const registrations = [
				exchangeEndpoint.onCreate.subscribe((exchange)=>refreshExchanges()),
				exchangeEndpoint.onUpdate.subscribe((exchange)=>refreshExchanges()),
				exchangeEndpoint.onDelete.subscribe((exchange)=>refreshExchanges()),
				exchangeEndpoint.onList.subscribe((exchanges)=>refreshExchanges())
			]

			exchangeEndpoint.list();

			return ()=>registrations.forEach(registration=>registration.unsubscribe())
		}
	}, [exchangeEndpoint]);

	return (
		<>
			<ProxyList proxies={proxies} onClick={proxy=>setProxy(proxy)} onAdd={()=>setProxy(undefined)}/>
			{ proxy && <ProxyDetail proxy={proxy} exchanges={exchanges}/>}
			{!proxy && <ProxyCreate onCreate={handleOnCreate}/>}
		</>
	);
}