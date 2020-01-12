
import * as React from 'react';

import { Registration } from 'event';
import { Button } from 'button';
import { InputText } from 'input-text';
import { Table, TableRowInterface } from 'table';
import { Link } from 'link';
import { Api, Endpoint } from 'api';
import { Proxy , Exchange } from 'proxy';

export interface ProxyDetailInterface
{
	//api: Api;
	proxy: Proxy;
	exchangeEndpoint: Endpoint<Exchange>;
}

interface ProxyDetailTableRowInterface extends TableRowInterface
{
	exchange: Exchange;
}

export function ProxyDetail(config: ProxyDetailInterface)
{
	const { proxy, exchangeEndpoint } = config;

	const link = `http://${proxy.hostname}:${proxy.port}`

	const [rows, setRows] = React.useState<ProxyDetailTableRowInterface[]>([]);

	function exchangeToRow(exchange: Exchange) : ProxyDetailTableRowInterface
	{
		return {
			exchange,
			items: [
				{ text: exchange.method },	
				{ text: exchange.url },	
				{ element: <Button text={exchange.cached ? 'Disable' : 'Enable'} onClick={()=>{
					exchange.cached = !exchange.cached;
					exchangeEndpoint.update(exchange);
				}}/>},	
			]
		}
	}

	function refreshRows()
	{
		setRows(exchangeEndpoint.getInstances().map(exchangeToRow));
	}

	React.useEffect(()=>{
		if(exchangeEndpoint)
		{
			const registrations = [
				exchangeEndpoint.onList.subscribe((exchanges)=>refreshRows()),
				exchangeEndpoint.onCreate.subscribe((exchange)=>refreshRows()),
				exchangeEndpoint.onUpdate.subscribe((exchange)=>refreshRows()),
				exchangeEndpoint.onDelete.subscribe((exchange)=>refreshRows()),
			];

			exchangeEndpoint.list();

			return ()=>registrations.forEach(registration=>registration.unsubscribe())
		}
	}, [exchangeEndpoint])


	return (
		<div>
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
								{ element: (<>
									<Button text="Enable all" onClick={()=>rows.forEach(row=>{
										row.exchange.cached = true; 
										exchangeEndpoint.update(row.exchange)
									})}/>
									<Button text="Disable all" onClick={()=>rows.forEach(row=>{
										row.exchange.cached = false; 
										exchangeEndpoint.update(row.exchange)
									})}/>
								</>) }
						]
					}
				]}
				rows={rows}
			/>
		</div>
	);
}

