import { css } from "@emotion/core";
import { fonts, colors } from "constants";

export const style = css`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${colors.grey8};

    .item {
        padding: 4px 14px;

        font-family: ${fonts.normal};
        line-height: 16px;
        font-size: 14px;

        border-bottom: 3px solid transparent;

        &.is-composed {
            padding: 0;
        }

        &.is-clickable {
            transition: 0.15s;
            cursor: pointer;

            &:hover {
                border-bottom: 3px solid ${colors.grey8};
            }

            &.is-active {
                border-bottom: 3px solid ${colors.primary7};
            }
        }
    }
`;
