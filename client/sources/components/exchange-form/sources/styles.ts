import { css } from "@emotion/core";
import { fonts, colors } from "constants";

export const style = () => {
	return css`
		font-size: 14px;
		line-height: 16px;
		font-family: ${fonts.normal};
		color: ${colors.grey3};

		hr {
			border: none;
			border-top: 1px solid ${colors.grey8};
		}

		.label {
			width: 100%;
			font-size: 12px;
		}

		table {
			border: 1px solid ${colors.grey8};
		}
	`;
};
