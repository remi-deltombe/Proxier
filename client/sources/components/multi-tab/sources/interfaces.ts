export interface MultiTabItemInterface {
	text?: string;
	element?: JSX.Element;
	active?: boolean;
	onClick?: () => void;
}

export interface MultiTabInterface {
	items: MultiTabItemInterface[];
}
