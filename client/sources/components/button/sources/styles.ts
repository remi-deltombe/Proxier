import { css } from "@emotion/core";
import { fonts, colors } from "constants";
import { ButtonColor } from "./interfaces";

const colorSchemes = {
    [ButtonColor.DEFAULT]: {
        color: colors.grey2,
        background: colors.grey8,
        colorHover: colors.grey10,
        backgroundHover: colors.primary5,
        colorActive: colors.grey10,
        backgroundActive: colors.primary1
    },

    [ButtonColor.GREEN]: {
        color: colors.grey10,
        background: colors.green6,
        colorHover: colors.grey10,
        backgroundHover: colors.green4,
        colorActive: colors.grey10,
        backgroundActive: colors.green4
    },

    [ButtonColor.RED]: {
        color: colors.grey10,
        background: colors.red6,
        colorHover: colors.grey10,
        backgroundHover: colors.red4,
        colorActive: colors.grey10,
        backgroundActive: colors.red4
    }
};

export const style = ({ color = ButtonColor.DEFAULT }) => {
    const scheme = colorSchemes[color];
    return css`
        font-size: 14px;
        line-height: 16px;
        padding: 4px 14px;
        margin-bottom: 8px;
        border-radius: 2px;
        margin-right: 6px;
        font-family: ${fonts.normal};
        color: ${scheme.color};
        background: ${scheme.background};
        border: 0;
        transition: 0.15s;
        cursor: pointer;
        border: none;
        outline: none;

        &:hover {
            color: ${scheme.colorHover};
            background: ${scheme.backgroundHover};
        }

        &:active {
            outline: 0 !important;
            color: ${scheme.colorActive};
            background: ${scheme.backgroundActive};
        }
    `;
};
