"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _formatNumber = require("../../helpers/formatNumber");

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _getLanguageAvailability = require("../../helpers/getLanguageAvailability");

var _getLanguageAvailability2 = _interopRequireDefault(_getLanguageAvailability);

var _inRange = require("../../helpers/inRange");

var _addMark = require("../../markers/addMark");

var _addMark2 = _interopRequireDefault(_addMark);

var _shortlinker = require("../../helpers/shortlinker");

var _stripHTMLTags = require("../../stringProcessing/stripHTMLTags");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _Mark = require("../../values/Mark");

var _Mark2 = _interopRequireDefault(_Mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const availableLanguages = ["en", "de", "fr", "es", "ru", "it", "nl", "pl", "sv", "pt", "id", "ar", "he", "hu", "tr"];

/**
 * Calculates the result based on the number of sentences and passives.
 * @param {object} passiveVoice The object containing the number of sentences and passives
 * @param {object} i18n The object used for translations.
 * @returns {{score: number, text}} resultobject with score and text.
 */
const calculatePassiveVoiceResult = function calculatePassiveVoiceResult(passiveVoice, i18n) {
	let score;
	let percentage = 0;
	const recommendedValue = 10;
	const urlTitle = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34t");
	const urlCallToAction = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34u");

	// Prevent division by zero errors.
	if (passiveVoice.total !== 0) {
		percentage = (0, _formatNumber2.default)(passiveVoice.passives.length / passiveVoice.total * 100);
	}

	const hasMarks = percentage > 0;

	if (percentage <= 10) {
		// Green indicator.
		score = 9;
	}

	if ((0, _inRange.inRangeEndInclusive)(percentage, 10, 15)) {
		// Orange indicator.
		score = 6;
	}

	if (percentage > 15) {
		// Red indicator.
		score = 3;
	}

	if (score >= 7) {
		return {
			score: score,
			hasMarks: hasMarks,
			text: i18n.sprintf(
			/* Translators: %1$s expands to a link on yoast.com, %2$s expands to the anchor end tag. */
			i18n.dgettext("js-text-analysis", "%1$sPassive voice%2$s: You're using enough active voice. That's great!"), urlTitle, "</a>")
		};
	}
	return {
		score: score,
		hasMarks: hasMarks,
		text: i18n.sprintf(
		/* Translators: %1$s and %5$s expand to a link on yoast.com, %2$s expands to the anchor end tag,
  %3$s expands to the percentage of sentences in passive voice, %4$s expands to the recommended value. */
		i18n.dgettext("js-text-analysis", "%1$sPassive voice%2$s: %3$s of the sentences contain passive voice, which is more than the recommended maximum of %4$s. " + "%5$sTry to use their active counterparts%2$s."), urlTitle, "</a>", percentage + "%", recommendedValue + "%", urlCallToAction)
	};
};

/**
 * Marks all sentences that have the passive voice.
 *
 * @param {object} paper The paper to use for the assessment.
 * @param {object} researcher The researcher used for calling research.
 * @returns {object} All marked sentences.
 */
const passiveVoiceMarker = function passiveVoiceMarker(paper, researcher) {
	const passiveVoice = researcher.getResearch("passiveVoice");
	return (0, _lodashEs.map)(passiveVoice.passives, function (sentence) {
		sentence = (0, _stripHTMLTags.stripIncompleteTags)(sentence);
		const marked = (0, _addMark2.default)(sentence);
		return new _Mark2.default({
			original: sentence,
			marked: marked
		});
	});
};

/**
 * Runs the passiveVoice module, based on this returns an assessment result with score and text.
 * @param {object} paper The paper to use for the assessment.
 * @param {object} researcher The researcher used for calling research.
 * @param {object} i18n The object used for translations.
 * @returns {object} the Assessmentresult
 */
const passiveVoiceAssessment = function passiveVoiceAssessment(paper, researcher, i18n) {
	const passiveVoice = researcher.getResearch("passiveVoice");

	const passiveVoiceResult = calculatePassiveVoiceResult(passiveVoice, i18n);

	const assessmentResult = new _AssessmentResult2.default();

	assessmentResult.setScore(passiveVoiceResult.score);
	assessmentResult.setText(passiveVoiceResult.text);
	assessmentResult.setHasMarks(passiveVoiceResult.hasMarks);

	return assessmentResult;
};

/**
 * Checks if passive voice analysis is available for the language of the paper.
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
	identifier: "passiveVoice",
	getResult: passiveVoiceAssessment,
	isApplicable: isApplicable,
	getMarks: passiveVoiceMarker
};
//# sourceMappingURL=passiveVoiceAssessment.js.map
