"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SentencePart = require("../../../values/SentencePart.js");

var _SentencePart2 = _interopRequireDefault(_SentencePart);

var _getParticiples = require("../../passiveVoice/periphrastic/getParticiples.js");

var _getParticiples2 = _interopRequireDefault(_getParticiples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a English specific sentence part.
 *
 * @param {string} sentencePartText The text from the sentence part.
 * @param {Array} auxiliaries The list of auxiliaries from the sentence part.
 * @param {string} locale The locale used for this sentence part.
 * @constructor
 */
var EnglishSentencePart = function EnglishSentencePart(sentencePartText, auxiliaries, locale) {
  _SentencePart2.default.call(this, sentencePartText, auxiliaries, locale);
};

require("util").inherits(EnglishSentencePart, _SentencePart2.default);

/**
 * Returns the participle objects for the participles found in the sentence part.
 * @returns {Array} The list of participle objects.
 */

EnglishSentencePart.prototype.getParticiples = function () {
  return (0, _getParticiples2.default)(this.getSentencePartText(), this.getAuxiliaries(), "en");
};

exports.default = EnglishSentencePart;
//# sourceMappingURL=SentencePart.js.map
