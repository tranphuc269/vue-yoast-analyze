"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sentences, recommendedValue) {
  var tooLongSentences = (0, _lodashEs.filter)(sentences, function (sentence) {
    return (0, _isValueTooLong2.default)(recommendedValue, sentence.sentenceLength);
  });

  return tooLongSentences;
};

var _lodashEs = require("lodash-es");

var _isValueTooLong = require("../helpers/isValueTooLong");

var _isValueTooLong2 = _interopRequireDefault(_isValueTooLong);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=checkForTooLongSentences.js.map
