"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  return text.replace(new RegExp("<yoastmark[^>]*>", "g"), "").replace(new RegExp("</yoastmark>", "g"), "");
};
//# sourceMappingURL=removeMarks.js.map
