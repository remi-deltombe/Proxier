/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";

import { InputTextInterface } from "./interfaces";
import { style } from "./styles";

export function InputText(config: InputTextInterface) {
    return (
        <label css={style}>
            {config.label && <div className="label">{config.label}</div>}
            <input
                type="text"
                value={config.value}
                onChange={e =>
                    config.onChange && config.onChange(e.target.value)
                }
            />
        </label>
    );
}
