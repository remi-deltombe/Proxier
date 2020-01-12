
import * as React from 'react';

import {Proxy} from 'proxy';
import {Endpoint} from 'api';

export interface ProxyListInterface
{
	endpoint: Endpoint<Proxy>;

	onClick: (proxy:Proxy)=>void; 
}

export function ProxyList(config: ProxyListInterface) : JSX.Element
{
	const { 
		endpoint,
		onClick = ()=>{}
	} = config;
	const [ proxies, setProxies ] = React.useState([]);

	function handleOnCreate(proxy: Proxy) : void
	{

	}

	function handleOnUpdate(proxy: Proxy) : void
	{

	}

	function handleOnDelete(proxy: Proxy) : void
	{

	}

	function handleOnList(proxies: Proxy[]) : void
	{	
		setProxies(proxies);
	}

	function renderItem(proxy: Proxy) : JSX.Element
	{
		return <div onClick={()=>onClick(proxy)}>{proxy.url}</div>
	}

	function renderAddButton() : JSX.Element
	{
		return <>+</>
	}

	React.useEffect(()=>{
		const registrations = [
			endpoint.onCreate.subscribe((proxy)=>handleOnCreate(proxy)),
			endpoint.onUpdate.subscribe((proxy)=>handleOnUpdate(proxy)),
			endpoint.onDelete.subscribe((proxy)=>handleOnDelete(proxy)),
			endpoint.onList.subscribe((proxies)=>handleOnList(proxies))
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