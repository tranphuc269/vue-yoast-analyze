"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	const locale = paper.getLocale();
	const transitionWords = (0, _getTransitionWords2.default)(locale);
	const sentences = (0, _getSentences2.default)(paper.getText());
	const sentenceResults = checkSentencesForTransitionWords(sentences, transitionWords);

	return {
		totalSentences: sentences.length,
		sentenceResults: sentenceResults,
		transitionWordSentences: sentenceResults.length
	};
};

var _createRegexFromDoubleArray = require("../stringProcessing/createRegexFromDoubleArray.js");

var _createRegexFromDoubleArray2 = _interopRequireDefault(_createRegexFromDoubleArray);

var _getSentences = require("../stringProcessing/getSentences.js");

var _getSentences2 = _interopRequireDefault(_getSentences);

var _quotes = require("../stringProcessing/quotes.js");

var _getTransitionWords = require("../helpers/getTransitionWords.js");

var _getTransitionWords2 = _interopRequireDefault(_getTransitionWords);

var _matchWordInSentence = require("../stringProcessing/matchWordInSentence.js");

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let regexFromDoubleArray = null;
let regexFromDoubleArrayCacheKey = "";

/**
 * Memoizes the createRegexFromDoubleArray with the twoPartTransitionWords.
 *
 * @param {Array} twoPartTransitionWords The array containing two-part transition words.
 *
 * @returns {RegExp} The RegExp to match text with a double array.
 */
function getRegexFromDoubleArray(twoPartTransitionWords) {
	const cacheKey = (0, _lodashEs.flattenDeep)(twoPartTransitionWords).join("");
	if (regexFromDoubleArrayCacheKey !== cacheKey || regexFromDoubleArray === null) {
		regexFromDoubleArrayCacheKey = cacheKey;
		regexFromDoubleArray = (0, _createRegexFromDoubleArray2.default)(twoPartTransitionWords);
	}
	return regexFromDoubleArray;
}

/**
 * Matches the sentence against two part transition words.
 *
 * @param {string} sentence The sentence to match against.
 * @param {Array} twoPartTransitionWords The array containing two-part transition words.
 * @returns {Array} The found transitional words.
 */
const matchTwoPartTransitionWords = function matchTwoPartTransitionWords(sentence, twoPartTransitionWords) {
	sentence = (0, _quotes.normalizeSingle)(sentence);
	const twoPartTransitionWordsRegex = getRegexFromDoubleArray(twoPartTransitionWords);
	return sentence.match(twoPartTransitionWordsRegex);
};

/**
 * Matches the sentence against transition words.
 *
 * @param {string} sentence The sentence to match against.
 * @param {Array} transitionWords The array containing transition words.
 * @returns {Array} The found transitional words.
 */
const matchTransitionWords = function matchTransitionWords(sentence, transitionWords) {
	sentence = (0, _quotes.normalizeSingle)(sentence);
	return transitionWords.filter(word => (0, _matchWordInSentence.isWordInSentence)(word, sentence));
};

/**
 * Checks the passed sentences to see if they contain transition words.
 *
 * @param {Array} sentences The sentences to match against.
 * @param {Object} transitionWords The object containing both transition words and two part transition words.
 * @returns {Array} Array of sentence objects containing the complete sentence and the transition words.
 */
const checkSentencesForTransitionWords = function checkSentencesForTransitionWords(sentences, transitionWords) {
	const results = [];

	sentences.forEach(sentence => {
		const twoPartMatches = matchTwoPartTransitionWords(sentence, transitionWords.twoPartTransitionWords());

		if (twoPartMatches !== null) {
			results.push({
				sentence: sentence,
				transitionWords: twoPartMatches
			});

			return;
		}

		const transitionWordMatches = matchTransitionWords(sentence, transitionWords.transitionWords);

		if (transitionWordMatches.length !== 0) {
			results.push({
				sentence: sentence,
				transitionWords: transitionWordMatches
			});

			return;
		}
	});

	return results;
};

/**
 * Checks how many sentences from a text contain at least one transition word or two-part transition word
 * that are defined in the transition words config and two part transition words config.
 *
 * @param {Paper} paper The Paper object to get text from.
 * @returns {object} An object with the total number of sentences in the text
 * and the total number of sentences containing one or more transition words.
 */
//# sourceMappingURL=findTransitionWords.js.map
