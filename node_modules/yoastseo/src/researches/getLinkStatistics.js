"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _filterFunctionWordsFromArray = require("../helpers/filterFunctionWordsFromArray");

var _filterFunctionWordsFromArray2 = _interopRequireDefault(_filterFunctionWordsFromArray);

var _getLanguage = require("../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _checkNofollow = require("../stringProcessing/checkNofollow.js");

var _checkNofollow2 = _interopRequireDefault(_checkNofollow);

var _getWords = require("../stringProcessing/getWords");

var _getWords2 = _interopRequireDefault(_getWords);

var _findKeywordInUrl = require("../stringProcessing/findKeywordInUrl.js");

var _findKeywordInUrl2 = _interopRequireDefault(_findKeywordInUrl);

var _getAnchorsFromText = require("../stringProcessing/getAnchorsFromText.js");

var _getAnchorsFromText2 = _interopRequireDefault(_getAnchorsFromText);

var _getLinkType = require("../stringProcessing/getLinkType.js");

var _getLinkType2 = _interopRequireDefault(_getLinkType);

var _matchTextWithArray = require("../stringProcessing/matchTextWithArray");

var _matchTextWithArray2 = _interopRequireDefault(_matchTextWithArray);

var _url = require("../stringProcessing/url.js");

var _url2 = _interopRequireDefault(_url);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks whether the link is pointing at itself.
 * @param {string} anchor The link anchor.
 * @param {string} permalink The permalink of the paper.
 *
 * @returns {boolean} Whether the anchor is pointing at itself.
 */
const linkToSelf = function linkToSelf(anchor, permalink) {
	const anchorLink = _url2.default.getFromAnchorTag(anchor);

	return _url2.default.areEqual(anchorLink, permalink);
};

/**
 * Filters anchors that are not pointing at itself.
 * @param {Array} anchors An array with all anchors from the paper
 * @param {string} permalink The permalink of the paper.
 *
 * @returns {Array} The array of all anchors that are not pointing at the paper itself.
 */
/** @module analyses/getLinkStatistics */

const filterAnchorsLinkingToSelf = function filterAnchorsLinkingToSelf(anchors, permalink) {
	const anchorsLinkingToSelf = anchors.map(function (anchor) {
		return linkToSelf(anchor, permalink);
	});

	anchors = anchors.filter(function (anchor, index) {
		return anchorsLinkingToSelf[index] === false;
	});

	return anchors;
};

/**
 * Filters anchors that contain keyphrase or synonyms.
 * @param {Array} anchors An array with all anchors from the paper
 * @param {Object} topicForms The object with topicForms.
 * @param {string} locale The locale of the paper
 *
 * @returns {Array} The array of all anchors that contain keyphrase or synonyms.
 */
const filterAnchorsContainingTopic = function filterAnchorsContainingTopic(anchors, topicForms, locale) {
	const anchorsContainingKeyphraseOrSynonyms = anchors.map(function (anchor) {
		return (0, _findKeywordInUrl2.default)(anchor, topicForms, locale);
	});
	anchors = anchors.filter(function (anchor, index) {
		return anchorsContainingKeyphraseOrSynonyms[index] === true;
	});

	return anchors;
};

/**
 * Filters anchors that are contained within keyphrase or synonyms.
 * @param {Array}  anchors    An array with all anchors from the paper.
 * @param {Object} topicForms An object containing word forms of words included in the keyphrase or a synonym.
 * @param {string} locale     The locale of the paper.
 *
 * @returns {Array} The array of all anchors contained in the keyphrase or synonyms.
 */
const filterAnchorsContainedInTopic = function filterAnchorsContainedInTopic(anchors, topicForms, locale) {
	// Prepare keyphrase and synonym forms for comparison with anchors.
	const keyphraseAndSynonymsWords = [(0, _lodashEs.flatten)(topicForms.keyphraseForms)];
	const synonymsForms = topicForms.synonymsForms;
	for (let i = 0; i < synonymsForms.length; i++) {
		keyphraseAndSynonymsWords.push((0, _lodashEs.flatten)(synonymsForms[i]));
	}

	const language = (0, _getLanguage2.default)(locale);
	const anchorsContainedInTopic = [];

	anchors.forEach(function (currentAnchor) {
		// Get single words from the anchor.
		let anchorWords = (0, _lodashEs.uniq)((0, _getWords2.default)(currentAnchor));

		// Filter function words out of the anchor text.
		anchorWords = (0, _filterFunctionWordsFromArray2.default)(anchorWords, language);

		// Check if anchorWords are contained in the topic phrase words
		for (let i = 0; i < keyphraseAndSynonymsWords.length; i++) {
			if (anchorWords.every(anchorWord => (0, _matchTextWithArray2.default)(anchorWord, keyphraseAndSynonymsWords[i], locale).count > 0)) {
				anchorsContainedInTopic.push(true);
				break;
			}
		}
	});

	anchors = anchors.filter(function (anchor, index) {
		return anchorsContainedInTopic[index] === true;
	});

	return anchors;
};

/**
 * Checks whether or not an anchor contains the passed keyword.
 * @param {Paper} paper The paper to research.
 * @param {Researcher} researcher The researcher to use.
 * @param {Array} anchors The array of anchors of the links found in the paper.
 * @param {string} permalink The string with a permalink of the paper.
 *
 * @returns {Object} How many anchors contained the keyphrase or synonyms, what are these anchors
 */
const keywordInAnchor = function keywordInAnchor(paper, researcher, anchors, permalink) {
	const result = { totalKeyword: 0, matchedAnchors: [] };

	const keyword = paper.getKeyword();

	// If no keyword is set, return empty result.
	if (keyword === "") {
		return result;
	}

	// Filter out anchors that point at the paper itself.
	anchors = filterAnchorsLinkingToSelf(anchors, permalink);
	if (anchors.length === 0) {
		return result;
	}

	const locale = paper.getLocale();
	const topicForms = researcher.getResearch("morphology");

	// Check if any anchors contain keyphrase or synonyms in them.
	anchors = filterAnchorsContainingTopic(anchors, topicForms, locale);
	if (anchors.length === 0) {
		return result;
	}

	// Check if content words from the anchors are all within the keyphrase or the synonyms.
	anchors = filterAnchorsContainedInTopic(anchors, topicForms, locale);
	result.totalKeyword = anchors.length;
	result.matchedAnchors = anchors;

	return result;
};

/**
 * Counts the links found in the text.
 *
 * @param {Paper} paper The paper object containing text, keyword and url.
 * @param {Researcher} researcher The researcher to use for the paper.
 *
 * @returns {object} The object containing all linktypes.
 * total: the total number of links found.
 * totalNaKeyword: the total number of links if keyword is not available.
 * keyword: Object containing all the keyword related counts and matches.
 * keyword.totalKeyword: the total number of links with the keyword.
 * keyword.matchedAnchors: Array with the anchors that contain the keyword.
 * internalTotal: the total number of links that are internal.
 * internalDofollow: the internal links without a nofollow attribute.
 * internalNofollow: the internal links with a nofollow attribute.
 * externalTotal: the total number of links that are external.
 * externalDofollow: the external links without a nofollow attribute.
 * externalNofollow: the internal links with a dofollow attribute.
 * otherTotal: all links that are not HTTP or HTTPS.
 * otherDofollow: other links without a nofollow attribute.
 * otherNofollow: other links with a nofollow attribute.
 */
const countLinkTypes = function countLinkTypes(paper, researcher) {
	const anchors = (0, _getAnchorsFromText2.default)(paper.getText());
	const permalink = paper.getPermalink();

	const linkCount = {
		total: anchors.length,
		totalNaKeyword: 0,
		keyword: {
			totalKeyword: 0,
			matchedAnchors: []
		},
		internalTotal: 0,
		internalDofollow: 0,
		internalNofollow: 0,
		externalTotal: 0,
		externalDofollow: 0,
		externalNofollow: 0,
		otherTotal: 0,
		otherDofollow: 0,
		otherNofollow: 0
	};

	for (let i = 0; i < anchors.length; i++) {
		const currentAnchor = anchors[i];

		const linkType = (0, _getLinkType2.default)(currentAnchor, permalink);
		const linkFollow = (0, _checkNofollow2.default)(currentAnchor);

		linkCount[linkType + "Total"]++;
		linkCount[linkType + linkFollow]++;
	}

	const keywordInAnchors = keywordInAnchor(paper, researcher, anchors, permalink);
	linkCount.keyword.totalKeyword = keywordInAnchors.totalKeyword;
	linkCount.keyword.matchedAnchors = keywordInAnchors.matchedAnchors;

	return linkCount;
};

exports.default = countLinkTypes;
//# sourceMappingURL=getLinkStatistics.js.map
