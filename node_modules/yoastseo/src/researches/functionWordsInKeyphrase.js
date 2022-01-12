"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	const keyphrase = paper.getKeyword();

	// Return false if there are double quotes around the keyphrase.
	const doubleQuotes = ["“", "”", "〝", "〞", "〟", "‟", "„", "\""];
	if ((0, _lodashEs.includes)(doubleQuotes, keyphrase[0]) && (0, _lodashEs.includes)(doubleQuotes, keyphrase[keyphrase.length - 1])) {
		return false;
	}

	let keyphraseWords = (0, _getWords2.default)(keyphrase);
	const functionWords = (0, _lodashEs.get)(getFunctionWords, [(0, _getLanguage2.default)(paper.getLocale())], []);

	keyphraseWords = (0, _lodashEs.filter)(keyphraseWords, function (word) {
		return !(0, _lodashEs.includes)(functionWords.all, word.trim().toLocaleLowerCase());
	});

	return (0, _lodashEs.isEmpty)(keyphraseWords);
};

var _lodashEs = require("lodash-es");

var _getWords = require("../stringProcessing/getWords");

var _getWords2 = _interopRequireDefault(_getWords);

var _getLanguage = require("../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _getFunctionWords = require("../helpers/getFunctionWords.js");

var _getFunctionWords2 = _interopRequireDefault(_getFunctionWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFunctionWords = (0, _getFunctionWords2.default)();
/**
 * Checks if the keyphrase contains of function words only.
 *
 * @param {object} paper The paper containing the keyword.
 *
 * @returns {boolean} Whether the keyphrase contains of content words only.
 */
//# sourceMappingURL=functionWordsInKeyphrase.js.map
