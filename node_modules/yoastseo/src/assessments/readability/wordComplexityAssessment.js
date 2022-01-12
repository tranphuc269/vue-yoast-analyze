"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _formatNumber = require("../../helpers/formatNumber");

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _addMark = require("../../markers/addMark");

var _addMark2 = _interopRequireDefault(_addMark);

var _shortlinker = require("../../helpers/shortlinker");

var _removeSentenceTerminators = require("../../stringProcessing/removeSentenceTerminators");

var _removeSentenceTerminators2 = _interopRequireDefault(_removeSentenceTerminators);

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _Mark = require("../../values/Mark");

var _Mark2 = _interopRequireDefault(_Mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The maximum recommended value is 3 syllables. With more than 3 syllables a word is considered complex.
var recommendedValue = 3;

/**
 * Filters the words that aren't too long.
 *
 * @param {Array} words The array with words to filter on complexity.
 * @returns {Array} The filtered list with complex words.
 */
var filterComplexity = function filterComplexity(words) {
	return (0, _lodashEs.filter)(words, function (word) {
		return word.complexity > recommendedValue;
	});
};

/**
 * Calculates the complexity of the text based on the syllables in words.
 * @param {number} wordCount The number of words used.
 * @param {Array} wordComplexity The list of words with their syllable count.
 * @param {Object} i18n The object used for translations.
 * @returns {{score: number, text}} resultobject with score and text.
 */
var calculateComplexity = function calculateComplexity(wordCount, wordComplexity, i18n) {
	var percentage = 0;
	var tooComplexWords = filterComplexity(wordComplexity).length;

	// Prevent division by zero errors.
	if (wordCount !== 0) {
		percentage = tooComplexWords / wordCount * 100;
	}

	percentage = (0, _formatNumber2.default)(percentage);
	var hasMarks = percentage > 0;
	var recommendedMaximum = 5;
	var wordComplexityURL = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/difficult-words");
	// 6 is the number of scorepoints between 3, minscore and 9, maxscore. For scoring we use 10 steps. each step is 0.6
	// Up to 1.7 percent is for scoring a 9, higher percentages give lower scores.
	var score = 9 - Math.max(Math.min(0.6 * (percentage - 1.7), 6), 0);
	score = (0, _formatNumber2.default)(score);

	if (score >= 7) {
		return {
			score: score,
			hasMarks: hasMarks,
			text: i18n.sprintf(i18n.dgettext("js-text-analysis",

			// Translators: %1$s expands to the percentage of complex words, %2$s expands to a link on yoast.com,
			// %3$d expands to the recommended maximum number of syllables,
			// %4$s expands to the anchor end tag, %5$s expands to the recommended maximum number of syllables.
			"%1$s of the words contain %2$sover %3$s syllables%4$s, " + "which is less than or equal to the recommended maximum of %5$s."), percentage + "%", wordComplexityURL, recommendedValue, "</a>", recommendedMaximum + "%")
		};
	}

	return {
		score: score,
		hasMarks: hasMarks,
		text: i18n.sprintf(i18n.dgettext("js-text-analysis",

		// Translators: %1$s expands to the percentage of complex words, %2$s expands to a link on yoast.com,
		// %3$d expands to the recommended maximum number of syllables,
		// %4$s expands to the anchor end tag, %5$s expands to the recommended maximum number of syllables.
		"%1$s of the words contain %2$sover %3$s syllables%4$s, " + "which is more than the recommended maximum of %5$s."), percentage + "%", wordComplexityURL, recommendedValue, "</a>", recommendedMaximum + "%")
	};
};

/**
 * Marks complex words in a sentence.
 * @param {string} sentence The sentence to mark complex words in.
 * @param {Array} complexWords The array with complex words.
 * @returns {Array} All marked complex words.
 */
var markComplexWordsInSentence = function markComplexWordsInSentence(sentence, complexWords) {
	var splitWords = sentence.split(/\s+/);

	(0, _lodashEs.forEach)(complexWords, function (complexWord) {
		var wordIndex = complexWord.wordIndex;

		if (complexWord.word === splitWords[wordIndex] || complexWord.word === (0, _removeSentenceTerminators2.default)(splitWords[wordIndex])) {
			splitWords[wordIndex] = splitWords[wordIndex].replace(complexWord.word, (0, _addMark2.default)(complexWord.word));
		}
	});
	return splitWords;
};

/**
 * Splits sentence on whitespace
 * @param {string} sentence The sentence to split.
 * @returns {Array} All words from sentence. .
 */
var splitSentenceOnWhitespace = function splitSentenceOnWhitespace(sentence) {
	var whitespace = sentence.split(/\S+/);

	// Drop first and last elements.
	whitespace.pop();
	whitespace.shift();

	return whitespace;
};

/**
 * Creates markers of words that are complex.
 *
 * @param {Paper} paper The Paper object to assess.
 * @param {Researcher} researcher The Researcher object containing all available researches.
 * @returns {Array} A list with markers
 */
var wordComplexityMarker = function wordComplexityMarker(paper, researcher) {
	var wordComplexityResults = researcher.getResearch("wordComplexity");

	return (0, _lodashEs.flatMap)(wordComplexityResults, function (result) {
		var words = result.words;
		var sentence = result.sentence;

		var complexWords = filterComplexity(words);

		if (complexWords.length === 0) {
			return [];
		}

		var splitWords = markComplexWordsInSentence(sentence, complexWords);

		var whitespace = splitSentenceOnWhitespace(sentence);

		// Rebuild the sentence with the marked words.
		var markedSentence = (0, _lodashEs.zip)(splitWords, whitespace);
		markedSentence = (0, _lodashEs.flatten)(markedSentence);
		markedSentence = markedSentence.join("");

		return new _Mark2.default({
			original: sentence,
			marked: markedSentence
		});
	});
};

/**
 * Execute the word complexity assessment and return a result based on the syllables in words
 * @param {Paper} paper The Paper object to assess.
 * @param {Researcher} researcher The Researcher object containing all available researches.
 * @param {object} i18n The object used for translations
 * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
 */
var wordComplexityAssessment = function wordComplexityAssessment(paper, researcher, i18n) {
	var wordComplexity = researcher.getResearch("wordComplexity");
	wordComplexity = (0, _lodashEs.flatMap)(wordComplexity, function (sentence) {
		return sentence.words;
	});
	var wordCount = wordComplexity.length;

	var complexityResult = calculateComplexity(wordCount, wordComplexity, i18n);
	var assessmentResult = new _AssessmentResult2.default();
	assessmentResult.setScore(complexityResult.score);
	assessmentResult.setText(complexityResult.text);
	assessmentResult.setHasMarks(complexityResult.hasMarks);
	return assessmentResult;
};

/**
 * Checks whether the paper has text.
 *
 * @param {Paper} paper The paper to use for the assessment.
 *
 * @returns {boolean} True when there is text.
 */
var isApplicable = function isApplicable(paper) {
	return paper.hasText();
};

exports.default = {
	identifier: "wordComplexity",
	getResult: wordComplexityAssessment,
	isApplicable: isApplicable,
	getMarks: wordComplexityMarker
};
//# sourceMappingURL=wordComplexityAssessment.js.map
