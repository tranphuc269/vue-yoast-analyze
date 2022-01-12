"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formatNumber = require("../../helpers/formatNumber");

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _inRange = require("../../helpers/inRange");

var _shortlinker = require("../../helpers/shortlinker");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _checkForTooLongSentences = require("./../../assessmentHelpers/checkForTooLongSentences");

var _checkForTooLongSentences2 = _interopRequireDefault(_checkForTooLongSentences);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calculates sentence length score
 * @param {array} sentences The array containing sentences.
 * @param {object} i18n The object used for translations.
 * @returns {object} Object containing score and text.
 */
var calculateSentenceLengthResult = function calculateSentenceLengthResult(sentences, i18n) {
	var score;
	var percentage = 0;
	var recommendedValue = 20;
	var tooLongTotal = (0, _checkForTooLongSentences2.default)(sentences, recommendedValue).length;
	const sentenceLengthURL = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/short-sentences");

	if (sentences.length !== 0) {
		percentage = (0, _formatNumber2.default)(tooLongTotal / sentences.length * 100);
	}

	if (percentage <= 20) {
		// Green indicator.
		score = 9;
	}

	if ((0, _inRange.inRangeEndInclusive)(percentage, 20, 25)) {
		// Orange indicator.
		score = 6;
	}

	if (percentage > 25) {
		// Red indicator.
		score = 3;
	}

	if (score >= 7) {
		return {
			score: score,
			text: i18n.sprintf(i18n.dgettext("js-text-analysis",
			// Translators: %1$s expands to a link on yoast.com, %2$s expands to the recommended maximum sentence length,
			// %3$s expands to the anchor end tag.
			"The meta description contains no sentences %1$sover %2$s words%3$s."), sentenceLengthURL, recommendedValue, "</a>")
		};
	}
	return {
		score: score,
		text: i18n.sprintf(i18n.dngettext("js-text-analysis",
		// Translators: %1$d expands to number of sentences, %2$s expands to a link on yoast.com,
		// %3$s expands to the recommended maximum sentence length, %4$s expands to the anchor end tag.
		"The meta description contains %1$d sentence %2$sover %3$s words%4$s. Try to shorten this sentence.", "The meta description contains %1$d sentences %2$sover %3$s words%4$s. Try to shorten these sentences.", tooLongTotal), tooLongTotal, sentenceLengthURL, recommendedValue, "</a>")
	};
};

/**
 * Scores the percentage of sentences including more than the recommended number of words.
 *
 * @param {object} paper The paper to use for the assessment.
 * @param {object} researcher The researcher used for calling research.
 * @param {object} i18n The object used for translations.
 * @returns {object} The Assessmentresult
 */
var sentenceLengthInDescriptionAssessment = function sentenceLengthInDescriptionAssessment(paper, researcher, i18n) {
	var sentenceCount = researcher.getResearch("countSentencesFromDescription");
	var sentenceResult = calculateSentenceLengthResult(sentenceCount, i18n);
	var assessmentResult = new _AssessmentResult2.default();

	assessmentResult.setScore(sentenceResult.score);
	assessmentResult.setText(sentenceResult.text);

	return assessmentResult;
};

/**
 * Checks if the paper has a metadescription, which is a prerequisite for the assessment to be applicable to the paper.
 *
 * @param {Object} paper The paper to check.
 *
 * @returns {boolean} Returns true if the paper has a meta description.
 */
const isApplicable = function isApplicable(paper) {
	return paper.hasDescription();
};

exports.default = {
	identifier: "metaDescriptionSentenceLength",
	getResult: sentenceLengthInDescriptionAssessment,
	isApplicable: isApplicable
};
//# sourceMappingURL=sentenceLengthInDescriptionAssessment.js.map
