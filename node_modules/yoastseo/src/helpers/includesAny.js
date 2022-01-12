"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = includesAny;

var _lodashEs = require("lodash-es");

/**
 * Checks if any of the values is in the collection.
 *
 * @param {Object|array} collection The collection to check in.
 * @param {array}        values     The array of values.
 *
 * @returns {boolean} Whether a value was found in the collection.
 */
function includesAny(collection, values) {
  for (let i = 0; i < values.length; i++) {
    if ((0, _lodashEs.includes)(collection, values[i])) {
      return true;
    }
  }

  return false;
}
//# sourceMappingURL=includesAny.js.map
