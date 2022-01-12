"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	let score;
	let text = paper.getText();
	const locale = paper.getLocale();
	const language = (0, _getLanguage2.default)(locale);
	if (text === "") {
		return 0;
	}

	text = (0, _stripNumbers2.default)(text);

	const numberOfSentences = (0, _countSentences2.default)(text);

	const numberOfWords = (0, _countWords2.default)(text);

	// Prevent division by zero errors.
	if (numberOfSentences === 0 || numberOfWords === 0) {
		return 0;
	}

	const numberOfSyllables = (0, _count2.default)(text, locale);
	const averageWordsPerSentence = getAverage(numberOfWords, numberOfSentences);
	const syllablesPer100Words = numberOfSyllables * (100 / numberOfWords);

	switch (language) {
		case "nl":
			score = 206.84 - 0.77 * syllablesPer100Words - 0.93 * averageWordsPerSentence;
			break;
		case "de":
			score = 180 - averageWordsPerSentence - 58.5 * numberOfSyllables / numberOfWords;
			break;
		case "it":
			score = 217 - 1.3 * averageWordsPerSentence - 0.6 * syllablesPer100Words;
			break;
		case "ru":
			score = 206.835 - 1.3 * numberOfWords / numberOfSentences - 60.1 * numberOfSyllables / numberOfWords;
			break;

		case "es":
			score = 206.84 - 1.02 * numberOfWords / numberOfSentences - 0.6 * syllablesPer100Words;
			break;

		case "fr":
			score = 207 - 1.015 * numberOfWords / numberOfSentences - 73.6 * numberOfSyllables / numberOfWords;
			break;

		case "pt":
			score = 248.835 - 1.015 * averageWordsPerSentence - 84.6 * numberOfSyllables / numberOfWords;
			break;

		case "en":
		default:
			score = 206.835 - 1.015 * averageWordsPerSentence - 84.6 * (numberOfSyllables / numberOfWords);
			break;
	}

	return (0, _formatNumber2.default)(score);
};

var _stripNumbers = require("../stringProcessing/stripNumbers.js");

var _stripNumbers2 = _interopRequireDefault(_stripNumbers);

var _countSentences = require("../stringProcessing/countSentences.js");

var _countSentences2 = _interopRequireDefault(_countSentences);

var _countWords = require("../stringProcessing/countWords.js");

var _countWords2 = _interopRequireDefault(_countWords);

var _count = require("../stringProcessing/syllables/count.js");

var _count2 = _interopRequireDefault(_count);

var _formatNumber = require("../helpers/formatNumber.js");

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _getLanguage = require("../helpers/getLanguage.js");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calculates an average from a total and an amount
 *
 * @param {number} total The total.
 * @param {number} amount The amount.
 * @returns {number} The average from the total and the amount.
 */
/** @module analyses/calculateFleschReading */

const getAverage = function getAverage(total, amount) {
	return total / amount;
};

/**
 * This calculates the flesch reading score for a given text.
 *
 * @param {object} paper The paper containing the text
 * @returns {number} The score of the flesch reading test
 */
//# sourceMappingURL=calculateFleschReading.js.map
