"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

var _Participle = require("../../../values/Participle.js");

var _Participle2 = _interopRequireDefault(_Participle);

var _checkException = require("../../passiveVoice/periphrastic/checkException.js");

var _checkException2 = _interopRequireDefault(_checkException);

var _nonParticiples = require("./nonParticiples");

var _nonParticiples2 = _interopRequireDefault(_nonParticiples);

var _directPrecedenceExceptionWithoutRegex = require("../../../stringProcessing/directPrecedenceExceptionWithoutRegex");

var _directPrecedenceExceptionWithoutRegex2 = _interopRequireDefault(_directPrecedenceExceptionWithoutRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates an Participle object for the Dutch language.
 *
 * @param {string} participle The participle.
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {Object} attributes The attributes object.
 *
 * @constructor
 */
const DutchParticiple = function DutchParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  _checkException2.default.call(this);
};

require("util").inherits(DutchParticiple, _Participle2.default);

/**
 * Checks if any exceptions are applicable to this participle that would result in the sentence part not being passive.
 * If no exceptions are found, the sentence part is passive.
 *
 * @returns {boolean} Returns true if no exception is found.
 */
DutchParticiple.prototype.isPassive = function () {
  const sentencePart = this.getSentencePart();
  const participle = this.getParticiple();
  const language = this.getLanguage();

  return !this.isOnNonParticiplesList() && !this.hasNonParticipleEnding() && !this.directPrecedenceException(sentencePart, participle, language);
};

/**
 * Checks whether a found participle is in the nonParticiples list.
 *
 * @returns {boolean} Returns true if it is in the nonParticiples list, otherwise returns false.
 */
DutchParticiple.prototype.isOnNonParticiplesList = function () {
  if (this.getType() === "irregular") {
    return false;
  }

  return (0, _lodashEs.includes)((0, _nonParticiples2.default)(), this.getParticiple());
};

/**
 * Checks whether a found participle has a non-participle ending and is therefore not really a participle.
 *
 * @returns {boolean} Returns true if the participle has a non-participle ending, otherwise returns false.
 */
DutchParticiple.prototype.hasNonParticipleEnding = function () {
  return (/\S+(heid|teit|tijd)($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig.test(this.getParticiple())
  );
};

DutchParticiple.prototype.directPrecedenceException = _directPrecedenceExceptionWithoutRegex2.default;

exports.default = DutchParticiple;
//# sourceMappingURL=DutchParticiple.js.map
