
import * as React from 'react';

export interface LinkInterface
{
	text: string;
	link: string;
	blank?: boolean;
}

export function Link(config: LinkInterface)
{
	return <a href={config.link} target={config.blank?'_blank':''}>{config.text}</a>
}

