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

var _TextCompetingLinksAssessment = require("./assessments/seo/TextCompetingLinksAssessment");

var _TextCompetingLinksAssessment2 = _interopRequireDefault(_TextCompetingLinksAssessment);

var _InternalLinksAssessment = require("./assessments/seo/InternalLinksAssessment");

var _InternalLinksAssessment2 = _interopRequireDefault(_InternalLinksAssessment);

var _TitleKeywordAssessment = require("./assessments/seo/TitleKeywordAssessment");

var _TitleKeywordAssessment2 = _interopRequireDefault(_TitleKeywordAssessment);

var _UrlKeywordAssessment = require("./assessments/seo/UrlKeywordAssessment");

var _UrlKeywordAssessment2 = _interopRequireDefault(_UrlKeywordAssessment);

var _assessor = require("./assessor");

var _assessor2 = _interopRequireDefault(_assessor);

var _MetaDescriptionLengthAssessment = require("./assessments/seo/MetaDescriptionLengthAssessment");

var _MetaDescriptionLengthAssessment2 = _interopRequireDefault(_MetaDescriptionLengthAssessment);

var _SubHeadingsKeywordAssessment = require("./assessments/seo/SubHeadingsKeywordAssessment");

var _SubHeadingsKeywordAssessment2 = _interopRequireDefault(_SubHeadingsKeywordAssessment);

var _TextImagesAssessment = require("./assessments/seo/TextImagesAssessment");

var _TextImagesAssessment2 = _interopRequireDefault(_TextImagesAssessment);

var _TextLengthAssessment = require("./assessments/seo/TextLengthAssessment");

var _TextLengthAssessment2 = _interopRequireDefault(_TextLengthAssessment);

var _OutboundLinksAssessment = require("./assessments/seo/OutboundLinksAssessment");

var _OutboundLinksAssessment2 = _interopRequireDefault(_OutboundLinksAssessment);

var _PageTitleWidthAssessment = require("./assessments/seo/PageTitleWidthAssessment");

var _PageTitleWidthAssessment2 = _interopRequireDefault(_PageTitleWidthAssessment);

var _FunctionWordsInKeyphraseAssessment = require("./assessments/seo/FunctionWordsInKeyphraseAssessment");

var _FunctionWordsInKeyphraseAssessment2 = _interopRequireDefault(_FunctionWordsInKeyphraseAssessment);

var _SingleH1Assessment = require("./assessments/seo/SingleH1Assessment");

var _SingleH1Assessment2 = _interopRequireDefault(_SingleH1Assessment);

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
const SEOAssessor = function SEOAssessor(i18n, options) {
	_assessor2.default.call(this, i18n, options);
	this.type = "SEOAssessor";

	this._assessments = [new _IntroductionKeywordAssessment2.default(), new _KeyphraseLengthAssessment2.default(), new _KeywordDensityAssessment2.default(), new _MetaDescriptionKeywordAssessment2.default(), new _MetaDescriptionLengthAssessment2.default(), new _SubHeadingsKeywordAssessment2.default(), new _TextCompetingLinksAssessment2.default(), new _TextImagesAssessment2.default(), new _TextLengthAssessment2.default(), new _OutboundLinksAssessment2.default(), new _TitleKeywordAssessment2.default(), new _InternalLinksAssessment2.default(), new _PageTitleWidthAssessment2.default(), new _UrlKeywordAssessment2.default(), new _FunctionWordsInKeyphraseAssessment2.default(), new _SingleH1Assessment2.default()];
};

(0, _util.inherits)(SEOAssessor, _assessor2.default);

exports.default = SEOAssessor;
//# sourceMappingURL=seoAssessor.js.map
