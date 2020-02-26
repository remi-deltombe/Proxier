import { css } from "@emotion/core";
import { fonts, colors } from "constants";

export const style = css`
    width: 100%;
    font-family: ${fonts.normal};
    font-size: 14px;
    line-height: 16px;
    color: ${colors.grey3};
    text-align: left;
    border-collapse: collapse;
    margin-bottom: 8px;
    border: none;
    word-break: break-all;

    th,
    td {
        padding: 4px 14px;
    }

    th {
        position: relative;
        color: ${colors.grey1};
        border-bottom: 3px solid ${colors.grey9};

        &.is-sortable {
            cursor: pointer;
        }
    }

    td {
        border-bottom: 1px solid ${colors.grey9};
    }

    tbody tr:hover td {
        background: ${colors.grey9};
    }

    .is-clickable {
        cursor: pointer;
    }

    .is-sortable {
        &.is-sort-asc,
        &.is-sort-desc {
            &:after {
                position: absolute;
                right: 14px; 
            }
        }

        &.is-sort-asc {
            &:after {
                content: '^';
            }
        }

        &.is-sort-desc {
            &:after {
                content: 'v';
            }
        }
        &.is-sort-none {
            
        }
    }
`;
