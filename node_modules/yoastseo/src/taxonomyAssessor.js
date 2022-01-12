"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTextLengthAssessment = undefined;

var _util = require("util");

var _IntroductionKeywordAssessment = require("./assessments/seo/IntroductionKeywordAssessment");

var _IntroductionKeywordAssessment2 = _interopRequireDefault(_IntroductionKeywordAssessment);

var _KeyphraseLengthAssessment = require("./assessments/seo/KeyphraseLengthAssessment");

var _KeyphraseLengthAssessment2 = _interopRequireDefault(_KeyphraseLengthAssessment);

var _KeywordDensityAssessment = require("./assessments/seo/KeywordDensityAssessment");

var _KeywordDensityAssessment2 = _interopRequireDefault(_KeywordDensityAssessment);

var _MetaDescriptionKeywordAssessment = require("./assessments/seo/MetaDescriptionKeywordAssessment");

var _MetaDescriptionKeywordAssessment2 = _interopRequireDefault(_MetaDescriptionKeywordAssessment);

var _TitleKeywordAssessment = require("./assessments/seo/TitleKeywordAssessment");

var _TitleKeywordAssessment2 = _interopRequireDefault(_TitleKeywordAssessment);

var _UrlKeywordAssessment = require("./assessments/seo/UrlKeywordAssessment");

var _UrlKeywordAssessment2 = _interopRequireDefault(_UrlKeywordAssessment);

var _assessor = require("./assessor");

var _assessor2 = _interopRequireDefault(_assessor);

var _MetaDescriptionLengthAssessment = require("./assessments/seo/MetaDescriptionLengthAssessment");

var _MetaDescriptionLengthAssessment2 = _interopRequireDefault(_MetaDescriptionLengthAssessment);

var _TextLengthAssessment = require("./assessments/seo/TextLengthAssessment");

var _TextLengthAssessment2 = _interopRequireDefault(_TextLengthAssessment);

var _PageTitleWidthAssessment = require("./assessments/seo/PageTitleWidthAssessment");

var _PageTitleWidthAssessment2 = _interopRequireDefault(_PageTitleWidthAssessment);

var _FunctionWordsInKeyphraseAssessment = require("./assessments/seo/FunctionWordsInKeyphraseAssessment");

var _FunctionWordsInKeyphraseAssessment2 = _interopRequireDefault(_FunctionWordsInKeyphraseAssessment);

var _SingleH1Assessment = require("./assessments/seo/SingleH1Assessment");

var _SingleH1Assessment2 = _interopRequireDefault(_SingleH1Assessment);

var _shortlinker = require("./helpers/shortlinker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the text length assessment to use.
 *
 * @returns {TextLengthAssessment} The text length assessment (with taxonomy configuration) to use.
 */
const getTextLengthAssessment = exports.getTextLengthAssessment = function getTextLengthAssessment() {
	// Export so it can be used in tests.
	return new _TextLengthAssessment2.default({
		recommendedMinimum: 250,
		slightlyBelowMinimum: 200,
		belowMinimum: 100,
		veryFarBelowMinimum: 50,
		urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34j"),
		urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34k")
	});
};

/**
 * Creates the Assessor used for taxonomy pages.
 *
 * @param {object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @constructor
 */
const TaxonomyAssessor = function TaxonomyAssessor(i18n, options) {
	_assessor2.default.call(this, i18n, options);
	this.type = "TaxonomyAssessor";

	this._assessments = [new _IntroductionKeywordAssessment2.default(), new _KeyphraseLengthAssessment2.default(), new _KeywordDensityAssessment2.default(), new _MetaDescriptionKeywordAssessment2.default(), new _MetaDescriptionLengthAssessment2.default(), getTextLengthAssessment(), new _TitleKeywordAssessment2.default(), new _PageTitleWidthAssessment2.default(), new _UrlKeywordAssessment2.default(), new _FunctionWordsInKeyphraseAssessment2.default(), new _SingleH1Assessment2.default()];
};

(0, _util.inherits)(TaxonomyAssessor, _assessor2.default);

exports.default = TaxonomyAssessor;
//# sourceMappingURL=taxonomyAssessor.js.map
