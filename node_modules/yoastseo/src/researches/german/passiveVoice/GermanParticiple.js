"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Participle = require("../../../values/Participle.js");

var _Participle2 = _interopRequireDefault(_Participle);

var _indices = require("../../../stringProcessing/indices.js");

var _exceptionsParticiplesActive = require("./exceptionsParticiplesActive.js");

var _exceptionsParticiplesActive2 = _interopRequireDefault(_exceptionsParticiplesActive);

var _auxiliaries = require("./auxiliaries.js");

var _auxiliaries2 = _interopRequireDefault(_auxiliaries);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exceptionsParticiplesActive = (0, _exceptionsParticiplesActive2.default)();

const auxiliaries = (0, _auxiliaries2.default)().participleLike;

const exceptionsRegex = /\S+(apparat|arbeit|dienst|haft|halt|keit|kraft|not|pflicht|schaft|schrift|tät|wert|zeit)($|[ \n\r\t.,'()"+-;!?:/»«‹›<>])/ig;

/**
 * Creates an Participle object for the German language.
 *
 * @param {string} participle The participle.
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {object} attributes  The attributes object.
 *
 * @constructor
 */
const GermanParticiple = function GermanParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  this.setSentencePartPassiveness(this.isPassive());
};

require("util").inherits(GermanParticiple, _Participle2.default);

/**
 * Checks if the text is passive based on the participle exceptions.
 *
 * @returns {boolean} Returns true if there is no exception, and the sentence is passive.
 */
GermanParticiple.prototype.isPassive = function () {
  return !this.hasNounSuffix() && !this.isInExceptionList() && !this.hasHabenSeinException() && !this.isAuxiliary();
};

/**
 * Checks whether a found participle is in the exception list.
 * If a word is in the exceptionsParticiplesActive list, it isn't a participle.
 *
 * @returns {boolean} Returns true if it is in the exception list, otherwise returns false.
 */
GermanParticiple.prototype.isInExceptionList = function () {
  return (0, _lodashEs.includes)(exceptionsParticiplesActive, this.getParticiple());
};

/**
 * Checks whether a found participle ends in a noun suffix.
 * If a word ends in a noun suffix from the exceptionsRegex, it isn't a participle.
 *
 * @returns {boolean} Returns true if it ends in a noun suffix, otherwise returns false.
 */
GermanParticiple.prototype.hasNounSuffix = function () {
  return this.getParticiple().match(exceptionsRegex) !== null;
};

/**
 * Checks whether a participle is followed by 'haben' or 'sein'.
 * If a participle is followed by one of these, the sentence is not passive.
 *
 * @returns {boolean} Returns true if it is an exception, otherwise returns false.
 */
GermanParticiple.prototype.hasHabenSeinException = function () {
  const participleIndices = (0, _indices.getIndicesByWord)(this.getParticiple(), this.getSentencePart());
  let habenSeinIndices = (0, _indices.getIndicesByWordList)(["haben", "sein"], this.getSentencePart());

  // Don't check further if there is no participle or no haben/sein.
  if (participleIndices.length === 0 || habenSeinIndices.length === 0) {
    return false;
  }

  habenSeinIndices = (0, _lodashEs.map)(habenSeinIndices, "index");
  const currentParticiple = participleIndices[0];

  return (0, _lodashEs.includes)(habenSeinIndices, currentParticiple.index + currentParticiple.match.length + 1);
};

/**
 * Checks whether a found participle is an auxiliary.
 * If a word is an auxiliary, it isn't a participle.
 *
 * @returns {boolean} Returns true if it is an auxiliary, otherwise returns false.
 */
GermanParticiple.prototype.isAuxiliary = function () {
  return (0, _lodashEs.includes)(auxiliaries, this.getParticiple());
};

exports.default = GermanParticiple;
//# sourceMappingURL=GermanParticiple.js.map
