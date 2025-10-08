'use strict';

var jsxRuntime = require('react/jsx-runtime');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Icon = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 24 : _b, _c = _a.color, color = _c === void 0 ? 'currentColor' : _c, _d = _a.className, className = _d === void 0 ? '' : _d, _e = _a.style, style = _e === void 0 ? {} : _e, onClick = _a.onClick, children = _a.children, _f = _a.viewBox, viewBox = _f === void 0 ? '0 0 24 24' : _f, props = __rest(_a, ["size", "color", "className", "style", "onClick", "children", "viewBox"]);
    var iconStyle = __assign({ width: size, height: size, fill: color, display: 'inline-block', verticalAlign: 'middle' }, style);
    return (jsxRuntime.jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: viewBox, style: iconStyle, className: className, onClick: onClick }, props, { children: children })));
};

var Baobab = function (props) {
    return (jsxRuntime.jsxs(Icon, __assign({ viewBox: "0 0 24 24" }, props, { children: [jsxRuntime.jsx("path", { d: "M12 2v20" }), " ", jsxRuntime.jsx("path", { d: "M8 8h8" }), " ", jsxRuntime.jsx("path", { d: "M8 12h8" }), " ", jsxRuntime.jsx("path", { d: "M8 16h8" }), " ", jsxRuntime.jsx("circle", { cx: "12", cy: "4", r: "2" }), " ", jsxRuntime.jsx("path", { d: "M6 20h12" }), " ", jsxRuntime.jsx("path", { d: "M8 20v-4" }), " ", jsxRuntime.jsx("path", { d: "M16 20v-4" }), " ", jsxRuntime.jsx("path", { d: "M10 8v8" }), " ", jsxRuntime.jsx("path", { d: "M14 8v8" })] })));
};
Baobab.displayName = 'Baobab';

var Drum = function (props) {
    return (jsxRuntime.jsxs(Icon, __assign({ viewBox: "0 0 24 24" }, props, { children: [jsxRuntime.jsx("ellipse", { cx: "12", cy: "8", rx: "8", ry: "3" }), " ", jsxRuntime.jsx("ellipse", { cx: "12", cy: "16", rx: "8", ry: "3" }), " ", jsxRuntime.jsx("path", { d: "M4 8v8" }), " ", jsxRuntime.jsx("path", { d: "M20 8v8" }), " ", jsxRuntime.jsx("path", { d: "M8 8v8" }), " ", jsxRuntime.jsx("path", { d: "M16 8v8" }), " ", jsxRuntime.jsx("circle", { cx: "12", cy: "8", r: "1" }), " ", jsxRuntime.jsx("circle", { cx: "12", cy: "16", r: "1" })] })));
};
Drum.displayName = 'Drum';

var Elephant = function (props) {
    return (jsxRuntime.jsxs(Icon, __assign({ viewBox: "0 0 24 24" }, props, { children: [jsxRuntime.jsx("path", { d: "M3 12h18" }), " ", jsxRuntime.jsx("path", { d: "M3 6h18" }), " ", jsxRuntime.jsx("path", { d: "M3 18h18" }), " ", jsxRuntime.jsx("circle", { cx: "6", cy: "6", r: "2" }), " ", jsxRuntime.jsx("circle", { cx: "6", cy: "12", r: "2" }), " ", jsxRuntime.jsx("circle", { cx: "6", cy: "18", r: "2" }), " ", jsxRuntime.jsx("circle", { cx: "18", cy: "6", r: "2" }), " ", jsxRuntime.jsx("circle", { cx: "18", cy: "12", r: "2" }), " ", jsxRuntime.jsx("circle", { cx: "18", cy: "18", r: "2" }), " ", jsxRuntime.jsx("path", { d: "M9 6h6" }), " ", jsxRuntime.jsx("path", { d: "M9 12h6" }), " ", jsxRuntime.jsx("path", { d: "M9 18h6" })] })));
};
Elephant.displayName = 'Elephant';

var Example = function (props) {
    return (jsxRuntime.jsxs(Icon, __assign({ viewBox: "0 0 24 24" }, props, { children: [jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "10" }), " ", jsxRuntime.jsx("path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }), " ", jsxRuntime.jsx("line", { x1: "9", y1: "9", x2: "9.01", y2: "9" }), " ", jsxRuntime.jsx("line", { x1: "15", y1: "9", x2: "15.01", y2: "9" })] })));
};
Example.displayName = 'Example';

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Baobab: Baobab,
    Drum: Drum,
    Elephant: Elephant,
    Example: Example
});

exports.Baobab = Baobab;
exports.Drum = Drum;
exports.Elephant = Elephant;
exports.Example = Example;
exports.Icon = Icon;
exports.IconsFasaha = index;
//# sourceMappingURL=index.js.map
