/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";

import { ButtonInterface } from "./interfaces";
import { style } from "./styles";

export function Button(config: ButtonInterface) {
	return (
		<button
			className="button"
			css={style({ color: config.color })}
			onClick={config?.onClick ?? (() => {})}
		>
			{config.text}
		</button>
	);
}
