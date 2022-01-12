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
 * Assessment that checks if the url is long enough.
 */
class UrlLengthAssessment extends _assessment2.default {
	/**
  * Sets the identifier and the config.
  *
  * @param {Object} [config] The configuration to use.
  *
  * @returns {void}
  *
  * @deprecated since 1.48. We have removed it from the assessments since we do not consider it an important SEO factor anymore.
  */
	constructor(config = {}) {
		super();

		console.warn("Deprecation Warning: The UrlLengthAssessment has been deprecated since version 1.48. " + "We have removed it from the assessments since we do not consider it an important SEO factor anymore.");

		const defaultConfig = {
			scores: {
				tooLong: 6
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35b"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35c")
		};

		this.identifier = "urlLength";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	/**
  * Checks the length of the url.
  *
  * @param {Paper} paper The paper to run this assessment on.
  * @param {Researcher} researcher The researcher used for the assessment.
  * @param {Jed} i18n The i18n-object used for parsing translations.
  *
  * @returns {AssessmentResult} an AssessmentResult with the score and the formatted text.
  */
	getResult(paper, researcher, i18n) {
		const urlIsTooLong = researcher.getResearch("urlLength");
		const assessmentResult = new _AssessmentResult2.default();

		assessmentResult.setScore(this.calculateScore(urlIsTooLong));
		assessmentResult.setText(this.translateScore(urlIsTooLong, i18n));

		return assessmentResult;
	}

	/**
  * Checks whether the paper has a url.
  *
  * @param {Paper} paper The paper to use for the assessment.
  *
  * @returns {boolean} True when there is text.
  */
	isApplicable(paper) {
		return paper.hasUrl();
	}

	/**
  * Calculates the score based on the url length.
  *
  * @param {boolean} urlIsTooLong True when the URL is too long.
  *
  * @returns {number|null} The calculated score.
  */
	calculateScore(urlIsTooLong) {
		if (urlIsTooLong) {
			return this._config.scores.tooLong;
		}

		return null;
	}

	/**
  * Translates the score to a message the user can understand.
  *
  * @param {boolean} urlIsTooLong True when the URL is too long.
  * @param {Jed} i18n The object used for translations.
  *
  * @returns {string} The translated string.
  */
	translateScore(urlIsTooLong, i18n) {
		if (urlIsTooLong) {
			return i18n.sprintf(
			/* Translators:  %1$s and %2$s expand to links on yoast.com, %3$s expands to the anchor end tag */
			i18n.dgettext("js-text-analysis", "%1$sSlug too long%3$s: the slug for this page is a bit long. %2$sShorten it%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>");
		}

		return "";
	}
}

exports.default = UrlLengthAssessment;
//# sourceMappingURL=UrlLengthAssessment.js.map
