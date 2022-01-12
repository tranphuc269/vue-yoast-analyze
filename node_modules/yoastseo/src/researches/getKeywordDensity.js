"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (paper, researcher) {
  const wordCount = (0, _countWords2.default)(paper.getText());
  if (wordCount === 0) {
    return 0;
  }

  const keywordCount = researcher.getResearch("keywordCount");
  return keywordCount.count / wordCount * 100;
};

var _countWords = require("../stringProcessing/countWords.js");

var _countWords2 = _interopRequireDefault(_countWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=getKeywordDensity.js.map
