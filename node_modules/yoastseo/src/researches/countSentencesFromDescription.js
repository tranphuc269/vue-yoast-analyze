"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (paper) {
  var sentences = (0, _getSentences2.default)(paper.getDescription());
  return (0, _sentencesLength2.default)(sentences);
};

var _getSentences = require("../stringProcessing/getSentences");

var _getSentences2 = _interopRequireDefault(_getSentences);

var _sentencesLength = require("./../stringProcessing/sentencesLength.js");

var _sentencesLength2 = _interopRequireDefault(_sentencesLength);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=countSentencesFromDescription.js.map
