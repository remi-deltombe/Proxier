/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";

import { TextEditorInterface } from "./interfaces";
import { style } from "./styles";

export function TextEditor(config: TextEditorInterface) {
    const { label, value, onChange, rows } = config;
    return (
        <div css={style}>
            {label && <div className="label">{label}</div>}
            <div className="field">
                <textarea
                    rows={rows}
                    onChange={e => onChange && onChange(e.target.value)}
                    value={value}
                />
            </div>
        </div>
    );
}
