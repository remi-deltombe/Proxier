/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";

import { ButtonInterface } from "./interfaces";
import { style } from "./styles";

export function Button(config: ButtonInterface) {
    const { onClick = () => {} } = config;
    return (
        <button
            className="button"
            css={style({ color: config.color })}
            onClick={e => {
                e.stopPropagation();
                onClick();
            }}
        >
            {config.text}
        </button>
    );
}
