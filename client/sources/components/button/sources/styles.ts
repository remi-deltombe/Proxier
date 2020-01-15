import { css } from "@emotion/core";
import { fonts, colors } from "constants";

export const style = css`
	font-size: 14px;
	line-height: 16px;
	padding: 4px 14px;
	border-radius: 2px;
	margin-right: 6px;
	font-familly: ${fonts.normal};
	color: ${colors.grey2};
	background: ${colors.grey8};
	border: 0;
	transition: 0.15s;
	cursor: pointer;
	border: none;
	outline: none;

	&:hover {
		color: ${colors.grey10};
		background: ${colors.primary5};
	}

	&:active {
		outline: 0 !important;
		color: ${colors.grey10};
		background: ${colors.primary1};
	}
`;
