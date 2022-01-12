"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _flattenDeep = require("lodash-es/flattenDeep");

var _flattenDeep2 = _interopRequireDefault(_flattenDeep);

var _filterFunctionWordsFromArray = require("../helpers/filterFunctionWordsFromArray");

var _filterFunctionWordsFromArray2 = _interopRequireDefault(_filterFunctionWordsFromArray);

var _getBasicWordForms = require("../helpers/getBasicWordForms");

var _getBasicWordForms2 = _interopRequireDefault(_getBasicWordForms);

var _getLanguage = require("../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _retrieveStemmer = require("../helpers/retrieveStemmer");

var _retrieveStemmer2 = _interopRequireDefault(_retrieveStemmer);

var _getAlttagContent = require("../stringProcessing/getAlttagContent");

var _getAlttagContent2 = _interopRequireDefault(_getAlttagContent);

var _getWords = require("../stringProcessing/getWords");

var _getWords2 = _interopRequireDefault(_getWords);

var _imageInText = require("../stringProcessing/imageInText");

var _imageInText2 = _interopRequireDefault(_imageInText);

var _parseSlug = require("../stringProcessing/parseSlug");

var _parseSlug2 = _interopRequireDefault(_parseSlug);

var _quotes = require("../stringProcessing/quotes");

var _buildTopicStems = require("./buildTopicStems");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A stem with accompanying forms.
 *
 * @param {string}      stem    The word stem.
 * @param {string[]}    forms   The word forms for the stem.
 *
 * @constructor
 */
function StemWithForms(stem, forms) {
	this.stem = stem;
	this.forms = forms;
}

/**
 * A result for all topic forms.
 *
 * @param {string[]}    keyphraseForms  All keyphrase forms.
 * @param {Array<string[]>[]}    synonymsForms   All synonym forms.
 * @constructor
 */
function Result(keyphraseForms = [], synonymsForms = []) {
	this.keyphraseForms = keyphraseForms;
	this.synonymsForms = synonymsForms;
}

/**
 * Gets all words found in the text, title, slug and meta description of a given paper.
 *
 * @param {Paper} paper     The paper for which to get the words.
 * @param {string} language The language of the paper.
 *
 * @returns {string[]} All words found.
 */
function getAllWordsFromPaper(paper, language) {
	const paperText = paper.getText();
	const altTagsInText = (0, _imageInText2.default)(paperText).map(image => (0, _getAlttagContent2.default)(image));

	const paperContent = [paperText, paper.getTitle(), (0, _parseSlug2.default)(paper.getUrl()), paper.getDescription(), altTagsInText.join(" ")].join(" ");

	return (0, _getWords2.default)(paperContent).map(word => (0, _quotes.normalizeSingle)((0, _lodashEs.escapeRegExp)(word.toLocaleLowerCase(language))));
}

/**
 * Takes a stem-original pair and returns the accompanying forms for the stem that were found in the paper. Additionally
 * adds a sanitized version of the original word and (for specific languages) creates basic word forms.
 *
 * @param {StemOriginalPair}    stemOriginalPair            The stem-original pair for which to get forms.
 * @param {StemWithForms[]}     paperWordsGroupedByStems    All word forms in the paper grouped by stem.
 * @param {string}              language                    The language for which to get forms.
 *
 * @returns {string[]} All forms found in the paper for the given stem, plus a sanitized version of the original word.
 */
function replaceStemWithForms(stemOriginalPair, paperWordsGroupedByStems, language) {
	const matchingStemFormPair = paperWordsGroupedByStems.find(element => element.stem === stemOriginalPair.stem);
	const originalSanitized = (0, _quotes.normalizeSingle)((0, _lodashEs.escapeRegExp)(stemOriginalPair.original.toLocaleLowerCase(language)));

	const forms = matchingStemFormPair ? [originalSanitized, ...matchingStemFormPair.forms] : [originalSanitized];

	// Add extra forms for languages for which we have basic word form support.
	if (Object.keys((0, _getBasicWordForms2.default)()).includes(language)) {
		const createBasicWordForms = (0, _getBasicWordForms2.default)()[language];
		forms.push(...createBasicWordForms(stemOriginalPair.original));
	}

	/*
  * Return original and found or created forms.
  * Only return original if no matching forms were found in the text and no forms could be created.
  */
	return (0, _lodashEs.uniq)(forms);
}

/**
 * Extracts the stems from all keyphrase and synonym stems.
 *
 * @param {TopicPhrase}   keyphrase  A topic phrase.
 * @param {TopicPhrase[]} synonyms   An array of topic phrases.
 *
 * @returns {string[]} All word stems of they keyphrase and synonyms.
 */
function extractStems(keyphrase, synonyms) {
	const keyphraseStemsOnly = keyphrase.stemOriginalPairs.length === 0 ? [] : keyphrase.getStems();

	const synonymsStemsOnly = synonyms.length === 0 ? [] : synonyms.map(topicPhrase => topicPhrase.getStems());

	return [...keyphraseStemsOnly, ...(0, _flattenDeep2.default)(synonymsStemsOnly)];
}

/**
 * Constructs the result with forms for a topic phrase (i.e., a keyphrase or a synonym).
 *
 * @param {TopicPhrase}     topicPhrase                 The topic phrase for which to construct the result.
 * @param {StemWithForms[]} paperWordsGroupedByStems    All word forms in the paper grouped by stem.
 * @param {string}          language                    The language of the paper.
 *
 * @returns {Array.<string[]>} The word forms for a given topic phrase, grouped by original topic phrase word.
 */
function constructTopicPhraseResult(topicPhrase, paperWordsGroupedByStems, language) {
	// Empty result for an empty topic phrase.
	if (topicPhrase.stemOriginalPairs.length === 0) {
		return [];
	}

	if (topicPhrase.exactMatch) {
		return [[topicPhrase.stemOriginalPairs[0].stem]];
	}

	return topicPhrase.stemOriginalPairs.map(function (stemOriginalPair) {
		return replaceStemWithForms(stemOriginalPair, paperWordsGroupedByStems, language);
	});
}

/**
 * Gets all matching word forms for the stems of the keyphrase and synonyms. Stems are either colleced from
 * the paper or, for specific languages, directly created.
 *
 * @param {Paper}       paper       The paper to build keyphrase and synonym forms for.
 * @param {Researcher}  researcher  The researcher.
 *
 * @returns {Object} Object with an array of keyphrase forms and an array of arrays of synonyms forms, based on the forms
 * found in the text or created forms.
 */
function getWordForms(paper, researcher) {
	const language = (0, _getLanguage2.default)(paper.getLocale());
	const morphologyData = (0, _lodashEs.get)(researcher.getData("morphology"), language, false);
	const determineStem = (0, _retrieveStemmer2.default)(language, morphologyData);
	const topicPhrases = (0, _buildTopicStems.collectStems)(paper.getKeyword(), paper.getSynonyms(), language, morphologyData);
	const keyphrase = topicPhrases.keyphraseStems;
	const synonyms = topicPhrases.synonymsStems;

	// Return an empty result when no keyphrase and synonyms have been set.
	if (keyphrase.stemOriginalPairs.length === 0 && synonyms.length === 0) {
		return new Result();
	}

	// Return exact match if all topic phrases contain exact match. Forms don't need to be built in that case.
	const allTopicPhrases = [keyphrase, ...synonyms];

	if (allTopicPhrases.every(topicPhrase => topicPhrase.exactMatch === true)) {
		return new Result([[keyphrase.stemOriginalPairs[0].stem]], synonyms.map(synonym => [[synonym.stemOriginalPairs[0].stem]]));
	}

	// Get all stems from the keyphrase and synonyms.
	const topicStemsFlat = (0, _lodashEs.uniq)(extractStems(keyphrase, synonyms));

	// Get all words from the paper text, title, meta description and slug.
	let paperWords = getAllWordsFromPaper(paper, language);

	// Filter doubles and function words.
	paperWords = (0, _filterFunctionWordsFromArray2.default)((0, _lodashEs.uniq)(paperWords), language);

	// Add stems to words from the paper, filter out all forms that aren't in the keyphrase or synonyms and order alphabetically.
	const paperWordsWithStems = paperWords.map(word => new _buildTopicStems.StemOriginalPair(determineStem(word, morphologyData), word)).filter(stemOriginalPair => topicStemsFlat.includes(stemOriginalPair.stem)).sort((a, b) => a.stem.localeCompare(b.stem));

	// Group word-stem pairs from the paper by stems.
	const paperWordsGroupedByStems = paperWordsWithStems.reduce(function (accumulator, stemOriginalPair) {
		const lastItem = accumulator[accumulator.length - 1];

		if (accumulator.length === 0 || lastItem.stem !== stemOriginalPair.stem) {
			accumulator.push(new StemWithForms(stemOriginalPair.stem, [stemOriginalPair.original]));
		} else {
			lastItem.forms.push(stemOriginalPair.original);
		}

		return accumulator;
	}, []);

	return new Result(constructTopicPhraseResult(keyphrase, paperWordsGroupedByStems, language), synonyms.map(synonym => constructTopicPhraseResult(synonym, paperWordsGroupedByStems, language)));
}

exports.default = getWordForms;
//# sourceMappingURL=getWordForms.js.map
