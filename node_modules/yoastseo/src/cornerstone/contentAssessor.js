"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assessor = require("../assessor.js");

var _assessor2 = _interopRequireDefault(_assessor);

var _contentAssessor = require("../contentAssessor");

var _contentAssessor2 = _interopRequireDefault(_contentAssessor);

var _fleschReadingEaseAssessment = require("../assessments/readability/fleschReadingEaseAssessment.js");

var _fleschReadingEaseAssessment2 = _interopRequireDefault(_fleschReadingEaseAssessment);

var _paragraphTooLongAssessment = require("../assessments/readability/paragraphTooLongAssessment.js");

var _paragraphTooLongAssessment2 = _interopRequireDefault(_paragraphTooLongAssessment);

var _sentenceLengthInTextAssessment = require("../assessments/readability/sentenceLengthInTextAssessment.js");

var _sentenceLengthInTextAssessment2 = _interopRequireDefault(_sentenceLengthInTextAssessment);

var _subheadingDistributionTooLongAssessment = require("../assessments/readability/subheadingDistributionTooLongAssessment.js");

var _subheadingDistributionTooLongAssessment2 = _interopRequireDefault(_subheadingDistributionTooLongAssessment);

var _transitionWordsAssessment = require("../assessments/readability/transitionWordsAssessment.js");

var _transitionWordsAssessment2 = _interopRequireDefault(_transitionWordsAssessment);

var _passiveVoiceAssessment = require("../assessments/readability/passiveVoiceAssessment.js");

var _passiveVoiceAssessment2 = _interopRequireDefault(_passiveVoiceAssessment);

var _sentenceBeginningsAssessment = require("../assessments/readability/sentenceBeginningsAssessment.js");

var _sentenceBeginningsAssessment2 = _interopRequireDefault(_sentenceBeginningsAssessment);

var _textPresenceAssessment = require("../assessments/readability/textPresenceAssessment.js");

var _textPresenceAssessment2 = _interopRequireDefault(_textPresenceAssessment);

var _combinedConfig = require("./../config/content/combinedConfig.js");

var _combinedConfig2 = _interopRequireDefault(_combinedConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Temporarily disabled:

 var wordComplexity = require( "./assessments/readability/wordComplexityAssessment.js" );
 var sentenceLengthInDescription = require( "./assessments/readability/sentenceLengthInDescriptionAssessment.js" );
 */

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
const CornerStoneContentAssessor = function CornerStoneContentAssessor(i18n, options = {}) {
	_assessor2.default.call(this, i18n, options);
	this.type = "CornerstoneContentAssessor";
	const locale = options.hasOwnProperty("locale") ? options.locale : "en_US";

	this._assessments = [new _fleschReadingEaseAssessment2.default((0, _combinedConfig2.default)(locale).fleschReading), new _subheadingDistributionTooLongAssessment2.default({
		parameters: {
			slightlyTooMany: 250,
			farTooMany: 300,
			recommendedMaximumWordCount: 250
		}
	}), _paragraphTooLongAssessment2.default, new _sentenceLengthInTextAssessment2.default({
		recommendedWordCount: (0, _combinedConfig2.default)(locale).sentenceLength.recommendedWordCount,
		slightlyTooMany: 20,
		farTooMany: 25
	}), _transitionWordsAssessment2.default, _passiveVoiceAssessment2.default, _textPresenceAssessment2.default, _sentenceBeginningsAssessment2.default];
};

require("util").inherits(CornerStoneContentAssessor, _contentAssessor2.default);

exports.default = CornerStoneContentAssessor;
//# sourceMappingURL=contentAssessor.js.map
