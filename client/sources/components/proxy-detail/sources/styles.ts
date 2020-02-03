import { css } from "@emotion/core";
import { fonts, colors } from "constants";

export const style = css`
    .header {
        display: flex;

        .arrow {
            font-size: 20px;
            font-weight: 800;
            padding: 9px 0;
        }

        .link {
            display: block;
            padding: 14px;
            font-size: 16px;
        }
    }

    .content {
        display: flex;
        border-top: 1px solid ${colors.grey8};

        .title {
            font-size: 18px;
            line-height: 24px;
            margin-bottom: 12px;
            font-family: ${fonts.normal};
            color: ${colors.grey3};
        }

        .list,
        .form {
            width: 100%;
            padding: 12px;
        }

        .form {
            border-left: 1px solid ${colors.grey8};
            padding: 12px 20px 0;
        }
    }
`;
