"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _getLanguage = require("../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _countWords = require("../stringProcessing/countWords");

var _countWords2 = _interopRequireDefault(_countWords);

var _determineProminentWords = require("../stringProcessing/determineProminentWords");

var _getSubheadings = require("../stringProcessing/getSubheadings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retrieves the prominent words from the given paper.
 *
 * @param {Paper}       paper       The paper to determine the prominent words of.
 * @param {Researcher}  researcher  The researcher to use for analysis.
 *
 * @returns {Object}          result                    A compound result object.
 * @returns {ProminentWord[]} result.prominentWords     Prominent words for this paper, filtered and sorted.
 * @returns {boolean}         result.hasMetaDescription Whether the metadescription is available in the input paper.
 * @returns {boolean}         result.hasTitle           Whether the title is available in the input paper.
 */
function getProminentWordsForInternalLinking(paper, researcher) {
	const text = paper.getText();
	const metadescription = paper.getDescription();
	const title = paper.getTitle();

	const result = {};
	result.hasMetaDescription = metadescription !== "";
	result.hasTitle = title !== "";
	result.prominentWords = [];

	/**
  * We only want to return suggestions (and spend time calculating prominent words) if the text is at least 100 words.
 	 */
	const textLength = (0, _countWords2.default)(text);
	if (textLength < 100) {
		return result;
	}

	const language = (0, _getLanguage2.default)(paper.getLocale());
	const morphologyData = (0, _lodashEs.get)(researcher.getData("morphology"), language, false);

	const subheadings = (0, _getSubheadings.getSubheadingsTopLevel)(text).map(subheading => subheading[2]);
	const attributes = [paper.getKeyword(), paper.getSynonyms(), title, metadescription, subheadings.join(" ")];

	const abbreviations = (0, _determineProminentWords.retrieveAbbreviations)(text.concat(attributes.join(" ")));

	const prominentWordsFromText = (0, _determineProminentWords.getProminentWords)((0, _getSubheadings.removeSubheadingsTopLevel)(text), abbreviations, language, morphologyData);

	const prominentWordsFromPaperAttributes = (0, _determineProminentWords.getProminentWordsFromPaperAttributes)(attributes, abbreviations, language, morphologyData);

	/*
  * If a word is used in any of the attributes, its weight is automatically high.
  * To make sure the word survives weight filters and gets saved in the database, make the number of occurrences times-3.
  */
	prominentWordsFromPaperAttributes.forEach(relevantWord => relevantWord.setOccurrences(relevantWord.getOccurrences() * 3));

	const collapsedWords = (0, _determineProminentWords.collapseProminentWordsOnStem)(prominentWordsFromPaperAttributes.concat(prominentWordsFromText));
	(0, _determineProminentWords.sortProminentWords)(collapsedWords);

	/*
  * If morphology data are available for a language, the minimum number of occurrences to consider a word to be prominent is 4.
  * This minimum number was chosen in order to avoid premature suggestions of words from the paper attributes.
  * These get a times-3 boost and would therefore be prominent with just 1 occurrence.
  *
  * If morphology data are not available, and therefore word forms are not recognized, the minimum threshold is lowered to 2.
  */
	let minimumNumberOfOccurrences = 4;

	if (!morphologyData) {
		minimumNumberOfOccurrences = 2;
	}

	/*
  * Return the 100 top items from the collapsed and sorted list. The number is picked deliberately to prevent larger
  * articles from getting too long of lists.
  */
	result.prominentWords = (0, _lodashEs.take)((0, _determineProminentWords.filterProminentWords)(collapsedWords, minimumNumberOfOccurrences), 100);

	return result;
}

exports.default = getProminentWordsForInternalLinking;
//# sourceMappingURL=getProminentWordsForInternalLinking.js.map
