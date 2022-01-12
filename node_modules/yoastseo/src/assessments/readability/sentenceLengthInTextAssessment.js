"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _assessment = require("../../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _checkForTooLongSentences = require("../../assessmentHelpers/checkForTooLongSentences");

var _checkForTooLongSentences2 = _interopRequireDefault(_checkForTooLongSentences);

var _formatNumber = require("../../helpers/formatNumber");

var _formatNumber2 = _interopRequireDefault(_formatNumber);

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

/**
 * Represents the assessment that will calculate the length of sentences in the text.
 */
class SentenceLengthInTextAssessment extends _assessment2.default {
	/**
  * Sets the identifier and the config.
  *
  * @param {object} config The configuration to use.
  * @returns {void}
  */
	constructor(config = {}) {
		super();

		const defaultConfig = {
			recommendedWordCount: 20,
			slightlyTooMany: 25,
			farTooMany: 30
		};

		this.identifier = "textSentenceLength";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	/**
  * Scores the percentage of sentences including more than the recommended number of words.
  *
  * @param {Paper} paper The paper to use for the assessment.
  * @param {Researcher} researcher The researcher used for calling research.
  * @param {object} i18n The object used for translations.
  * @returns {AssessmentResult} The Assessment result.
  */
	getResult(paper, researcher, i18n) {
		const sentences = researcher.getResearch("countSentencesFromText");
		const percentage = this.calculatePercentage(sentences);
		const score = this.calculateScore(percentage);

		const assessmentResult = new _AssessmentResult2.default();

		assessmentResult.setScore(score);
		assessmentResult.setText(this.translateScore(score, percentage, i18n));
		assessmentResult.setHasMarks(percentage > 0);

		return assessmentResult;
	}

	/**
  * Checks whether the paper has text.
  *
  * @param {Paper} paper The paper to use for the assessment.
  *
  * @returns {boolean} True when there is text.
  */
	isApplicable(paper) {
		return paper.hasText();
	}

	/**
  * Mark the sentences.
  *
  * @param {Paper} paper The paper to use for the marking.
  * @param {Researcher} researcher The researcher to use.
  *
  * @returns {Array} Array with all the marked sentences.
  */
	getMarks(paper, researcher) {
		const sentenceCount = researcher.getResearch("countSentencesFromText");
		const sentenceObjects = this.getTooLongSentences(sentenceCount);

		return (0, _lodashEs.map)(sentenceObjects, function (sentenceObject) {
			const sentence = (0, _stripHTMLTags.stripIncompleteTags)(sentenceObject.sentence);
			return new _Mark2.default({
				original: sentence,
				marked: (0, _addMark2.default)(sentence)
			});
		});
	}

	/**
  * Translates the score to a message the user can understand.
  *
  * @param {number} score The score.
  * @param {number} percentage The percentage.
  * @param {object} i18n The object used for translations.
  *
  * @returns {string} A string.
  */
	translateScore(score, percentage, i18n) {
		const urlTitle = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34v");
		const urlCallToAction = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34w");
		if (score >= 7) {
			return i18n.sprintf(
			/* Translators: %1$s expands to a link on yoast.com, %2$s expands to the anchor end tag */
			i18n.dgettext("js-text-analysis", "%1$sSentence length%2$s: Great!"), urlTitle, "</a>");
		}

		return i18n.sprintf(
		/* Translators: %1$s and %6$s expand to a link on yoast.com, %2$s expands to the anchor end tag,
  %3$d expands to percentage of sentences, %4$s expands to the recommended maximum sentence length,
  %5$s expands to the recommended maximum percentage. */
		i18n.dgettext("js-text-analysis", "%1$sSentence length%2$s: %3$s of the sentences contain more than %4$s words, which is more than the recommended maximum of %5$s." + " %6$sTry to shorten the sentences%2$s."), urlTitle, "</a>", percentage + "%", this._config.recommendedWordCount, this._config.slightlyTooMany + "%", urlCallToAction);
	}

	/**
  * Calculates the percentage of sentences that are too long.
  *
  * @param {Array} sentences The sentences to calculate the percentage for.
  * @returns {number} The calculates percentage of too long sentences.
  */
	calculatePercentage(sentences) {
		let percentage = 0;

		if (sentences.length !== 0) {
			const tooLongTotal = this.countTooLongSentences(sentences);

			percentage = (0, _formatNumber2.default)(tooLongTotal / sentences.length * 100);
		}

		return percentage;
	}

	/**
  * Calculates the score for the given percentage.
  *
  * @param {number} percentage The percentage to calculate the score for.
  * @returns {number} The calculated score.
  */
	calculateScore(percentage) {
		let score;

		// Green indicator.
		if (percentage <= this._config.slightlyTooMany) {
			score = 9;
		}

		// Orange indicator.
		if ((0, _inRange.inRangeEndInclusive)(percentage, this._config.slightlyTooMany, this._config.farTooMany)) {
			score = 6;
		}

		// Red indicator.
		if (percentage > this._config.farTooMany) {
			score = 3;
		}

		return score;
	}

	/**
  * Gets the sentences that are qualified as being too long.
  *
  * @param {array} sentences The sentences to filter through.
  * @returns {array} Array with all the sentences considered to be too long.
  */
	getTooLongSentences(sentences) {
		return (0, _checkForTooLongSentences2.default)(sentences, this._config.recommendedWordCount);
	}

	/**
  * Get the total amount of sentences that are qualified as being too long.
  *
  * @param {Array} sentences The sentences to filter through.
  * @returns {Number} The amount of sentences that are considered too long.
  */
	countTooLongSentences(sentences) {
		return this.getTooLongSentences(sentences).length;
	}
}

exports.default = SentenceLengthInTextAssessment;
//# sourceMappingURL=sentenceLengthInTextAssessment.js.map
