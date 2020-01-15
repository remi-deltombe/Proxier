import { css } from "@emotion/core";
import { fonts, colors } from "constants";

export const style = css`
    width: 100%;
    font-familly: ${fonts.normal};
    font-size: 14px;
    line-height: 16px;
    color: ${colors.grey3};
    text-align: left;
    border-collapse: collapse;
    border: none;

    th,
    td {
        padding: 4px 14px;
    }

    th {
        color: ${colors.grey1};
        border-bottom: 3px solid ${colors.grey9};asc
    }

    td {
        border-bottom: 1px solid ${colors.grey9};
    }

    tr:hover td {
        background: ${colors.grey9};
    }
`;
