
import * as React from 'react';

import { Registration } from 'event';
import { Button } from 'button';
import { InputText } from 'input-text';
import { Table, TableRowInterface } from 'table';
import { Link } from 'link';
import { Api, Endpoint } from 'api';
import { Proxy , Request } from 'proxy';

export interface ProjectInterface
{
	api: Api;
}

interface ProjectTableRowInterface extends TableRowInterface
{
	request: Request;
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
			const endpoint = proxy.requestEndpoint(config.api);
			const registrations = [
				endpoint.onCreate.subscribe((request)=>{
					rows.push({
						request,
						items: [
							{ text: request.method },	
							{ text: request.url },	
							{ element: <Button text={request.cached ? 'Disable' : 'Enable'} onClick={()=>{
								request.cached = !request.cached;
								endpoint.update(request);
							}}/>},	
						]
					})
					setRows([...rows]);
				}),
				endpoint.onUpdate.subscribe((request)=>{
					for(const i in rows)
					{
						if(rows[i].request.uuid == request.uuid)
						{
							rows[i] = {
								request,
								items: [
									{ text: request.method },	
									{ text: request.url },	
									{ element: <Button text={request.cached ? 'Disable' : 'Enable'} onClick={()=>{
										request.cached = !request.cached;
										endpoint.update(request);
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
	const requestEndpoint = proxy.requestEndpoint(config.api);
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
										row.request.cached = true; 
										requestEndpoint.update(row.request)
									})}/>
									<Button text="Disable all" onClick={()=>rows.forEach(row=>{
										row.request.cached = false; 
										requestEndpoint.update(row.request)
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

