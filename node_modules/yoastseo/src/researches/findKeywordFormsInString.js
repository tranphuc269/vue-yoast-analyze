"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.findTopicFormsInString = exports.findWordFormsInString = undefined;

var _matchTextWithArray = require("../stringProcessing/matchTextWithArray.js");

var _matchTextWithArray2 = _interopRequireDefault(_matchTextWithArray);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Matches forms of words in the keyphrase against a given text.
 *
 * @param {Array} keywordForms The array with word forms of all (content) words from the keyphrase in a shape
 *                             [ [ form1, form2, ... ], [ form1, form2, ... ] ]
 * @param {string} text The string to match the word forms against.
 * @param {string} locale The locale of the paper.
 *
 * @returns {Object} The number and the percentage of the keyphrase words that were matched in the text by at least one form.
 */
const findWordFormsInString = function findWordFormsInString(keywordForms, text, locale) {
	const wordNumber = keywordForms.length;
	const foundWords = Array(wordNumber);

	for (let i = 0; i < wordNumber; i++) {
		const found = (0, _matchTextWithArray2.default)(text, keywordForms[i], locale).count > 0;
		foundWords[i] = found ? 1 : 0;
	}
	const foundNumberOfWords = (0, _lodashEs.sum)(foundWords);
	const result = {
		countWordMatches: foundNumberOfWords,
		percentWordMatches: 0
	};

	if (wordNumber > 0) {
		result.percentWordMatches = Math.round(foundNumberOfWords / wordNumber * 100);
	}

	return result;
};

/**
 * Matches forms of words in the keyphrase and in the synonyms against a given text.
 *
 * @param {Object} topicForms The object with word forms of all (content) words from the keyphrase and eventually synonyms,
 * comes in a shape {
 *                     keyphraseForms: [[ form1, form2, ... ], [ form1, form2, ... ]],
 *                     synonymsForms: [
 *                          [[ form1, form2, ... ], [ form1, form2, ... ]],
 *                          [[ form1, form2, ... ], [ form1, form2, ... ]],
 *                          [[ form1, form2, ... ], [ form1, form2, ... ]],
 *                     ],
 *                  }
 * @param {string} text The string to match the word forms against.
 * @param {boolean} useSynonyms Whether to use synonyms as if it was keyphrase or not (depends on the assessment).
 * @param {string} locale The locale of the paper.
 *
 * @returns {Object} The number and the percentage fo the keyphrase words or synonyms that were matched in the text by at least one form,
 * and whether the keyphrase or a synonym was matched.
 */
const findTopicFormsInString = function findTopicFormsInString(topicForms, text, useSynonyms, locale) {
	// First check if the keyword is found in the text
	let result = findWordFormsInString(topicForms.keyphraseForms, text, locale);
	result.keyphraseOrSynonym = "keyphrase";

	// If a full match found with the keyword or if no synonyms are supplied or supposed to be used, return the keyphrase search result.
	if (result.percentWordMatches === 100 || useSynonyms === false || (0, _lodashEs.isEmpty)(topicForms.synonymsForms)) {
		return result;
	}

	// Collect results of matching of every synonym with the text.
	const resultsSynonyms = [];
	for (let i = 0; i < topicForms.synonymsForms.length; i++) {
		const synonym = topicForms.synonymsForms[i];
		resultsSynonyms[i] = findWordFormsInString(synonym, text, locale);
	}

	// Find which synonym occurred most fully.
	const foundSynonyms = resultsSynonyms.map(resultSynonyms => resultSynonyms.percentWordMatches);
	const bestSynonymIndex = foundSynonyms.indexOf(Math.max(...foundSynonyms));

	// If the best synonym showed lower results than the keyword, return the keyword.
	if (result.percentWordMatches >= resultsSynonyms[bestSynonymIndex].percentWordMatches) {
		return result;
	}

	// If the best synonym showed better results than the keyword, return the synonym.
	result = resultsSynonyms[bestSynonymIndex];
	result.keyphraseOrSynonym = "synonym";

	return result;
};

exports.findWordFormsInString = findWordFormsInString;
exports.findTopicFormsInString = findTopicFormsInString;
//# sourceMappingURL=findKeywordFormsInString.js.map
