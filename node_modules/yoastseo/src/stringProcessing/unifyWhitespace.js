"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** @module stringProcessing/unifyWhitespace */

/**
 * Replaces a non breaking space with a normal space
 * @param {string} text The string to replace the non breaking space in.
 * @returns {string} The text with unified spaces.
 */
var unifyNonBreakingSpace = function unifyNonBreakingSpace(text) {
  return text.replace(/&nbsp;/g, " ");
};

/**
 * Replaces all whitespaces with a normal space
 * @param {string} text The string to replace the non breaking space in.
 * @returns {string} The text with unified spaces.
 */
var unifyWhiteSpace = function unifyWhiteSpace(text) {
  return text.replace(/\s/g, " ");
};

/**
 * Converts all whitespace to spaces.
 *
 * @param {string} text The text to replace spaces.
 * @returns {string} The text with unified spaces.
 */
var unifyAllSpaces = function unifyAllSpaces(text) {
  text = unifyNonBreakingSpace(text);
  return unifyWhiteSpace(text);
};

exports.unifyNonBreakingSpace = unifyNonBreakingSpace;
exports.unifyWhiteSpace = unifyWhiteSpace;
exports.unifyAllSpaces = unifyAllSpaces;
exports.default = {
  unifyNonBreakingSpace: unifyNonBreakingSpace,
  unifyWhiteSpace: unifyWhiteSpace,
  unifyAllSpaces: unifyAllSpaces
};
//# sourceMappingURL=unifyWhitespace.js.map
