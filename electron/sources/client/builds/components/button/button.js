define("button/sources/interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ButtonColor;
    (function (ButtonColor) {
        ButtonColor[ButtonColor["DEFAULT"] = 0] = "DEFAULT";
        ButtonColor[ButtonColor["GREEN"] = 1] = "GREEN";
        ButtonColor[ButtonColor["RED"] = 2] = "RED";
    })(ButtonColor = exports.ButtonColor || (exports.ButtonColor = {}));
});
define("button/sources/styles", ["require", "exports", "@emotion/core", "constants", "button/sources/interfaces"], function (require, exports, core_1, constants_1, interfaces_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const colorSchemes = {
        [interfaces_1.ButtonColor.DEFAULT]: {
            color: constants_1.colors.grey2,
            background: constants_1.colors.grey8,
            colorHover: constants_1.colors.grey10,
            backgroundHover: constants_1.colors.primary5,
            colorActive: constants_1.colors.grey10,
            backgroundActive: constants_1.colors.primary1
        },
        [interfaces_1.ButtonColor.GREEN]: {
            color: constants_1.colors.grey10,
            background: constants_1.colors.green6,
            colorHover: constants_1.colors.grey10,
            backgroundHover: constants_1.colors.green4,
            colorActive: constants_1.colors.grey10,
            backgroundActive: constants_1.colors.green4
        },
        [interfaces_1.ButtonColor.RED]: {
            color: constants_1.colors.grey10,
            background: constants_1.colors.red6,
            colorHover: constants_1.colors.grey10,
            backgroundHover: constants_1.colors.red4,
            colorActive: constants_1.colors.grey10,
            backgroundActive: constants_1.colors.red4
        }
    };
    exports.style = ({ color = interfaces_1.ButtonColor.DEFAULT }) => {
        const scheme = colorSchemes[color];
        return core_1.css `
		font-size: 14px;
		line-height: 16px;
		padding: 4px 14px;
		border-radius: 2px;
		margin-right: 6px;
		font-familly: ${constants_1.fonts.normal};
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
});
define("button/sources/button", ["require", "exports", "@emotion/core", "button/sources/styles"], function (require, exports, core_2, styles_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Button(config) {
        var _a, _b;
        return (core_2.jsx("button", { css: styles_1.style({ color: config.color }), onClick: (_b = (_a = config) === null || _a === void 0 ? void 0 : _a.onClick, (_b !== null && _b !== void 0 ? _b : (() => { }))) }, config.text));
    }
    exports.Button = Button;
});
define("button", ["require", "exports", "button/sources/button", "button/sources/interfaces"], function (require, exports, button_1, interfaces_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="../../../builds/components/constants/constants.d.ts"/>
    __export(button_1);
    __export(interfaces_2);
});

//# sourceMappingURL=button.js.map
