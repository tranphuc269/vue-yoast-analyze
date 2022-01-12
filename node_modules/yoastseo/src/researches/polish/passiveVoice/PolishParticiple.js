"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Participle = require("../../../values/Participle.js");

var _Participle2 = _interopRequireDefault(_Participle);

var _checkException = require("../../passiveVoice/periphrastic/checkException.js");

var _checkException2 = _interopRequireDefault(_checkException);

var _directPrecedenceExceptionWithoutRegex = require("../../../stringProcessing/directPrecedenceExceptionWithoutRegex");

var _directPrecedenceExceptionWithoutRegex2 = _interopRequireDefault(_directPrecedenceExceptionWithoutRegex);

var _nonDirectParticiplePrecedenceException = require("../../passiveVoice/periphrastic/freeAuxiliaryParticipleOrder/nonDirectParticiplePrecedenceException");

var _nonDirectParticiplePrecedenceException2 = _interopRequireDefault(_nonDirectParticiplePrecedenceException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an Participle object for the Polish language.
 *
 * @param {string} participle The participle.
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {Object} attributes The attributes object.
 *
 * @constructor
 */
const PolishParticiple = function PolishParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  _checkException2.default.call(this);
};

require("util").inherits(PolishParticiple, _Participle2.default);

/**
 * Checks if any exceptions are applicable to this participle that would result in the sentence part not being passive.
 * If no exceptions are found, the sentence part is passive.
 *
 * @returns {boolean} Returns true if no exception is found.
 */
PolishParticiple.prototype.isPassive = function () {
  const sentencePart = this.getSentencePart();
  const participle = this.getParticiple();
  const auxiliaries = this.getAuxiliaries();
  const language = this.getLanguage();

  return !this.directPrecedenceException(sentencePart, participle, language) && !this.nonDirectPrecedenceException(sentencePart, participle, auxiliaries, language);
};

PolishParticiple.prototype.directPrecedenceException = _directPrecedenceExceptionWithoutRegex2.default;

PolishParticiple.prototype.nonDirectPrecedenceException = _nonDirectParticiplePrecedenceException2.default;

exports.default = PolishParticiple;
//# sourceMappingURL=PolishParticiple.js.map
