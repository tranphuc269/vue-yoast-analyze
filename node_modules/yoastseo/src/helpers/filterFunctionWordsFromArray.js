"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (array, language) {
	if ((0, _lodashEs.isUndefined)(language) || language === "") {
		language = "en";
	}

	const functionWords = (0, _lodashEs.get)(getFunctionWords, [language], []);

	if (array.length > 1) {
		const arrayFiltered = (0, _lodashEs.filter)(array, function (word) {
			return !(0, _lodashEs.includes)(functionWords.all, word.trim().toLocaleLowerCase());
		});

		if (arrayFiltered.length > 0) {
			return arrayFiltered;
		}
	}

	return array;
};

var _getFunctionWords = require("../helpers/getFunctionWords.js");

var _getFunctionWords2 = _interopRequireDefault(_getFunctionWords);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFunctionWords = (0, _getFunctionWords2.default)();

/**
 * Filters function words from an array of words based on the language.
 *
 * @param {Array} array The words to check.
 * @param {string} language The language to take function words for.
 *
 * @returns {Array} The original array with the function words filtered out.
 */
//# sourceMappingURL=filterFunctionWordsFromArray.js.map
