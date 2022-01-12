"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper, researcher) {
	const topicForms = researcher.getResearch("morphology");
	const locale = paper.getLocale();

	let paragraphs = (0, _matchParagraphs2.default)(paper.getText());
	paragraphs = (0, _lodashEs.reject)(paragraphs, _lodashEs.isEmpty);
	paragraphs = (0, _lodashEs.reject)(paragraphs, paragraphHasNoText)[0] || "";

	const result = {
		foundInOneSentence: false,
		foundInParagraph: false,
		keyphraseOrSynonym: ""
	};

	const sentences = (0, _getSentences2.default)(paragraphs);
	// Use both keyphrase and synonyms to match topic words in the first paragraph.
	const useSynonyms = true;

	if (!(0, _lodashEs.isEmpty)(sentences)) {
		sentences.forEach(function (sentence) {
			const resultSentence = (0, _findKeywordFormsInString.findTopicFormsInString)(topicForms, sentence, useSynonyms, locale);
			if (resultSentence.percentWordMatches === 100) {
				result.foundInOneSentence = true;
				result.foundInParagraph = true;
				result.keyphraseOrSynonym = resultSentence.keyphraseOrSynonym;
				return result;
			}
		});

		const resultParagraph = (0, _findKeywordFormsInString.findTopicFormsInString)(topicForms, paragraphs, useSynonyms, locale);
		if (resultParagraph.percentWordMatches === 100) {
			result.foundInParagraph = true;
			result.keyphraseOrSynonym = resultParagraph.keyphraseOrSynonym;
			return result;
		}
	}

	return result;
};

var _matchParagraphs = require("../stringProcessing/matchParagraphs.js");

var _matchParagraphs2 = _interopRequireDefault(_matchParagraphs);

var _getSentences = require("../stringProcessing/getSentences.js");

var _getSentences2 = _interopRequireDefault(_getSentences);

var _findKeywordFormsInString = require("./findKeywordFormsInString.js");

var _imageInText = require("../stringProcessing/imageInText");

var _imageInText2 = _interopRequireDefault(_imageInText);

var _findEmptyDivisions = require("../stringProcessing/findEmptyDivisions");

var _findEmptyDivisions2 = _interopRequireDefault(_findEmptyDivisions);

var _getAnchorsFromText = require("../stringProcessing/getAnchorsFromText");

var _getAnchorsFromText2 = _interopRequireDefault(_getAnchorsFromText);

var _matchStringWithRegex = require("../stringProcessing/matchStringWithRegex");

var _matchStringWithRegex2 = _interopRequireDefault(_matchStringWithRegex);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removes links from text.
 *
 * @param {string} text The text string to analyze.
 *
 * @returns {string} The text with links stripped away.
 */
function removeLinksFromText(text) {
	const anchors = (0, _getAnchorsFromText2.default)(text);
	if (anchors.length > 0) {
		anchors.forEach(function (anchor) {
			text = text.replace(anchor, "");
		});
	}

	return text;
}

/**
 * Removes images from text.
 *
 * @param {string} text The text string to analyze.
 *
 * @returns {string} The text with images stripped away.
 */
/** @module analyses/findKeywordInFirstParagraph */

function removeImagesFromText(text) {
	const images = (0, _imageInText2.default)(text);
	const imageTags = (0, _matchStringWithRegex2.default)(text, "</img>");

	if (images.length > 0) {
		images.forEach(function (image) {
			text = text.replace(image, "");
		});

		imageTags.forEach(function (imageTag) {
			text = text.replace(imageTag, "");
		});
	}

	return text;
}

/**
 * Checks if the paragraph has no text.
 *
 * @param {string} text The text string to analyze.
 *
 * @returns {boolean} True if the paragraph has no text, false otherwise.
 */
function paragraphHasNoText(text) {
	// Strip links and check if paragraph consists of links only
	text = removeLinksFromText(text);
	if (text === "") {
		return true;
	}

	text = removeImagesFromText(text);
	if (text === "") {
		return true;
	}

	// Remove empty divisions from the text
	const emptyDivisions = (0, _findEmptyDivisions2.default)(text);
	if (emptyDivisions.length < 1) {
		return false;
	}

	emptyDivisions.forEach(function (emptyDivision) {
		text = text.replace(emptyDivision, "");
	});

	return text === "";
}

/**
 * Checks if the introductory paragraph contains keyphrase or synonyms.
 * First splits the first paragraph by sentences. Finds the first paragraph which contains sentences e.g., not an image).
 * (1) Tries to find all (content) words from the keyphrase or a synonym phrase within one sentence.
 * If found all words within one sentence, returns an object with foundInOneSentence = true and keyphraseOrSynonym = "keyphrase"
 * or "synonym".
 * If it did not find all words within one sentence, goes ahead with matching the keyphrase with the entire first paragraph.
 * (2) Tries to find all (content) words from the keyphrase or a synonym phrase within the paragraph.
 * If found all words within the paragraph, returns an object with foundInOneSentence = false, foundInParagraph = true,
 * and keyphraseOrSynonym = "keyphrase" or "synonym".
 * If found not all words within the paragraph of nothing at all, returns an object with foundInOneSentence = false,
 * foundInParagraph = false, and keyphraseOrSynonym = "".
 *
 * @param {Paper} paper The text to check for paragraphs.
 * @param {Researcher} researcher The researcher to use for analysis.
 *
 * @returns {Object} Whether the keyphrase words were found in one sentence, whether the keyphrase words were found in
 * the paragraph, whether a keyphrase or a synonym phrase was matched.
 */
//# sourceMappingURL=findKeywordInFirstParagraph.js.map
