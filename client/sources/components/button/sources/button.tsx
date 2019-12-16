
import * as React from 'react';

export interface ButtonInterface
{
	text: string;
	onClick?: ()=>void;
}

export function Button(config: ButtonInterface)
{
	return <button onClick={(config?.onClick ?? (()=>{}))}>{config.text}</button>
}

