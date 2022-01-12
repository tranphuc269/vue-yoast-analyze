"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = require("util");

var _assessor = require("../assessor.js");

var _assessor2 = _interopRequireDefault(_assessor);

var _IntroductionKeywordAssessment = require("../assessments/seo/IntroductionKeywordAssessment.js");

var _IntroductionKeywordAssessment2 = _interopRequireDefault(_IntroductionKeywordAssessment);

var _KeyphraseLengthAssessment = require("../assessments/seo/KeyphraseLengthAssessment.js");

var _KeyphraseLengthAssessment2 = _interopRequireDefault(_KeyphraseLengthAssessment);

var _KeywordDensityAssessment = require("../assessments/seo/KeywordDensityAssessment.js");

var _KeywordDensityAssessment2 = _interopRequireDefault(_KeywordDensityAssessment);

var _MetaDescriptionKeywordAssessment = require("../assessments/seo/MetaDescriptionKeywordAssessment.js");

var _MetaDescriptionKeywordAssessment2 = _interopRequireDefault(_MetaDescriptionKeywordAssessment);

var _TextImagesAssessment = require("../assessments/seo/TextImagesAssessment.js");

var _TextImagesAssessment2 = _interopRequireDefault(_TextImagesAssessment);

var _TextCompetingLinksAssessment = require("../assessments/seo/TextCompetingLinksAssessment.js");

var _TextCompetingLinksAssessment2 = _interopRequireDefault(_TextCompetingLinksAssessment);

var _FunctionWordsInKeyphraseAssessment = require("../assessments/seo/FunctionWordsInKeyphraseAssessment");

var _FunctionWordsInKeyphraseAssessment2 = _interopRequireDefault(_FunctionWordsInKeyphraseAssessment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates the Assessor
 *
 * @param {object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @param {Object} options.marker The marker to pass the list of marks to.
 *
 * @constructor
 */
const relatedKeywordAssessor = function relatedKeywordAssessor(i18n, options) {
	_assessor2.default.call(this, i18n, options);

	this._assessments = [new _IntroductionKeywordAssessment2.default(), new _KeyphraseLengthAssessment2.default(), new _KeywordDensityAssessment2.default(), new _MetaDescriptionKeywordAssessment2.default(), new _TextCompetingLinksAssessment2.default(), new _TextImagesAssessment2.default({
		scores: {
			noImages: 3,
			withAltNonKeyword: 3,
			withAlt: 3,
			noAlt: 3
		}
	}), new _FunctionWordsInKeyphraseAssessment2.default()];
};

(0, _util.inherits)(relatedKeywordAssessor, _assessor2.default);

exports.default = relatedKeywordAssessor;
//# sourceMappingURL=relatedKeywordAssessor.js.map
