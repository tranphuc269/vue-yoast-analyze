"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  text = (0, _stripHTMLTags.stripFullTags)(text);
  text = (0, _stripSpaces2.default)(text);

  return text;
};

var _stripHTMLTags = require("../stringProcessing/stripHTMLTags.js");

var _stripSpaces = require("../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=sanitizeString.js.map
