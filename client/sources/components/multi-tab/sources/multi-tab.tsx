/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";

import { MultiTabInterface, MultiTabItemInterface } from "./interfaces";
import { style } from "./styles";

export function MultiTab(config: MultiTabInterface): JSX.Element {
	function renderItem(key: string, item: MultiTabItemInterface): JSX.Element {
		const { text, element, active, onClick } = item;
		return (
			<div
				className={`item ${active ? "is-active" : ""}`}
				onClick={() => onClick()}
			>
				{text}
				{element}
			</div>
		);
	}

	return (
		<div css={style}>
			{config.items.map((v, i) => renderItem(`${i}`, v))}
		</div>
	);
}
