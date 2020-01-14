/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";

import { ButtonInterface } from "./interfaces";
import { style } from "./styles";

export function Button(config: ButtonInterface) {
    return (
        <button css={style} onClick={config?.onClick ?? (() => {})}>
            {config.text}
        </button>
    );
}
