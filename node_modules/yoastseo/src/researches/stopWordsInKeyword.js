"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (paper) {
  var keyword = (0, _lodashEs.escapeRegExp)(paper.getKeyword());
  return (0, _stopWordsInText2.default)(keyword);
};

var _stopWordsInText = require("./stopWordsInText.js");

var _stopWordsInText2 = _interopRequireDefault(_stopWordsInText);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=stopWordsInKeyword.js.map
