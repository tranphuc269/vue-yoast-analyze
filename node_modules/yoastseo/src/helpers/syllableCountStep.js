"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

var _createRegexFromArray = require("../stringProcessing/createRegexFromArray.js");

var _createRegexFromArray2 = _interopRequireDefault(_createRegexFromArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Constructs a language syllable regex that contains a regex for matching syllable exclusion.
 *
 * @param {object} syllableRegex The object containing the syllable exclusions.
 * @constructor
 */
var SyllableCountStep = function SyllableCountStep(syllableRegex) {
  this._hasRegex = false;
  this._regex = "";
  this._multiplier = "";
  this.createRegex(syllableRegex);
};

/**
 * Returns if a valid regex has been set.
 *
 * @returns {boolean} True if a regex has been set, false if not.
 */
SyllableCountStep.prototype.hasRegex = function () {
  return this._hasRegex;
};

/**
 * Creates a regex based on the given syllable exclusions, and sets the multiplier to use.
 *
 * @param {object} syllableRegex The object containing the syllable exclusions and multiplier.
 * @returns {void}
 */
SyllableCountStep.prototype.createRegex = function (syllableRegex) {
  if (!(0, _lodashEs.isUndefined)(syllableRegex) && !(0, _lodashEs.isUndefined)(syllableRegex.fragments)) {
    this._hasRegex = true;
    this._regex = (0, _createRegexFromArray2.default)(syllableRegex.fragments, true);
    this._multiplier = syllableRegex.countModifier;
  }
};

/**
 * Returns the stored regular expression.
 *
 * @returns {RegExp} The stored regular expression.
 */
SyllableCountStep.prototype.getRegex = function () {
  return this._regex;
};

/**
 * Matches syllable exclusions in a given word and the returns the number found multiplied with the
 * given multiplier.
 *
 * @param {String} word The word to match for syllable exclusions.
 * @returns {number} The amount of syllables found.
 */
SyllableCountStep.prototype.countSyllables = function (word) {
  if (this._hasRegex) {
    var match = word.match(this._regex) || [];
    return match.length * this._multiplier;
  }
  return 0;
};

exports.default = SyllableCountStep;
//# sourceMappingURL=syllableCountStep.js.map
