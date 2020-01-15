import { css } from "@emotion/core";
import { fonts, colors } from "constants";

export const style = css`
    font-size: 14px;
    line-height: 16px;
    font-family: ${fonts.normal};
    color: ${colors.grey2};
    transition: 0.15s;

    .label {
        font-size: 12px;
        margin-right: 5px;
    }

    input {
        border: 1px solid ${colors.grey6};
        font-size: 14px;
        line-height: 16px;
        padding: 4px 8px;
        border-radius: 2px;
        margin-right: 6px;
        font-familly: ${fonts.normal};
        color: ${colors.grey2};
        transition: 0.15s;

        &:hover,
        &:focus,
        &:active {
            border-color: ${colors.primary5};
        }
    }
`;
