"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allGermanVerbPrefixesSorted = allGermanVerbPrefixesSorted;

var _lodashEs = require("lodash-es");

/**
 * Returns combined list of all German verb prefixes, sorted by length (descending).
 *
 * @param {Object} verbPrefixDataGerman The prefix data for German verbs.
 *
 * @returns {Array<string>} All German verb prefixes, sorted by length (descending).
 */
function allGermanVerbPrefixesSorted(verbPrefixDataGerman) {
  const allPrefixes = (0, _lodashEs.flatten)(Object.values(verbPrefixDataGerman));

  return allPrefixes.sort((a, b) => b.length - a.length || a.localeCompare(b));
}
//# sourceMappingURL=helpers.js.map
