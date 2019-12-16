
import * as React from 'react';

export interface InputTextInterface
{
	label: string;
	value: string;
	onChange?: (value:string)=>void;
}

export function InputText(config: InputTextInterface)
{
	return (
		<label>
			{config.label}
			<input type="text" value={config.value} onChange={e=>config.onChange && config.onChange(e.target.value)}/>
		</label>
	)
}

