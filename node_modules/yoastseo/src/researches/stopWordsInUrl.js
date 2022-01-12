"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (paper) {
  return (0, _stopWordsInText2.default)(paper.getUrl().replace(/[-_]/g, " "));
};

var _stopWordsInText = require("./stopWordsInText.js");

var _stopWordsInText2 = _interopRequireDefault(_stopWordsInText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=stopWordsInUrl.js.map
