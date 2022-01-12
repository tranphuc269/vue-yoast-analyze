"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text, wordToMatch, locale) {
  var words = (0, _getWords2.default)(text);
  var count = (0, _lodashEs.filter)(words, function (word) {
    return wordToMatch === word || (0, _transliterate2.default)(wordToMatch, locale) === word;
  });
  return count.length;
};

var _lodashEs = require("lodash-es");

var _transliterate = require("./transliterate.js");

var _transliterate2 = _interopRequireDefault(_transliterate);

var _getWords = require("./getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=countWordOccurrences.js.map
