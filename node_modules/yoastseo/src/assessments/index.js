"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.seo = exports.readability = undefined;

var _fleschReadingEaseAssessment = require("./readability/fleschReadingEaseAssessment");

var _fleschReadingEaseAssessment2 = _interopRequireDefault(_fleschReadingEaseAssessment);

var _paragraphTooLongAssessment = require("./readability/paragraphTooLongAssessment");

var _paragraphTooLongAssessment2 = _interopRequireDefault(_paragraphTooLongAssessment);

var _passiveVoiceAssessment = require("./readability/passiveVoiceAssessment");

var _passiveVoiceAssessment2 = _interopRequireDefault(_passiveVoiceAssessment);

var _sentenceBeginningsAssessment = require("./readability/sentenceBeginningsAssessment");

var _sentenceBeginningsAssessment2 = _interopRequireDefault(_sentenceBeginningsAssessment);

var _sentenceLengthInDescriptionAssessment = require("./readability/sentenceLengthInDescriptionAssessment");

var _sentenceLengthInDescriptionAssessment2 = _interopRequireDefault(_sentenceLengthInDescriptionAssessment);

var _sentenceLengthInTextAssessment = require("./readability/sentenceLengthInTextAssessment");

var _sentenceLengthInTextAssessment2 = _interopRequireDefault(_sentenceLengthInTextAssessment);

var _subheadingDistributionTooLongAssessment = require("./readability/subheadingDistributionTooLongAssessment");

var _subheadingDistributionTooLongAssessment2 = _interopRequireDefault(_subheadingDistributionTooLongAssessment);

var _textPresenceAssessment = require("./readability/textPresenceAssessment");

var _textPresenceAssessment2 = _interopRequireDefault(_textPresenceAssessment);

var _transitionWordsAssessment = require("./readability/transitionWordsAssessment");

var _transitionWordsAssessment2 = _interopRequireDefault(_transitionWordsAssessment);

var _wordComplexityAssessment = require("./readability/wordComplexityAssessment");

var _wordComplexityAssessment2 = _interopRequireDefault(_wordComplexityAssessment);

var _FunctionWordsInKeyphraseAssessment = require("./seo/FunctionWordsInKeyphraseAssessment");

var _FunctionWordsInKeyphraseAssessment2 = _interopRequireDefault(_FunctionWordsInKeyphraseAssessment);

var _InternalLinksAssessment = require("./seo/InternalLinksAssessment");

var _InternalLinksAssessment2 = _interopRequireDefault(_InternalLinksAssessment);

var _IntroductionKeywordAssessment = require("./seo/IntroductionKeywordAssessment");

var _IntroductionKeywordAssessment2 = _interopRequireDefault(_IntroductionKeywordAssessment);

var _KeyphraseDistributionAssessment = require("./seo/KeyphraseDistributionAssessment");

var _KeyphraseDistributionAssessment2 = _interopRequireDefault(_KeyphraseDistributionAssessment);

var _KeyphraseLengthAssessment = require("./seo/KeyphraseLengthAssessment");

var _KeyphraseLengthAssessment2 = _interopRequireDefault(_KeyphraseLengthAssessment);

var _KeywordDensityAssessment = require("./seo/KeywordDensityAssessment");

var _KeywordDensityAssessment2 = _interopRequireDefault(_KeywordDensityAssessment);

var _keywordStopWordsAssessment = require("./seo/keywordStopWordsAssessment");

var _keywordStopWordsAssessment2 = _interopRequireDefault(_keywordStopWordsAssessment);

var _MetaDescriptionKeywordAssessment = require("./seo/MetaDescriptionKeywordAssessment");

var _MetaDescriptionKeywordAssessment2 = _interopRequireDefault(_MetaDescriptionKeywordAssessment);

var _MetaDescriptionLengthAssessment = require("./seo/MetaDescriptionLengthAssessment");

var _MetaDescriptionLengthAssessment2 = _interopRequireDefault(_MetaDescriptionLengthAssessment);

var _OutboundLinksAssessment = require("./seo/OutboundLinksAssessment");

var _OutboundLinksAssessment2 = _interopRequireDefault(_OutboundLinksAssessment);

var _PageTitleWidthAssessment = require("./seo/PageTitleWidthAssessment");

var _PageTitleWidthAssessment2 = _interopRequireDefault(_PageTitleWidthAssessment);

var _SingleH1Assessment = require("./seo/SingleH1Assessment");

var _SingleH1Assessment2 = _interopRequireDefault(_SingleH1Assessment);

var _SubHeadingsKeywordAssessment = require("./seo/SubHeadingsKeywordAssessment");

var _SubHeadingsKeywordAssessment2 = _interopRequireDefault(_SubHeadingsKeywordAssessment);

var _taxonomyTextLengthAssessment = require("./seo/taxonomyTextLengthAssessment");

var _taxonomyTextLengthAssessment2 = _interopRequireDefault(_taxonomyTextLengthAssessment);

var _TextCompetingLinksAssessment = require("./seo/TextCompetingLinksAssessment");

var _TextCompetingLinksAssessment2 = _interopRequireDefault(_TextCompetingLinksAssessment);

var _TextImagesAssessment = require("./seo/TextImagesAssessment");

var _TextImagesAssessment2 = _interopRequireDefault(_TextImagesAssessment);

var _TextLengthAssessment = require("./seo/TextLengthAssessment");

var _TextLengthAssessment2 = _interopRequireDefault(_TextLengthAssessment);

var _TitleKeywordAssessment = require("./seo/TitleKeywordAssessment");

var _TitleKeywordAssessment2 = _interopRequireDefault(_TitleKeywordAssessment);

var _UrlKeywordAssessment = require("./seo/UrlKeywordAssessment");

var _UrlKeywordAssessment2 = _interopRequireDefault(_UrlKeywordAssessment);

var _UrlLengthAssessment = require("./seo/UrlLengthAssessment");

var _UrlLengthAssessment2 = _interopRequireDefault(_UrlLengthAssessment);

var _urlStopWordsAssessment = require("./seo/urlStopWordsAssessment");

var _urlStopWordsAssessment2 = _interopRequireDefault(_urlStopWordsAssessment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readability = {
	FleschReadingEaseAssessment: _fleschReadingEaseAssessment2.default,
	ParagraphTooLongAssessment: _paragraphTooLongAssessment2.default,
	PassiveVoiceAssessment: _passiveVoiceAssessment2.default,
	SentenceBeginningsAssessment: _sentenceBeginningsAssessment2.default,
	SentenceLengthInDescriptionAssessment: _sentenceLengthInDescriptionAssessment2.default,
	SentenceLengthInTextAssessment: _sentenceLengthInTextAssessment2.default,
	SubheadingDistributionTooLongAssessment: _subheadingDistributionTooLongAssessment2.default,
	TextPresenceAssessment: _textPresenceAssessment2.default,
	TransitionWordsAssessment: _transitionWordsAssessment2.default,
	WordComplexityAssessment: _wordComplexityAssessment2.default
};

const seo = {
	FunctionWordsInKeyphraseAssessment: _FunctionWordsInKeyphraseAssessment2.default,
	InternalLinksAssessment: _InternalLinksAssessment2.default,
	IntroductionKeywordAssessment: _IntroductionKeywordAssessment2.default,
	KeyphraseLengthAssessment: _KeyphraseLengthAssessment2.default,
	KeywordDensityAssessment: _KeywordDensityAssessment2.default,
	KeywordStopWordsAssessment: _keywordStopWordsAssessment2.default,
	KeyphraseDistributionAssessment: _KeyphraseDistributionAssessment2.default,
	MetaDescriptionKeywordAssessment: _MetaDescriptionKeywordAssessment2.default,
	MetaDescriptionLengthAssessment: _MetaDescriptionLengthAssessment2.default,
	OutboundLinksAssessment: _OutboundLinksAssessment2.default,
	PageTitleWidthAssessment: _PageTitleWidthAssessment2.default,
	SingleH1Assessment: _SingleH1Assessment2.default,
	SubheadingsKeywordAssessment: _SubHeadingsKeywordAssessment2.default,
	TaxonomyTextLengthAssessment: _taxonomyTextLengthAssessment2.default,
	TextCompetingLinksAssessment: _TextCompetingLinksAssessment2.default,
	TextImagesAssessment: _TextImagesAssessment2.default,
	TextLengthAssessment: _TextLengthAssessment2.default,
	TitleKeywordAssessment: _TitleKeywordAssessment2.default,
	UrlKeywordAssessment: _UrlKeywordAssessment2.default,
	UrlLengthAssessment: _UrlLengthAssessment2.default,
	UrlStopWordsAssessment: _urlStopWordsAssessment2.default
};

exports.readability = readability;
exports.seo = seo;
//# sourceMappingURL=index.js.map
