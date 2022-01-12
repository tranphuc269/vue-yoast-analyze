"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = require("util");

var _IntroductionKeywordAssessment = require("./assessments/seo/IntroductionKeywordAssessment");

var _IntroductionKeywordAssessment2 = _interopRequireDefault(_IntroductionKeywordAssessment);

var _KeyphraseLengthAssessment = require("./assessments/seo/KeyphraseLengthAssessment");

var _KeyphraseLengthAssessment2 = _interopRequireDefault(_KeyphraseLengthAssessment);

var _KeywordDensityAssessment = require("./assessments/seo/KeywordDensityAssessment");

var _KeywordDensityAssessment2 = _interopRequireDefault(_KeywordDensityAssessment);

var _MetaDescriptionKeywordAssessment = require("./assessments/seo/MetaDescriptionKeywordAssessment");

var _MetaDescriptionKeywordAssessment2 = _interopRequireDefault(_MetaDescriptionKeywordAssessment);

var _assessor = require("./assessor");

var _assessor2 = _interopRequireDefault(_assessor);

var _FunctionWordsInKeyphraseAssessment = require("./assessments/seo/FunctionWordsInKeyphraseAssessment");

var _FunctionWordsInKeyphraseAssessment2 = _interopRequireDefault(_FunctionWordsInKeyphraseAssessment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates the Assessor used for taxonomy pages.
 *
 * @param {object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @constructor
 */
const RelatedKeywordTaxonomyAssessor = function RelatedKeywordTaxonomyAssessor(i18n, options) {
	_assessor2.default.call(this, i18n, options);
	this.type = "RelatedKeywordsTaxonomyAssessor";

	this._assessments = [new _IntroductionKeywordAssessment2.default(), new _KeyphraseLengthAssessment2.default({ isRelatedKeyphrase: true }), new _KeywordDensityAssessment2.default(), new _MetaDescriptionKeywordAssessment2.default(),
	// Text Images assessment here.
	new _FunctionWordsInKeyphraseAssessment2.default()];
};

(0, _util.inherits)(RelatedKeywordTaxonomyAssessor, _assessor2.default);

exports.default = RelatedKeywordTaxonomyAssessor;
//# sourceMappingURL=relatedKeywordTaxonomyAssessor.js.map
