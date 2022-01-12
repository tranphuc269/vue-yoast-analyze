"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _syllableCountStep = require("./syllableCountStep.js");

var _syllableCountStep2 = _interopRequireDefault(_syllableCountStep);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a syllable count iterator.
 *
 * @param {object} config The config object containing an array with syllable exclusions.
 * @constructor
 */
var SyllableCountIterator = function SyllableCountIterator(config) {
  this.countSteps = [];
  if (!(0, _lodashEs.isUndefined)(config)) {
    this.createSyllableCountSteps(config.deviations.vowels);
  }
};

/**
 * Creates a syllable count step object for each exclusion.
 *
 * @param {object} syllableCounts The object containing all exclusion syllables including the multipliers.
 * @returns {void}
 */
SyllableCountIterator.prototype.createSyllableCountSteps = function (syllableCounts) {
  (0, _lodashEs.forEach)(syllableCounts, function (syllableCountStep) {
    this.countSteps.push(new _syllableCountStep2.default(syllableCountStep));
  }.bind(this));
};

/**
 * Returns all available count steps.
 *
 * @returns {Array} All available count steps.
 */
SyllableCountIterator.prototype.getAvailableSyllableCountSteps = function () {
  return this.countSteps;
};

/**
 * Counts the syllables for all the steps and returns the total syllable count.
 *
 * @param {String} word The word to count syllables in.
 * @returns {number} The number of syllables found based on exclusions.
 */
SyllableCountIterator.prototype.countSyllables = function (word) {
  var syllableCount = 0;
  (0, _lodashEs.forEach)(this.countSteps, function (step) {
    syllableCount += step.countSyllables(word);
  });
  return syllableCount;
};

exports.default = SyllableCountIterator;
//# sourceMappingURL=syllableCountIterator.js.map
