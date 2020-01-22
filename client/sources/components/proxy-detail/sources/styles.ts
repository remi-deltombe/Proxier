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

        .list,
        .form {
            width: 100%;
        }

        .form {
            border-left: 1px solid ${colors.grey8};
            padding: 0 20px;
        }
    }
`;
