"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assessor = require("./assessor.js");

var _assessor2 = _interopRequireDefault(_assessor);

var _fleschReadingEaseAssessment = require("./assessments/readability/fleschReadingEaseAssessment.js");

var _fleschReadingEaseAssessment2 = _interopRequireDefault(_fleschReadingEaseAssessment);

var _paragraphTooLongAssessment = require("./assessments/readability/paragraphTooLongAssessment.js");

var _paragraphTooLongAssessment2 = _interopRequireDefault(_paragraphTooLongAssessment);

var _sentenceLengthInTextAssessment = require("./assessments/readability/sentenceLengthInTextAssessment.js");

var _sentenceLengthInTextAssessment2 = _interopRequireDefault(_sentenceLengthInTextAssessment);

var _subheadingDistributionTooLongAssessment = require("./assessments/readability/subheadingDistributionTooLongAssessment.js");

var _subheadingDistributionTooLongAssessment2 = _interopRequireDefault(_subheadingDistributionTooLongAssessment);

var _transitionWordsAssessment = require("./assessments/readability/transitionWordsAssessment.js");

var _transitionWordsAssessment2 = _interopRequireDefault(_transitionWordsAssessment);

var _passiveVoiceAssessment = require("./assessments/readability/passiveVoiceAssessment.js");

var _passiveVoiceAssessment2 = _interopRequireDefault(_passiveVoiceAssessment);

var _sentenceBeginningsAssessment = require("./assessments/readability/sentenceBeginningsAssessment.js");

var _sentenceBeginningsAssessment2 = _interopRequireDefault(_sentenceBeginningsAssessment);

var _textPresenceAssessment = require("./assessments/readability/textPresenceAssessment.js");

var _textPresenceAssessment2 = _interopRequireDefault(_textPresenceAssessment);

var _combinedConfig = require("./config/content/combinedConfig.js");

var _combinedConfig2 = _interopRequireDefault(_combinedConfig);

var _scoreToRating = require("./interpreters/scoreToRating");

var _scoreToRating2 = _interopRequireDefault(_scoreToRating);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates the Assessor
 *
 * @param {object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @param {Object} options.marker The marker to pass the list of marks to.
 * @param {string} options.locale The locale.
 *
 * @constructor
 */
const ContentAssessor = function ContentAssessor(i18n, options = {}) {
	_assessor2.default.call(this, i18n, options);
	this.type = "ContentAssessor";
	const locale = options.hasOwnProperty("locale") ? options.locale : "en_US";

	this._assessments = [new _fleschReadingEaseAssessment2.default((0, _combinedConfig2.default)(locale).fleschReading), new _subheadingDistributionTooLongAssessment2.default(), _paragraphTooLongAssessment2.default, new _sentenceLengthInTextAssessment2.default((0, _combinedConfig2.default)(locale).sentenceLength), _transitionWordsAssessment2.default, _passiveVoiceAssessment2.default, _textPresenceAssessment2.default, _sentenceBeginningsAssessment2.default];
};

/*
	Temporarily disabled:

	var wordComplexity = require( "./assessments/wordComplexityAssessment.js" );
	var sentenceLengthInDescription = require( "./assessments/sentenceLengthInDescriptionAssessment.js" );
 */

require("util").inherits(ContentAssessor, _assessor2.default);

/**
 * Calculates the weighted rating for languages that have all assessments based on a given rating.
 *
 * @param {number} rating The rating to be weighted.
 * @returns {number} The weighted rating.
 */
ContentAssessor.prototype.calculatePenaltyPointsFullSupport = function (rating) {
	switch (rating) {
		case "bad":
			return 3;
		case "ok":
			return 2;
		default:
		case "good":
			return 0;
	}
};

/**
 * Calculates the weighted rating for languages that don't have all assessments based on a given rating.
 *
 * @param {number} rating The rating to be weighted.
 * @returns {number} The weighted rating.
 */
ContentAssessor.prototype.calculatePenaltyPointsPartialSupport = function (rating) {
	switch (rating) {
		case "bad":
			return 4;
		case "ok":
			return 2;
		default:
		case "good":
			return 0;
	}
};

/**
 * Determines whether a language is fully supported. If a language supports 8 content assessments
 * it is fully supported
 *
 * @returns {boolean} True if fully supported.
 */
ContentAssessor.prototype._allAssessmentsSupported = function () {
	const numberOfAssessments = 8;
	const applicableAssessments = this.getApplicableAssessments();
	return applicableAssessments.length === numberOfAssessments;
};

/**
 * Calculates the penalty points based on the assessment results.
 *
 * @returns {number} The total penalty points for the results.
 */
ContentAssessor.prototype.calculatePenaltyPoints = function () {
	const results = this.getValidResults();

	const penaltyPoints = (0, _lodashEs.map)(results, function (result) {
		const rating = (0, _scoreToRating2.default)(result.getScore());

		if (this._allAssessmentsSupported()) {
			return this.calculatePenaltyPointsFullSupport(rating);
		}

		return this.calculatePenaltyPointsPartialSupport(rating);
	}.bind(this));

	return (0, _lodashEs.sum)(penaltyPoints);
};

/**
 * Rates the penalty points
 *
 * @param {number} totalPenaltyPoints The amount of penalty points.
 * @returns {number} The score based on the amount of penalty points.
 *
 * @private
 */
ContentAssessor.prototype._ratePenaltyPoints = function (totalPenaltyPoints) {
	if (this.getValidResults().length === 1) {
		// If we have only 1 result, we only have a "no content" result
		return 30;
	}

	if (this._allAssessmentsSupported()) {
		// Determine the total score based on the total penalty points.
		if (totalPenaltyPoints > 6) {
			// A red indicator.
			return 30;
		}

		if (totalPenaltyPoints > 4) {
			// An orange indicator.
			return 60;
		}
	} else {
		if (totalPenaltyPoints > 4) {
			// A red indicator.
			return 30;
		}

		if (totalPenaltyPoints > 2) {
			// An orange indicator.
			return 60;
		}
	}
	// A green indicator.
	return 90;
};

/**
 * Calculates the overall score based on the assessment results.
 *
 * @returns {number} The overall score.
 */
ContentAssessor.prototype.calculateOverallScore = function () {
	const results = this.getValidResults();

	// If you have no content, you have a red indicator.
	if (results.length === 0) {
		return 30;
	}

	const totalPenaltyPoints = this.calculatePenaltyPoints();

	return this._ratePenaltyPoints(totalPenaltyPoints);
};

exports.default = ContentAssessor;
//# sourceMappingURL=contentAssessor.js.map
