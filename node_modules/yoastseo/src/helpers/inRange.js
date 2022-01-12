"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Checks if `n` is between `start` and `end` but not including `start`.
 *
 * @param {number} number The number to check.
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 */
function inRangeEndInclusive(number, start, end) {
  return number > start && number <= end;
}

/**
 * Checks if `n` is between `start` and up to, but not including, `end`.
 *
 * @param {number} number The number to check.
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 */
function inRangeStartInclusive(number, start, end) {
  return number >= start && number < end;
}

/**
 * Checks if `n` is between `start` and `end`, including both.
 *
 * @param {number} number The number to check.
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 */
function inRangeStartEndInclusive(number, start, end) {
  return number >= start && number <= end;
}

exports.inRange = inRangeEndInclusive;
exports.inRangeStartInclusive = inRangeStartInclusive;
exports.inRangeEndInclusive = inRangeEndInclusive;
exports.inRangeStartEndInclusive = inRangeStartEndInclusive;
exports.default = {
  inRange: inRangeEndInclusive,
  inRangeStartInclusive: inRangeStartInclusive,
  inRangeEndInclusive: inRangeEndInclusive,
  inRangeStartEndInclusive: inRangeStartEndInclusive
};
//# sourceMappingURL=inRange.js.map
