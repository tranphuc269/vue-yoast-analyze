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
 * Creates a Portuguese-specific sentence part.
 *
 * @param {string} sentencePartText The text from the sentence part.
 * @param {Array} auxiliaries The list with auxiliaries.
 * @constructor
 */
var PortugueseSentencePart = function PortugueseSentencePart(sentencePartText, auxiliaries) {
  _SentencePart2.default.call(this, sentencePartText, auxiliaries, "pt_PT");
};

require("util").inherits(PortugueseSentencePart, _SentencePart2.default);

/**
 * Returns the participles found in the sentence part.
 *
 * @returns {Array} The array of Participle Objects.
 */
PortugueseSentencePart.prototype.getParticiples = function () {
  return (0, _getParticiples2.default)(this.getSentencePartText(), this.getAuxiliaries(), "pt");
};

exports.default = PortugueseSentencePart;
//# sourceMappingURL=SentencePart.js.map
