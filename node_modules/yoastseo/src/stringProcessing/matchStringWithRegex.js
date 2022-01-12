"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, regexString) {
  var regex = new RegExp(regexString, "ig");
  var matches = text.match(regex);

  if (matches === null) {
    matches = [];
  }

  return matches;
};
//# sourceMappingURL=matchStringWithRegex.js.map
