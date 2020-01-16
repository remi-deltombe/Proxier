define("link/sources/interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("link/sources/styles", ["require", "exports", "@emotion/core", "constants"], function (require, exports, core_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.style = core_1.css `
	font-size: 14px;
	line-height: 16px;
	font-family: ${constants_1.fonts.normal};
	color: ${constants_1.colors.primary5};
	transition: 0.15s;
	cursor: pointer;
	text-decoration: none;

	&:hover,
	&:active {
		color: ${constants_1.colors.primary1};
	}
`;
});
define("link/sources/link", ["require", "exports", "@emotion/core", "link/sources/styles"], function (require, exports, core_2, styles_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Link(config) {
        return (core_2.jsx("a", { css: styles_1.style, href: config.link, target: config.blank ? "_blank" : "" }, config.text));
    }
    exports.Link = Link;
});
define("link", ["require", "exports", "link/sources/link"], function (require, exports, link_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="../../../builds/components/constants/constants.d.ts"/>
    __export(link_1);
});

//# sourceMappingURL=link.js.map
