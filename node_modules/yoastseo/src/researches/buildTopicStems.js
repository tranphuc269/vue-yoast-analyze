"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StemOriginalPair = exports.TopicPhrase = exports.collectStems = exports.buildStems = undefined;

var _filterFunctionWordsFromArray = require("../helpers/filterFunctionWordsFromArray.js");

var _filterFunctionWordsFromArray2 = _interopRequireDefault(_filterFunctionWordsFromArray);

var _retrieveStemmer = require("../helpers/retrieveStemmer.js");

var _retrieveStemmer2 = _interopRequireDefault(_retrieveStemmer);

var _getWords = require("../stringProcessing/getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

var _parseSynonyms = require("../stringProcessing/parseSynonyms");

var _parseSynonyms2 = _interopRequireDefault(_parseSynonyms);

var _quotes = require("../stringProcessing/quotes");

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A topic phrase (i.e., a keyphrase or synonym) with stem-original pairs for the words in the topic phrase.
 *
 * @param {StemOriginalPair[]} stemOriginalPairs   The stem-original pairs for the words in the topic phrase.
 * @param {boolean}            exactMatch          Whether the topic phrase is an exact match.
 *
 * @constructor
 */
function TopicPhrase(stemOriginalPairs = [], exactMatch = false) {
  this.stemOriginalPairs = stemOriginalPairs;
  this.exactMatch = exactMatch;
}

/**
 * Returns all stems in the topic phrase.
 *
 * @returns {string[]|[]} The stems in the topic phrase or empty array if the topic phrase is exact match.
 */
TopicPhrase.prototype.getStems = function () {
  // An exact match keyphrase doesn't have stems.
  if (this.exactMatch) {
    return [];
  }

  return this.stemOriginalPairs.map(stemOriginalPair => stemOriginalPair.stem);
};

/**
 * A stem-original pair ƒor a word in a topic phrase.
 *
 * @param {string}  stem        The stem of the topic phrase word.
 * @param {string}  original    The original word form the topic phrase (unsanitized)
 *
 * @constructor
 */
function StemOriginalPair(stem, original) {
  this.stem = stem;
  this.original = original;
}

/**
 * Analyzes the focus keyword string or one synonym phrase.
 * Checks if morphology is requested or if the user wants to match exact string.
 * If morphology is required the module finds a stem for all words (if no function words list available) or
 * for all content words (i.e., excluding prepositions, articles, conjunctions, if the function words list is available).
 *
 * @param {string} keyphrase The keyphrase of the paper (or a synonym phrase) to get stem for.
 * @param {string} language The language to use for morphological analyzer and for function words.
 * @param {Object} morphologyData The available morphology data per language (false if unavailable).
 *
 * @returns {TopicPhrase} Object with an array of StemOriginalPairs of all (content) words in the keyphrase or synonym
 * phrase and information about whether the keyphrase/synonym should be matched exactly.
 */
const buildStems = function buildStems(keyphrase, language, morphologyData) {
  if ((0, _lodashEs.isUndefined)(keyphrase) || keyphrase === "") {
    return new TopicPhrase();
  }

  // If the keyphrase is embedded in double quotation marks, return keyword itself, without outer-most quotation marks.
  const doubleQuotes = ["“", "”", "〝", "〞", "〟", "‟", "„", "\""];
  if ((0, _lodashEs.includes)(doubleQuotes, keyphrase[0]) && (0, _lodashEs.includes)(doubleQuotes, keyphrase[keyphrase.length - 1])) {
    keyphrase = keyphrase.substring(1, keyphrase.length - 1);
    return new TopicPhrase([new StemOriginalPair((0, _lodashEs.escapeRegExp)(keyphrase), keyphrase)], true);
  }

  const words = (0, _filterFunctionWordsFromArray2.default)((0, _getWords2.default)(keyphrase), language);

  /**
   * Extract a stemming function (if available, and if there is morphologyData available for this language).
   * Otherwise, take an identity function.
   */
  const getStem = (0, _retrieveStemmer2.default)(language, morphologyData);

  const stemOriginalPairs = words.map(word => {
    const lowCaseWord = (0, _lodashEs.escapeRegExp)(word.toLocaleLowerCase(language));
    return new StemOriginalPair(getStem((0, _quotes.normalizeSingle)(lowCaseWord), morphologyData), word);
  });

  return new TopicPhrase(stemOriginalPairs);
};

/**
 * Builds stems of words of the keyphrase and of each synonym phrase.
 *
 * @param {string} keyphrase The paper's keyphrase.
 * @param {string} synonyms The paper's synonyms.
 * @param {string} language The paper's language.
 * @param {Object} morphologyData The available morphology data to be used by the getStem function (language specific).
 *
 * @returns {Object} Object with an array of stems of words in the keyphrase and an array of arrays of stems of words in the synonyms.
 */
const collectKeyphraseAndSynonymsStems = function collectKeyphraseAndSynonymsStems(keyphrase, synonyms, language = "en", morphologyData) {
  const synonymsSplit = (0, _parseSynonyms2.default)(synonyms);

  const keyphraseStems = buildStems(keyphrase, language, morphologyData);
  const synonymsStems = synonymsSplit.map(synonym => buildStems(synonym, language, morphologyData));

  return {
    keyphraseStems,
    synonymsStems
  };
};

/**
 * Caches stems depending on the currently available morphologyData and (separately) keyphrase, synonyms,
 * and language. In this way, if the morphologyData remains the same in multiple calls of this function, the function
 * that collects actual stems only needs to check if the keyphrase, synonyms and language also remain the
 * same to return the cached result. The joining of keyphrase, synonyms and language for this function is needed,
 * because by default memoize caches by the first key only, which in the current case would mean that the function would
 * return the cached forms if the keyphrase has not changed (without checking if synonyms and language were changed).
 *
 * @param {Object|boolean} morphologyData The available morphology data.
 *
 * @returns {function} The function that collects the stems for a given set of keyphrase, synonyms, language and
 * morphologyData.
 */
const primeMorphologyData = (0, _lodashEs.memoize)(morphologyData => {
  return (0, _lodashEs.memoize)((keyphrase, synonyms, language = "en") => {
    return collectKeyphraseAndSynonymsStems(keyphrase, synonyms, language, morphologyData);
  }, (keyphrase, synonyms, language) => {
    return keyphrase + "," + synonyms + "," + language;
  });
});

/**
 * Retrieves stems of words of the keyphrase and of each synonym phrase using the function that caches
 * the results of previous calls of this function.
 *
 * @param {string} keyphrase The paper's keyphrase.
 * @param {string} synonyms The paper's synonyms.
 * @param {string} language The paper's language.
 * @param {Object} morphologyData The available morphology data to be used by the getStems function (language specific).
 *
 * @returns {Object} Object with an array of stems of words in the keyphrase and an array of arrays of stems of words in the synonyms.
 */
function collectStems(keyphrase, synonyms, language = "en", morphologyData) {
  const collectStemsWithMorphologyData = primeMorphologyData(morphologyData);

  return collectStemsWithMorphologyData(keyphrase, synonyms, language);
}

exports.buildStems = buildStems;
exports.collectStems = collectStems;
exports.TopicPhrase = TopicPhrase;
exports.StemOriginalPair = StemOriginalPair;
//# sourceMappingURL=buildTopicStems.js.map
