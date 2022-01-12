"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sentences = require("./researches/sentences");

var _sentences2 = _interopRequireDefault(_sentences);

var _lodashEs = require("lodash-es");

var _invalidType = require("./errors/invalidType");

var _invalidType2 = _interopRequireDefault(_invalidType);

var _missingArgument = require("./errors/missingArgument");

var _missingArgument2 = _interopRequireDefault(_missingArgument);

var _wordCountInText = require("./researches/wordCountInText.js");

var _wordCountInText2 = _interopRequireDefault(_wordCountInText);

var _getLinkStatistics = require("./researches/getLinkStatistics.js");

var _getLinkStatistics2 = _interopRequireDefault(_getLinkStatistics);

var _countLinks = require("./researches/countLinks.js");

var _countLinks2 = _interopRequireDefault(_countLinks);

var _getLinks = require("./researches/getLinks.js");

var _getLinks2 = _interopRequireDefault(_getLinks);

var _urlIsTooLong = require("./researches/urlIsTooLong.js");

var _urlIsTooLong2 = _interopRequireDefault(_urlIsTooLong);

var _findKeywordInPageTitle = require("./researches/findKeywordInPageTitle.js");

var _findKeywordInPageTitle2 = _interopRequireDefault(_findKeywordInPageTitle);

var _matchKeywordInSubheadings = require("./researches/matchKeywordInSubheadings.js");

var _matchKeywordInSubheadings2 = _interopRequireDefault(_matchKeywordInSubheadings);

var _getKeywordDensity = require("./researches/getKeywordDensity.js");

var _getKeywordDensity2 = _interopRequireDefault(_getKeywordDensity);

var _keywordCount = require("./researches/keywordCount");

var _keywordCount2 = _interopRequireDefault(_keywordCount);

var _stopWordsInKeyword = require("./researches/stopWordsInKeyword");

var _stopWordsInKeyword2 = _interopRequireDefault(_stopWordsInKeyword);

var _stopWordsInUrl = require("./researches/stopWordsInUrl");

var _stopWordsInUrl2 = _interopRequireDefault(_stopWordsInUrl);

var _calculateFleschReading = require("./researches/calculateFleschReading.js");

var _calculateFleschReading2 = _interopRequireDefault(_calculateFleschReading);

var _metaDescriptionLength = require("./researches/metaDescriptionLength.js");

var _metaDescriptionLength2 = _interopRequireDefault(_metaDescriptionLength);

var _imageCountInText = require("./researches/imageCountInText.js");

var _imageCountInText2 = _interopRequireDefault(_imageCountInText);

var _imageAltTags = require("./researches/imageAltTags.js");

var _imageAltTags2 = _interopRequireDefault(_imageAltTags);

var _keyphraseLength = require("./researches/keyphraseLength");

var _keyphraseLength2 = _interopRequireDefault(_keyphraseLength);

var _metaDescriptionKeyword = require("./researches/metaDescriptionKeyword.js");

var _metaDescriptionKeyword2 = _interopRequireDefault(_metaDescriptionKeyword);

var _keywordCountInUrl = require("./researches/keywordCountInUrl");

var _keywordCountInUrl2 = _interopRequireDefault(_keywordCountInUrl);

var _findKeywordInFirstParagraph = require("./researches/findKeywordInFirstParagraph.js");

var _findKeywordInFirstParagraph2 = _interopRequireDefault(_findKeywordInFirstParagraph);

var _pageTitleWidth = require("./researches/pageTitleWidth.js");

var _pageTitleWidth2 = _interopRequireDefault(_pageTitleWidth);

var _getWordComplexity = require("./researches/getWordComplexity.js");

var _getWordComplexity2 = _interopRequireDefault(_getWordComplexity);

var _getParagraphLength = require("./researches/getParagraphLength.js");

var _getParagraphLength2 = _interopRequireDefault(_getParagraphLength);

var _countSentencesFromText = require("./researches/countSentencesFromText.js");

var _countSentencesFromText2 = _interopRequireDefault(_countSentencesFromText);

var _countSentencesFromDescription = require("./researches/countSentencesFromDescription.js");

var _countSentencesFromDescription2 = _interopRequireDefault(_countSentencesFromDescription);

var _getSubheadingTextLengths = require("./researches/getSubheadingTextLengths.js");

var _getSubheadingTextLengths2 = _interopRequireDefault(_getSubheadingTextLengths);

var _findTransitionWords = require("./researches/findTransitionWords.js");

var _findTransitionWords2 = _interopRequireDefault(_findTransitionWords);

var _getPassiveVoice = require("./researches/getPassiveVoice.js");

var _getPassiveVoice2 = _interopRequireDefault(_getPassiveVoice);

var _getSentenceBeginnings = require("./researches/getSentenceBeginnings.js");

var _getSentenceBeginnings2 = _interopRequireDefault(_getSentenceBeginnings);

var _relevantWords = require("./researches/relevantWords");

var _relevantWords2 = _interopRequireDefault(_relevantWords);

var _readingTime = require("./researches/readingTime");

var _readingTime2 = _interopRequireDefault(_readingTime);

var _getTopicDensity = require("./researches/getTopicDensity");

var _getTopicDensity2 = _interopRequireDefault(_getTopicDensity);

var _topicCount = require("./researches/topicCount");

var _topicCount2 = _interopRequireDefault(_topicCount);

var _keyphraseDistribution = require("./researches/keyphraseDistribution");

var _functionWordsInKeyphrase = require("./researches/functionWordsInKeyphrase");

var _functionWordsInKeyphrase2 = _interopRequireDefault(_functionWordsInKeyphrase);

var _h1s = require("./researches/h1s");

var _h1s2 = _interopRequireDefault(_h1s);

var _getProminentWordsForInsights = require("./researches/getProminentWordsForInsights");

var _getProminentWordsForInsights2 = _interopRequireDefault(_getProminentWordsForInsights);

var _getProminentWordsForInternalLinking = require("./researches/getProminentWordsForInternalLinking");

var _getProminentWordsForInternalLinking2 = _interopRequireDefault(_getProminentWordsForInternalLinking);

var _getWordForms = require("./researches/getWordForms");

var _getWordForms2 = _interopRequireDefault(_getWordForms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const keyphraseDistribution = _keyphraseDistribution.keyphraseDistributionResearcher;

// Researches


/**
 * This contains all possible, default researches.
 * @param {Paper} paper The Paper object that is needed within the researches.
 * @constructor
 * @throws {InvalidTypeError} Parameter needs to be an instance of the Paper object.
 */
var Researcher = function Researcher(paper) {
	this.setPaper(paper);

	this.defaultResearches = {
		urlLength: _urlIsTooLong2.default,
		wordCountInText: _wordCountInText2.default,
		findKeywordInPageTitle: _findKeywordInPageTitle2.default,
		calculateFleschReading: _calculateFleschReading2.default,
		getLinkStatistics: _getLinkStatistics2.default,
		getLinks: _getLinks2.default,
		linkCount: _countLinks2.default,
		imageCount: _imageCountInText2.default,
		altTagCount: _imageAltTags2.default,
		matchKeywordInSubheadings: _matchKeywordInSubheadings2.default,
		keywordCount: _keywordCount2.default,
		getKeywordDensity: _getKeywordDensity2.default,
		stopWordsInKeyword: _stopWordsInKeyword2.default,
		stopWordsInUrl: _stopWordsInUrl2.default,
		metaDescriptionLength: _metaDescriptionLength2.default,
		keyphraseLength: _keyphraseLength2.default,
		keywordCountInUrl: _keywordCountInUrl2.default,
		firstParagraph: _findKeywordInFirstParagraph2.default,
		metaDescriptionKeyword: _metaDescriptionKeyword2.default,
		pageTitleWidth: _pageTitleWidth2.default,
		wordComplexity: _getWordComplexity2.default,
		getParagraphLength: _getParagraphLength2.default,
		countSentencesFromText: _countSentencesFromText2.default,
		countSentencesFromDescription: _countSentencesFromDescription2.default,
		getSubheadingTextLengths: _getSubheadingTextLengths2.default,
		findTransitionWords: _findTransitionWords2.default,
		passiveVoice: _getPassiveVoice2.default,
		getSentenceBeginnings: _getSentenceBeginnings2.default,
		relevantWords: _relevantWords2.default,
		readingTime: _readingTime2.default,
		getTopicDensity: _getTopicDensity2.default,
		topicCount: _topicCount2.default,
		sentences: _sentences2.default,
		keyphraseDistribution: keyphraseDistribution,
		morphology: _getWordForms2.default,
		functionWordsInKeyphrase: _functionWordsInKeyphrase2.default,
		h1s: _h1s2.default,
		prominentWordsForInsights: _getProminentWordsForInsights2.default,
		prominentWordsForInternalLinking: _getProminentWordsForInternalLinking2.default
	};

	this._data = {};

	this.customResearches = {};
};

/**
 * Set the Paper associated with the Researcher.
 * @param {Paper} paper The Paper to use within the Researcher
 * @throws {InvalidTypeError} Parameter needs to be an instance of the Paper object.
 * @returns {void}
 */
Researcher.prototype.setPaper = function (paper) {
	this.paper = paper;
};

/**
 * Add a custom research that will be available within the Researcher.
 * @param {string} name A name to reference the research by.
 * @param {function} research The function to be added to the Researcher.
 * @throws {MissingArgument} Research name cannot be empty.
 * @throws {InvalidTypeError} The research requires a valid Function callback.
 * @returns {void}
 */
Researcher.prototype.addResearch = function (name, research) {
	if ((0, _lodashEs.isUndefined)(name) || (0, _lodashEs.isEmpty)(name)) {
		throw new _missingArgument2.default("Research name cannot be empty");
	}

	if (!(research instanceof Function)) {
		throw new _invalidType2.default("The research requires a Function callback.");
	}

	this.customResearches[name] = research;
};

/**
 * Check whether or not the research is known by the Researcher.
 * @param {string} name The name to reference the research by.
 * @returns {boolean} Whether or not the research is known by the Researcher
 */
Researcher.prototype.hasResearch = function (name) {
	return Object.keys(this.getAvailableResearches()).filter(function (research) {
		return research === name;
	}).length > 0;
};

/**
 * Return all available researches.
 * @returns {Object} An object containing all available researches.
 */
Researcher.prototype.getAvailableResearches = function () {
	return (0, _lodashEs.merge)(this.defaultResearches, this.customResearches);
};

/**
 * Return the Research by name.
 * @param {string} name The name to reference the research by.
 *
 * @returns {*} Returns the result of the research or false if research does not exist.
 * @throws {MissingArgument} Research name cannot be empty.
 */
Researcher.prototype.getResearch = function (name) {
	if ((0, _lodashEs.isUndefined)(name) || (0, _lodashEs.isEmpty)(name)) {
		throw new _missingArgument2.default("Research name cannot be empty");
	}

	if (!this.hasResearch(name)) {
		return false;
	}

	return this.getAvailableResearches()[name](this.paper, this);
};

/**
 * Add research data to the researcher by the research name.
 *
 * @param {string} research The identifier of the research.
 * @param {Object} data     The data object.
 *
 * @returns {void}.
 */
Researcher.prototype.addResearchData = function (research, data) {
	this._data[research] = data;
};

/**
 * Return the research data from a research data provider by research name.
 *
 * @param {string} research The identifier of the research.
 *
 * @returns {*} The data provided by the provider, false if the data do not exist
 */
Researcher.prototype.getData = function (research) {
	if (this._data.hasOwnProperty(research)) {
		return this._data[research];
	}

	return false;
};

exports.default = Researcher;
//# sourceMappingURL=researcher.js.map
