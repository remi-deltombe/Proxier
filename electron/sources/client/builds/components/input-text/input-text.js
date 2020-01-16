define("input-text/sources/interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("input-text/sources/styles", ["require", "exports", "@emotion/core", "constants"], function (require, exports, core_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.style = core_1.css `
    font-size: 14px;
    line-height: 16px;
    font-family: ${constants_1.fonts.normal};
    color: ${constants_1.colors.grey2};
    transition: 0.15s;

    .label {
        font-size: 12px;
        margin-right: 5px;
    }

    input {
        border: 1px solid ${constants_1.colors.grey6};
        font-size: 14px;
        line-height: 16px;
        padding: 4px 8px;
        border-radius: 2px;
        margin-right: 6px;
        font-familly: ${constants_1.fonts.normal};
        color: ${constants_1.colors.grey2};
        transition: 0.15s;

        &:hover,
        &:focus,
        &:active {
            border-color: ${constants_1.colors.primary5};
        }
    }
`;
});
define("input-text/sources/input-text", ["require", "exports", "@emotion/core", "input-text/sources/styles"], function (require, exports, core_2, styles_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function InputText(config) {
        return (core_2.jsx("label", { css: styles_1.style },
            config.label && core_2.jsx("div", { className: "label" }, config.label),
            core_2.jsx("input", { type: "text", value: config.value, onChange: e => config.onChange && config.onChange(e.target.value) })));
    }
    exports.InputText = InputText;
});
define("input-text", ["require", "exports", "input-text/sources/input-text"], function (require, exports, input_text_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference path="../../../builds/components/constants/constants.d.ts"/>
    __export(input_text_1);
});

//# sourceMappingURL=input-text.js.map
