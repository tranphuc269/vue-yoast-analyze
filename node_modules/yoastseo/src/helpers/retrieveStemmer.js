"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (language, morphologyData) {
  const stemFunction = stemFunctions[language];

  // Return the stem function if there is one for the given language and if morphology data is available.
  if (morphologyData && stemFunction) {
    return stemFunction;
  }

  // Return an identity function if the stem function and/or morphology data aren't available.
  return word => word;
};

var _getStemForLanguage = require("../helpers/getStemForLanguage");

var _getStemForLanguage2 = _interopRequireDefault(_getStemForLanguage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stemFunctions = (0, _getStemForLanguage2.default)();

/**
 * Retrieves a stemmer function from the factory.
 * Returns the identity function if the language does not have a stemmer or if morphology data isn't available.
 *
 * @param {string} language         The language to retrieve a stemmer function for.
 * @param {Object} morphologyData   The morphology data.
 *
 * @returns {Function} A stemmer function for the language.
 */
//# sourceMappingURL=retrieveStemmer.js.map
