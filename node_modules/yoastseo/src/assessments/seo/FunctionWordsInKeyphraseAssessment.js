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
 * Assessment to check whether the keyphrase only contains function words.
 */
class FunctionWordsInKeyphraseAssessment extends _assessment2.default {
	/**
  * Sets the identifier and the config.
  *
  * @param {Object} [config] The configuration to use.
  * @param {number} [config.scores.onlyFunctionWords] The score to return if the keyphrase contains only function words.
  * @param {string} [config.urlTitle] The URL to the relevant KB article.
  * @param {string} [config.urlCallToAction] The URL to the call-to-action article.
  *
  * @returns {void}
  */
	constructor(config = {}) {
		super();

		const defaultConfig = {
			scores: {
				onlyFunctionWords: 0
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/functionwordskeyphrase-1"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/functionwordskeyphrase-2")
		};

		this.identifier = "functionWordsInKeyphrase";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	/**
  * Runs the functionWordsInKeyphrase researcher, based on this returns an assessment result with score.
  *
  * @param {Paper} paper The paper to use for the assessment.
  * @param {Researcher} researcher The researcher used for calling research.
  * @param {Jed} i18n The object used for translations.
  *
  * @returns {AssessmentResult} The result of the assessment.
  */
	getResult(paper, researcher, i18n) {
		this._functionWordsInKeyphrase = researcher.getResearch("functionWordsInKeyphrase");
		this._keyword = (0, _lodashEs.escape)(paper.getKeyword());
		const assessmentResult = new _AssessmentResult2.default();

		if (this._functionWordsInKeyphrase) {
			assessmentResult.setScore(this._config.scores.onlyFunctionWords);
			assessmentResult.setText(i18n.sprintf(
			/**
    * Translators:
    * %1$s and %2$s expand to links on yoast.com,
    * %3$s expands to the anchor end tag,
    * %4$s expands to the focus keyphrase of the article.
    */
			i18n.dgettext("js-text-analysis", "%1$sFunction words in keyphrase%3$s: " + "Your keyphrase \"%4$s\" contains function words only. " + "%2$sLearn more about what makes a good keyphrase.%3$s"), this._config.urlTitle, this._config.urlCallToAction, "</a>", this._keyword));
		}

		return assessmentResult;
	}

	/**
  * Checks if assessment is applicable to the paper.
  *
  * @param {Paper} paper The paper to be analyzed.
  *
  * @returns {boolean} Whether the paper has keyword.
  */
	isApplicable(paper) {
		return paper.hasKeyword();
	}
}

exports.default = FunctionWordsInKeyphraseAssessment;
//# sourceMappingURL=FunctionWordsInKeyphraseAssessment.js.map
