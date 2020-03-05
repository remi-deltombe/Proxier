/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";

import { openLink } from "polyfill";

import { LinkInterface } from "./interfaces";
import { style } from "./styles";

export function Link(config: LinkInterface) {
    return (
        <span
            className="link"
            css={style}
            onClick={() => openLink(config.link, config.blank)}
        >
            {config.text}
        </span>
    );
}
