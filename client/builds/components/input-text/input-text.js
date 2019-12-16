define("sources/input-text", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function InputText(config) {
        return (React.createElement("label", null,
            config.label,
            React.createElement("input", { type: "text", value: config.value, onChange: e => config.onChange && config.onChange(e.target.value) })));
    }
    exports.InputText = InputText;
});
define("input-text", ["require", "exports", "sources/input-text"], function (require, exports, input_text_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(input_text_1);
});

//# sourceMappingURL=input-text.js.map
