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
 * Creates a French-specific sentence part.
 *
 * @param {string} sentencePartText The text from the sentence part.
 * @param {Array} auxiliaries The list with auxiliaries.
 * @constructor
 */
var FrenchSentencePart = function FrenchSentencePart(sentencePartText, auxiliaries) {
  _SentencePart2.default.call(this, sentencePartText, auxiliaries, "fr_FR");
};

require("util").inherits(FrenchSentencePart, _SentencePart2.default);

/**
 * Returns the participles found in the sentence part.
 *
 * @returns {Array} The array of Participle Objects.
 */
FrenchSentencePart.prototype.getParticiples = function () {
  return (0, _getParticiples2.default)(this.getSentencePartText(), this.getAuxiliaries(), "fr");
};

exports.default = FrenchSentencePart;
//# sourceMappingURL=SentencePart.js.map
