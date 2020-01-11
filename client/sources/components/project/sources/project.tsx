
import * as React from 'react';

import { Registration } from 'event';
import { Button } from 'button';
import { InputText } from 'input-text';
import { Table, TableRowInterface } from 'table';
import { Link } from 'link';
import { Api, Endpoint } from 'api';
import { Proxy , Exchange } from 'proxy';

export interface ProjectInterface
{
	api: Api;
}

interface ProjectTableRowInterface extends TableRowInterface
{
	exchange: Exchange;
}

export function Project(config: ProjectInterface)
{
	const [ url, setUrl ] = React.useState<string>('https://hitek.fr');
	const [ proxy, setProxy ] = React.useState<Proxy>(null);
	const [ rows, setRows ] = React.useState<ProjectTableRowInterface[]>([]);
	const proxyEndpoint = config.api.registerEndpoint('proxies', Proxy);

	React.useEffect(()=>{
		const registrations = [
			proxyEndpoint.onCreate.subscribe((proxy)=>{
				setProxy(proxy);
			}),
			proxyEndpoint.onUpdate.subscribe((proxy)=>{
				setProxy(proxy);
			})
		]
		return ()=>registrations.forEach(registration=>registration.unsubscribe())
	})

	React.useEffect(()=>{
		if(proxy)
		{
			const endpoint = proxy.exchangeEndpoint(config.api);
			const registrations = [
				endpoint.onCreate.subscribe((exchange)=>{
					console.log('created');
					rows.push({
						exchange,
						items: [
							{ text: exchange.method },	
							{ text: exchange.url },	
							{ element: <Button text={exchange.cached ? 'Disable' : 'Enable'} onClick={()=>{
								exchange.cached = !exchange.cached;
								endpoint.update(exchange);
							}}/>},	
						]
					})
					setRows([...rows]);
				}),
				endpoint.onUpdate.subscribe((exchange)=>{
					for(const i in rows)
					{
						if(rows[i].exchange.uuid == exchange.uuid)
						{
							rows[i] = {
								exchange,
								items: [
									{ text: exchange.method },	
									{ text: exchange.url },	
									{ element: <Button text={exchange.cached ? 'Disable' : 'Enable'} onClick={()=>{
										exchange.cached = !exchange.cached;
										endpoint.update(exchange);
									}}/>},	
								]
							}
						}
					}
					setRows([...rows]);
				})
			]
			return ()=>registrations.forEach(registration=>registration.unsubscribe())
		}
	}, [proxy])

	if(!proxy)
	{
		return  (
			<>
				<InputText label="Url" value={url} onChange={v=>setUrl(v)}/>
				<Button text="Create" onClick={()=>proxyEndpoint.create(new Proxy(url))}/>
			</>
		)
	}
	
	

	const link = `http://${proxy.hostname}:${proxy.port}`
	const exchangeEndpoint = proxy.exchangeEndpoint(config.api);
	return <div>
		<Link text={link} link={link} blank={true}/>
		-> 
		<Link text={proxy.url} link={proxy.url} blank={true}/>
		<hr/>
		<Table 
			headers={[
				{
					items:[
							{ text: "Method" },
							{ text: "Request" },
							{ element: (
								<>
									<Button text="Enable all" onClick={()=>rows.forEach(row=>{
										row.exchange.cached = true; 
										exchangeEndpoint.update(row.exchange)
									})}/>
									<Button text="Disable all" onClick={()=>rows.forEach(row=>{
										row.exchange.cached = false; 
										exchangeEndpoint.update(row.exchange)
									})}/>
								</>
							) }
					]
				}
			]}
			rows={rows}
		/>
	</div>
}

