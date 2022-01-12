"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _formatNumber = require("../../helpers/formatNumber");

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _inRange = require("../../helpers/inRange");

var _shortlinker = require("../../helpers/shortlinker");

var _stripHTMLTags = require("../../stringProcessing/stripHTMLTags");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _Mark = require("../../values/Mark.js");

var _Mark2 = _interopRequireDefault(_Mark);

var _addMark = require("../../markers/addMark.js");

var _addMark2 = _interopRequireDefault(_addMark);

var _getLanguageAvailability = require("../../helpers/getLanguageAvailability.js");

var _getLanguageAvailability2 = _interopRequireDefault(_getLanguageAvailability);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const availableLanguages = ["en", "de", "es", "fr", "nl", "it", "pt", "ru", "ca", "pl", "sv", "hu", "id", "ar", "he", "tr"];

/**
 * Calculates the actual percentage of transition words in the sentences.
 *
 * @param {object} sentences The object containing the total number of sentences and the number of sentences containing
 * a transition word.
 * @returns {number} The percentage of sentences containing a transition word.
 */
const calculateTransitionWordPercentage = function calculateTransitionWordPercentage(sentences) {
	if (sentences.transitionWordSentences === 0 || sentences.totalSentences === 0) {
		return 0;
	}

	return (0, _formatNumber2.default)(sentences.transitionWordSentences / sentences.totalSentences * 100);
};

/**
 * Calculates the score for the assessment based on the percentage of sentences containing transition words.
 *
 * @param {number} percentage The percentage of sentences containing transition words.
 * @returns {number} The score.
 */
const calculateScoreFromPercentage = function calculateScoreFromPercentage(percentage) {
	if (percentage < 20) {
		// Red indicator.
		return 3;
	}

	if ((0, _inRange.inRangeStartInclusive)(percentage, 20, 30)) {
		// Orange indicator.
		return 6;
	}

	if (percentage >= 30) {
		// Green indicator.
		return 9;
	}
};

/**
 * Calculates transition word result
 * @param {object} transitionWordSentences The object containing the total number of sentences and the number of sentences containing
 * a transition word.
 * @param {object} i18n The object used for translations.
 * @returns {object} Object containing score and text.
 */
const calculateTransitionWordResult = function calculateTransitionWordResult(transitionWordSentences, i18n) {
	const percentage = calculateTransitionWordPercentage(transitionWordSentences);
	const score = calculateScoreFromPercentage(percentage);
	const hasMarks = percentage > 0;
	const urlTitle = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34z");
	const urlCallToAction = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35a");

	if (score < 7 && percentage === 0) {
		return {
			score: (0, _formatNumber2.default)(score),
			hasMarks: hasMarks,
			text: i18n.sprintf(
			/* Translators: %1$s and %3$s expand to a link to yoast.com, %2$s expands to the anchor end tag */
			i18n.dgettext("js-text-analysis", "%1$sTransition words%2$s: None of the sentences contain transition words. %3$sUse some%2$s."), urlTitle, "</a>", urlCallToAction)
		};
	}

	if (score < 7) {
		return {
			score: (0, _formatNumber2.default)(score),
			hasMarks: hasMarks,
			text: i18n.sprintf(
			/* Translators: %1$s and %4$s expand to a link to yoast.com, %2$s expands to the anchor end tag,
   %3$s expands to the percentage of sentences containing transition words */
			i18n.dgettext("js-text-analysis", "%1$sTransition words%2$s: Only %3$s of the sentences contain transition words, which is not enough. %4$sUse more of them%2$s."), urlTitle, "</a>", percentage + "%", urlCallToAction)
		};
	}

	return {
		score: (0, _formatNumber2.default)(score),
		hasMarks: hasMarks,
		text: i18n.sprintf(
		/* Translators: %1$s expands to a link on yoast.com, %3$s expands to the anchor end tag. */
		i18n.dgettext("js-text-analysis", "%1$sTransition words%2$s: Well done!"), urlTitle, "</a>")
	};
};

/**
 * Scores the percentage of sentences including one or more transition words.
 * @param {object} paper The paper to use for the assessment.
 * @param {object} researcher The researcher used for calling research.
 * @param {object} i18n The object used for translations.
 * @returns {object} The Assessment result.
 */
const transitionWordsAssessment = function transitionWordsAssessment(paper, researcher, i18n) {
	const transitionWordSentences = researcher.getResearch("findTransitionWords");
	const transitionWordResult = calculateTransitionWordResult(transitionWordSentences, i18n);
	const assessmentResult = new _AssessmentResult2.default();

	assessmentResult.setScore(transitionWordResult.score);
	assessmentResult.setText(transitionWordResult.text);
	assessmentResult.setHasMarks(transitionWordResult.hasMarks);

	return assessmentResult;
};

/**
 * Marks text for the transition words assessment.
 * @param {Paper} paper The paper to use for the marking.
 * @param {Researcher} researcher The researcher containing the necessary research.
 * @returns {Array<Mark>} A list of marks that should be applied.
 */
const transitionWordsMarker = function transitionWordsMarker(paper, researcher) {
	const transitionWordSentences = researcher.getResearch("findTransitionWords");

	return (0, _lodashEs.map)(transitionWordSentences.sentenceResults, function (sentenceResult) {
		let sentence = sentenceResult.sentence;
		sentence = (0, _stripHTMLTags.stripIncompleteTags)(sentence);
		return new _Mark2.default({
			original: sentence,
			marked: (0, _addMark2.default)(sentence)
		});
	});
};

/**
 * Checks if the transition words assessment is applicable to the paper.
 *
 * @param {Object} paper The paper to check.
 *
 * @returns {boolean} Returns true if the language is available and the paper is not empty.
 */
const isApplicable = function isApplicable(paper) {
	const isLanguageAvailable = (0, _getLanguageAvailability2.default)(paper.getLocale(), availableLanguages);
	return isLanguageAvailable && paper.hasText();
};

exports.default = {
	identifier: "textTransitionWords",
	getResult: transitionWordsAssessment,
	isApplicable: isApplicable,
	getMarks: transitionWordsMarker
};
//# sourceMappingURL=transitionWordsAssessment.js.map
