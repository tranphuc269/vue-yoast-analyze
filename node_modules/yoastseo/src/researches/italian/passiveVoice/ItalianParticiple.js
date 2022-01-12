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

var _precedenceExceptionWithoutRegex = require("../../../stringProcessing/precedenceExceptionWithoutRegex");

var _precedenceExceptionWithoutRegex2 = _interopRequireDefault(_precedenceExceptionWithoutRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an Participle object for the Italian language.
 *
 * @param {string} participle The participle.
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {Object} attributes The attributes object.
 *
 * @constructor
 */
var ItalianParticiple = function ItalianParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  _checkException2.default.call(this);
};

require("util").inherits(ItalianParticiple, _Participle2.default);

/**
 * Checks if any exceptions are applicable to this participle that would result in the sentence part not being passive.
 * If no exceptions are found, the sentence part is passive.
 *
 * @returns {boolean} Returns true if no exception is found.
 */
ItalianParticiple.prototype.isPassive = function () {
  const sentencePart = this.getSentencePart();
  const participle = this.getParticiple();
  const language = this.getLanguage();

  return !this.directPrecedenceException(sentencePart, participle, language) && !this.precedenceException(sentencePart, participle, language);
};

ItalianParticiple.prototype.directPrecedenceException = _directPrecedenceExceptionWithoutRegex2.default;

ItalianParticiple.prototype.precedenceException = _precedenceExceptionWithoutRegex2.default;

exports.default = ItalianParticiple;
//# sourceMappingURL=ItalianParticiple.js.map
