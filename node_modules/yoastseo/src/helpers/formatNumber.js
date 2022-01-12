"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (number) {
  if (Math.round(number) === number) {
    return Math.round(number);
  }

  return Math.round(number * 10) / 10;
};
//# sourceMappingURL=formatNumber.js.map
