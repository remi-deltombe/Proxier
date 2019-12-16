define("sources/button", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Button(config) {
        var _a, _b;
        return React.createElement("button", { onClick: (_b = (_a = config) === null || _a === void 0 ? void 0 : _a.onClick, (_b !== null && _b !== void 0 ? _b : (() => { }))) }, config.text);
    }
    exports.Button = Button;
});
define("button", ["require", "exports", "sources/button"], function (require, exports, button_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(button_1);
});

//# sourceMappingURL=button.js.map
