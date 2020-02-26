/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";

import { LinkInterface } from "./interfaces";
import { style } from "./styles";

export function Link(config: LinkInterface) {
    return (
        <a
            className="link"
            css={style}
            href={config.link}
            target={config.blank ? "_blank" : ""}
        >
            {config.text}
        </a>
    );
}
