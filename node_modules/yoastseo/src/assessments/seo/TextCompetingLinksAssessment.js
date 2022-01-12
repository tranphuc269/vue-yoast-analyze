"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _assessment = require("../../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _shortlinker = require("../../helpers/shortlinker");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Assessment to check whether you're linking to a different page with the keyword from this page.
 */
class TextCompetingLinksAssessment extends _assessment2.default {
	/**
  * Sets the identifier and the config.
  *
  * @param {Object} [config] The configuration to use.
  * @param {number} [config.parameters.recommendedMaximum] The recommended maximum number of links using the same keyword as this paper.
  * @param {string} [config.scores.bad] The score to return if there are more links with the same keyword than the recommended maximum.
  * @param {string} [config.url] The URL to the relevant article on Yoast.com.
  *
  * @returns {void}
  */
	constructor(config = {}) {
		super();

		const defaultConfig = {
			parameters: {
				recommendedMaximum: 0
			},
			scores: {
				bad: 2
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34l"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34m")
		};

		this.identifier = "textCompetingLinks";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	/**
  * Runs the linkCount module, based on this returns an assessment result with score.
  *
  * @param {Paper} paper The paper to use for the assessment.
  * @param {Researcher} researcher The researcher used for calling research.
  * @param {Jed} i18n The object used for translations.
  *
  * @returns {Object} The AssessmentResult.
  */
	getResult(paper, researcher, i18n) {
		const assessmentResult = new _AssessmentResult2.default();

		this.linkCount = researcher.getResearch("getLinkStatistics");

		const calculatedResult = this.calculateResult(i18n);

		if ((0, _lodashEs.isUndefined)(calculatedResult)) {
			return assessmentResult;
		}

		assessmentResult.setScore(calculatedResult.score);
		assessmentResult.setText(calculatedResult.resultText);
		assessmentResult.setHasMarks(false);

		return assessmentResult;
	}

	/**
  * Determines if the assessment is applicable to the paper.
  *
  * @param {Paper} paper The paper to check
  *
  * @returns {boolean} Whether the paper has text and a keyword
  */
	isApplicable(paper) {
		return paper.hasText() && paper.hasKeyword();
	}

	/**
  * Returns a result based on the number of links.
  *
  * @param {Jed} i18n The object used for translations.
  *
  * @returns {Object} ResultObject with score and text.
  */
	calculateResult(i18n) {
		if (this.linkCount.keyword.totalKeyword > this._config.parameters.recommendedMaximum) {
			return {
				score: this._config.scores.bad,
				resultText: i18n.sprintf(
				/* Translators:  %1$s and %2$s expand to links on yoast.com, %3$s expands to the anchor end tag */
				i18n.dgettext("js-text-analysis", "%1$sLink keyphrase%3$s: " + "You're linking to another page with the words you want this page to rank for. " + "%2$sDon't do that%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}
	}
}

exports.default = TextCompetingLinksAssessment;
//# sourceMappingURL=TextCompetingLinksAssessment.js.map
