
import * as React from 'react';

import {Proxy} from 'proxy';
import {Endpoint} from 'api';

export interface ProxyListInterface
{
	endpoint: Endpoint<Proxy>;

	onAdd: ()=>void; 
	onClick: (proxy:Proxy)=>void; 
}

export function ProxyList(config: ProxyListInterface) : JSX.Element
{
	const { 
		endpoint,
		onClick,
		onAdd
	} = config;
	const [ proxies, setProxies ] = React.useState([]);

	function refreshProxies() : void
	{
		setProxies(endpoint.getInstances());
	}

	function renderItem(proxy: Proxy) : JSX.Element
	{
		return <div onClick={()=>onClick(proxy)}>{proxy.url}</div>
	}

	function renderAddButton() : JSX.Element
	{
		return <div onClick={e=>onAdd()}>+</div>
	}

	React.useEffect(()=>{
		const registrations = [
			endpoint.onCreate.subscribe((proxy)=>refreshProxies()),
			endpoint.onUpdate.subscribe((proxy)=>refreshProxies()),
			endpoint.onDelete.subscribe((proxy)=>refreshProxies()),
			endpoint.onList.subscribe((proxies)=>refreshProxies())
		]

		endpoint.list();

		return ()=>registrations.forEach(registration=>registration.unsubscribe())
	}, [endpoint]);

	return (
		<>
			{proxies.map(proxy=>renderItem(proxy))}
			{renderAddButton()}
		</>
	);
}