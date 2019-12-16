define("sources/link", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Link(config) {
        return React.createElement("a", { href: config.link, target: config.blank ? '_blank' : '' }, config.text);
    }
    exports.Link = Link;
});
define("link", ["require", "exports", "sources/link"], function (require, exports, link_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(link_1);
});

//# sourceMappingURL=link.js.map
