import { css } from "@emotion/core";
import { fonts, colors } from "constants";

export const style = css`
    font-size: 14px;
    line-height: 16px;
    font-family: ${fonts.normal};
    color: ${colors.primary5};
    transition: 0.15s;
    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:active {
        color: ${colors.primary1};
    }
`;
