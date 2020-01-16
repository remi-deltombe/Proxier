define("constants/sources/colors", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function lerp(low, high, percentage) {
        function lerp(a, b, r) {
            const d = b - a;
            const v = "000" + Math.round(a + d * r).toString(16);
            return v.substring(v.length - 2);
        }
        return "#" + low.map((v, i) => lerp(low[i], high[i], percentage)).join("");
    }
    exports.colors = {
        grey0: lerp([0, 0, 0], [255, 255, 255], 0.0),
        grey1: lerp([0, 0, 0], [255, 255, 255], 0.1),
        grey2: lerp([0, 0, 0], [255, 255, 255], 0.2),
        grey3: lerp([0, 0, 0], [255, 255, 255], 0.3),
        grey4: lerp([0, 0, 0], [255, 255, 255], 0.4),
        grey5: lerp([0, 0, 0], [255, 255, 255], 0.5),
        grey6: lerp([0, 0, 0], [255, 255, 255], 0.6),
        grey7: lerp([0, 0, 0], [255, 255, 255], 0.7),
        grey8: lerp([0, 0, 0], [255, 255, 255], 0.9),
        grey9: lerp([0, 0, 0], [255, 255, 255], 0.97),
        grey10: lerp([0, 0, 0], [255, 255, 255], 1.0),
        red0: lerp([156, 16, 5], [250, 178, 172], 0.0),
        red1: lerp([156, 16, 5], [250, 178, 172], 0.1),
        red2: lerp([156, 16, 5], [250, 178, 172], 0.2),
        red3: lerp([156, 16, 5], [250, 178, 172], 0.3),
        red4: lerp([156, 16, 5], [250, 178, 172], 0.4),
        red5: lerp([156, 16, 5], [250, 178, 172], 0.5),
        red6: lerp([156, 16, 5], [250, 178, 172], 0.6),
        red7: lerp([156, 16, 5], [250, 178, 172], 0.7),
        red8: lerp([156, 16, 5], [250, 178, 172], 0.9),
        red9: lerp([156, 16, 5], [250, 178, 172], 0.97),
        red10: lerp([156, 16, 5], [250, 178, 172], 1.0),
        green0: lerp([68, 145, 4], [195, 255, 145], 0.0),
        green1: lerp([68, 145, 4], [195, 255, 145], 0.1),
        green2: lerp([68, 145, 4], [195, 255, 145], 0.2),
        green3: lerp([68, 145, 4], [195, 255, 145], 0.3),
        green4: lerp([68, 145, 4], [195, 255, 145], 0.4),
        green5: lerp([68, 145, 4], [195, 255, 145], 0.5),
        green6: lerp([68, 145, 4], [195, 255, 145], 0.6),
        green7: lerp([68, 145, 4], [195, 255, 145], 0.7),
        green8: lerp([68, 145, 4], [195, 255, 145], 0.9),
        green9: lerp([68, 145, 4], [195, 255, 145], 0.97),
        green10: lerp([68, 145, 4], [195, 255, 145], 1.0),
        primary0: lerp([0, 11, 133], [87, 101, 255], 0.0),
        primary1: lerp([0, 11, 133], [87, 101, 255], 0.1),
        primary2: lerp([0, 11, 133], [87, 101, 255], 0.2),
        primary3: lerp([0, 11, 133], [87, 101, 255], 0.3),
        primary4: lerp([0, 11, 133], [87, 101, 255], 0.4),
        primary5: lerp([0, 11, 133], [87, 101, 255], 0.5),
        primary6: lerp([87, 101, 255], [163, 171, 255], 0.1),
        primary7: lerp([87, 101, 255], [163, 171, 255], 0.2),
        primary8: lerp([87, 101, 255], [163, 171, 255], 0.3),
        primary9: lerp([87, 101, 255], [163, 171, 255], 0.4),
        primary10: lerp([87, 101, 255], [163, 171, 255], 0.5)
    };
});
define("constants/sources/fonts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fonts = {
        normal: "'Open Sans', sans-serif"
    };
});
define("constants", ["require", "exports", "constants/sources/colors", "constants/sources/fonts"], function (require, exports, colors_1, fonts_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(colors_1);
    __export(fonts_1);
});

//# sourceMappingURL=constants.js.map
