"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

var _exceptionListHelpers = require("../morphoHelpers/exceptionListHelpers");

var _stemHelpers = require("../morphoHelpers/stemHelpers");

var _detectAndStemSuffixes = require("./detectAndStemSuffixes");

var _detectAndStemSuffixes2 = _interopRequireDefault(_detectAndStemSuffixes);

var _getStemWordsWithTAndDEnding = require("./getStemWordsWithTAndDEnding.js");

var _checkExceptionsWithFullForms = require("../morphoHelpers/checkExceptionsWithFullForms");

var _checkExceptionsWithFullForms2 = _interopRequireDefault(_checkExceptionsWithFullForms);

var _detectAndStemRegularParticiple = require("./detectAndStemRegularParticiple");

var _stemModificationHelpers = require("./stemModificationHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the stem from noun diminutives and plurals exceptions.
 *
 * @param {Object}    morphologyDataNL The data for stemming exception.
 * @param {string}      word                                The word to check.
 *
 * @returns {string} The stemmed word.
 */
const removeSuffixFromFullForms = function removeSuffixFromFullForms(morphologyDataNL, word) {
	/*
  * Checks whether the word is in the exception list of words ending in -er and gets either -e or -s suffix
  * If it is, remove the corresponding suffix.
  * e.g. lekkere -> lekker, bitters -> bitter
 */
	for (const exceptionClass of morphologyDataNL.stemExceptions.removeSuffixesFromFullForms) {
		const stemmedWord = (0, _stemHelpers.removeSuffixesFromFullForm)(exceptionClass.forms, exceptionClass.suffixes, word);
		if (stemmedWord) {
			return stemmedWord;
		}
	}
	/*
  * Checks whether the word is in one of the exception lists of nouns
  * for which a specific suffix needs to be stemmed (e.g. -s, -es, -eren, -er etc.)
  * e.g. kuddes -> kud, modes -> mod, revenuen -> revenu
  */
	for (const exceptionClass of morphologyDataNL.stemExceptions.removeSuffixFromFullForms) {
		const stemmedWord = (0, _stemHelpers.removeSuffixFromFullForm)(exceptionClass.forms, exceptionClass.suffix, word);
		if (stemmedWord) {
			return stemmedWord;
		}
	}
};

/**
 * Checks if the word is on a stemming exception list.
 *
 * @param {string} word The word to check.
 * @param {Object} morphologyDataNL The Dutch morphology data file.
 * @returns {string|null} The stem or null if the word was not matched by any of the exception checks.
 */
const checkOtherStemmingExceptions = function checkOtherStemmingExceptions(word, morphologyDataNL) {
	/*
  * Checks whether the word is in the exception list of nouns or adjectives with specific suffixes that needs to be stemmed.
  * If it is return the stem here and run possible stem modification if it is required. e.g. modes -> mod -> mood
  */
	let stemFromFullForm = removeSuffixFromFullForms(morphologyDataNL, word);
	if (stemFromFullForm) {
		if ((0, _stemModificationHelpers.isVowelDoublingAllowed)(stemFromFullForm, morphologyDataNL.regularStemmer.stemModifications.exceptionsStemModifications, morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes)) {
			stemFromFullForm = (0, _stemModificationHelpers.modifyStem)(stemFromFullForm, morphologyDataNL.regularStemmer.stemModifications.doubleVowel);
			return (0, _stemModificationHelpers.modifyStem)(stemFromFullForm, morphologyDataNL.regularStemmer.stemModifications.finalChanges);
		}
		return (0, _stemModificationHelpers.modifyStem)(stemFromFullForm, morphologyDataNL.regularStemmer.stemModifications.finalChanges);
	}
	return null;
};

/**
 * Stems Dutch words.
 *
 * @param {string} word  The word to stem.
 * @param {Object} morphologyDataNL The Dutch morphology data file.
 *
 * @returns {string} The stemmed word.
 */
function stem(word, morphologyDataNL) {
	// Check whether the word is in the list of words with full forms for which we define the stem. If it is, return the canonical stem.
	let stemmedWord = (0, _checkExceptionsWithFullForms2.default)(morphologyDataNL, word);
	if (stemmedWord) {
		return stemmedWord;
	}

	// Check whether the word is a participle, and if yes, stem it and return the stem.
	stemmedWord = (0, _detectAndStemRegularParticiple.detectAndStemRegularParticiple)(morphologyDataNL, word);
	if (stemmedWord) {
		return stemmedWord;
	}

	// Check whether the word is on the list of words that should not be stemmed, and if yes, return the word. Example: gans -> gans
	const wordsNotToBeStemmed = morphologyDataNL.stemExceptions.wordsNotToBeStemmedExceptions;
	if ((0, _exceptionListHelpers.checkIfWordIsOnVerbExceptionList)(word, wordsNotToBeStemmed.verbs, morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes) || (0, _exceptionListHelpers.checkIfWordEndingIsOnExceptionList)(word, wordsNotToBeStemmed.endingMatch) || wordsNotToBeStemmed.exactMatch.includes(word)) {
		return word;
	}

	/*
  * Check whether the word ends in -t/-te/-ten/-tend/-de/-den/-dend. If it does, run through a series of checks aimed at
  * predicting whether the -t/d is part of the stem or the suffix. If the word was matched in one of the checks, stem it
  * accordingly and return the stem. Example: boot -> boot, squasht -> squash
  */
	const tAndDEndings = morphologyDataNL.ambiguousTAndDEndings.otherTAndDEndings;
	for (const ending of tAndDEndings) {
		if (word.endsWith(ending)) {
			stemmedWord = (0, _getStemWordsWithTAndDEnding.generateCorrectStemWithTAndDEnding)(morphologyDataNL, word);
			if (stemmedWord) {
				return stemmedWord;
			}
		}
	}

	// Check if the word is on any other stemming exception list, and if yes, return the correct stem.
	stemmedWord = checkOtherStemmingExceptions(word, morphologyDataNL);
	if (stemmedWord) {
		return stemmedWord;
	}

	// If the word was not stemmed in any of the previous steps, run through the stemming algorithm which detects and stems suffixes.
	return (0, _detectAndStemSuffixes2.default)(word, morphologyDataNL);
}
//# sourceMappingURL=stem.js.map
