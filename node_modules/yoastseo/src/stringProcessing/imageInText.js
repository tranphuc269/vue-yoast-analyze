"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  return (0, _matchStringWithRegex2.default)(text, "<img(?:[^>]+)?>");
};

var _matchStringWithRegex = require("./matchStringWithRegex.js");

var _matchStringWithRegex2 = _interopRequireDefault(_matchStringWithRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=imageInText.js.map
