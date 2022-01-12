"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenSortLength = flattenSortLength;

var _lodashEs = require("lodash-es");

/**
 * Returns combined list of strings/words, sorted by length (descending).
 *
 * @param {Object} dataWords The words data that is going to be sorted.
 *
 * @returns {Array<string>} All words, sorted by length (descending).
 */
function flattenSortLength(dataWords) {
  const allWords = (0, _lodashEs.flatten)(Object.values(dataWords));

  return allWords.sort((a, b) => b.length - a.length || a.localeCompare(b));
}
//# sourceMappingURL=flattenSortLength.js.map
