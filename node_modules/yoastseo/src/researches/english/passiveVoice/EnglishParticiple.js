"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Participle = require("../../../values/Participle.js");

var _Participle2 = _interopRequireDefault(_Participle);

var _checkException = require("../../passiveVoice/periphrastic/checkException.js");

var _checkException2 = _interopRequireDefault(_checkException);

var _nonVerbEndingEd = require("./non-verb-ending-ed.js");

var _nonVerbEndingEd2 = _interopRequireDefault(_nonVerbEndingEd);

var _directPrecedenceExceptionWithoutRegex = require("../../../stringProcessing/directPrecedenceExceptionWithoutRegex");

var _directPrecedenceExceptionWithoutRegex2 = _interopRequireDefault(_directPrecedenceExceptionWithoutRegex);

var _precedenceExceptionWithoutRegex = require("../../../stringProcessing/precedenceExceptionWithoutRegex");

var _precedenceExceptionWithoutRegex2 = _interopRequireDefault(_precedenceExceptionWithoutRegex);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const nonVerbsEndingEd = (0, _nonVerbEndingEd2.default)();


var irregularExclusionArray = ["get", "gets", "getting", "got", "gotten"];

/**
 * Creates an Participle object for the English language.
 *
 * @param {string} participle The participle.
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {Object} attributes  The attributes object.
 *
 * @constructor
 */
var EnglishParticiple = function EnglishParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  _checkException2.default.call(this);
};

require("util").inherits(EnglishParticiple, _Participle2.default);

/**
 * Checks if any exceptions are applicable to this participle that would result in the sentence part not being passive.
 * If no exceptions are found, the sentence part is passive.
 *
 * @returns {boolean} Returns true if no exception is found.
 */
EnglishParticiple.prototype.isPassive = function () {
  const sentencePart = this.getSentencePart();
  const participle = this.getParticiple();
  const language = this.getLanguage();

  return !this.isNonVerbEndingEd() && !this.hasRidException() && !this.directPrecedenceException(sentencePart, participle, language) && !this.precedenceException(sentencePart, participle, language);
};

/**
 * Checks whether a found participle is in the nonVerbsEndingEd list.
 * If a word is in the nonVerbsEndingEd list, it isn't a participle.
 * Irregular participles do not end in -ed, and therefore cannot be in the nonVerbsEndingEd list.
 *
 * @returns {boolean} Returns true if it is in the nonVerbsEndingEd list, otherwise returns false.
 */
EnglishParticiple.prototype.isNonVerbEndingEd = function () {
  if (this.getType() === "irregular") {
    return false;
  }
  return (0, _lodashEs.includes)(nonVerbsEndingEd, this.getParticiple());
};

/**
 * Checks whether the participle is 'rid' in combination with 'get', 'gets', 'getting', 'got' or 'gotten'.
 * If this is true, the participle is not passive.
 *
 * @returns {boolean} Returns true if 'rid' is found in combination with a form of 'get'
 * otherwise returns false.
 */
EnglishParticiple.prototype.hasRidException = function () {
  if (this.getParticiple() === "rid") {
    var auxiliaries = this.getAuxiliaries();
    return !(0, _lodashEs.isEmpty)((0, _lodashEs.intersection)(irregularExclusionArray, auxiliaries));
  }
  return false;
};

EnglishParticiple.prototype.directPrecedenceException = _directPrecedenceExceptionWithoutRegex2.default;

EnglishParticiple.prototype.precedenceException = _precedenceExceptionWithoutRegex2.default;

exports.default = EnglishParticiple;
//# sourceMappingURL=EnglishParticiple.js.map
