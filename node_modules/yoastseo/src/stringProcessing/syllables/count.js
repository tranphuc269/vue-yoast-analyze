"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _syllables = require("../../config/syllables.js");

var _syllables2 = _interopRequireDefault(_syllables);

var _getWords = require("../getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

var _lodashEs = require("lodash-es");

var _syllableCountIterator = require("../../helpers/syllableCountIterator.js");

var _syllableCountIterator2 = _interopRequireDefault(_syllableCountIterator);

var _DeviationFragment = require("./DeviationFragment");

var _DeviationFragment2 = _interopRequireDefault(_DeviationFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Counts vowel groups inside a word.
 *
 * @param {string} word A text with words to count syllables.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {number} the syllable count.
 */
/** @module stringProcessing/countSyllables */

var countVowelGroups = function countVowelGroups(word, locale) {
	var numberOfSyllables = 0;
	var vowelRegex = new RegExp("[^" + (0, _syllables2.default)(locale).vowels + "]", "ig");
	var foundVowels = word.split(vowelRegex);
	var filteredWords = (0, _lodashEs.filter)(foundVowels, function (vowel) {
		return vowel !== "";
	});
	numberOfSyllables += filteredWords.length;

	return numberOfSyllables;
};

/**
 * Counts the syllables using vowel exclusions. These are used for groups of vowels that are more or less
 * than 1 syllable.
 *
 * @param {String} word The word to count syllables of.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {number} The number of syllables found in the given word.
 */
var countVowelDeviations = function countVowelDeviations(word, locale) {
	var syllableCountIterator = new _syllableCountIterator2.default((0, _syllables2.default)(locale));
	return syllableCountIterator.countSyllables(word);
};

/**
 * Returns the number of syllables for the word if it is in the list of full word deviations.
 *
 * @param {String} word The word to retrieve the syllables for.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {number} The number of syllables found.
 */
var countFullWordDeviations = function countFullWordDeviations(word, locale) {
	var fullWordDeviations = (0, _syllables2.default)(locale).deviations.words.full;

	var deviation = (0, _lodashEs.find)(fullWordDeviations, function (fullWordDeviation) {
		return fullWordDeviation.word === word;
	});

	if (!(0, _lodashEs.isUndefined)(deviation)) {
		return deviation.syllables;
	}

	return 0;
};

/**
 * Creates an array of deviation fragments for a certain locale.
 *
 * @param {Object} syllableConfig Syllable config for a certain locale.
 * @returns {DeviationFragment[]} A list of deviation fragments
 */
function createDeviationFragments(syllableConfig) {
	var deviationFragments = [];

	var deviations = syllableConfig.deviations;

	if (!(0, _lodashEs.isUndefined)(deviations.words) && !(0, _lodashEs.isUndefined)(deviations.words.fragments)) {
		deviationFragments = (0, _lodashEs.flatMap)(deviations.words.fragments, function (fragments, fragmentLocation) {
			return (0, _lodashEs.map)(fragments, function (fragment) {
				fragment.location = fragmentLocation;

				return new _DeviationFragment2.default(fragment);
			});
		});
	}

	return deviationFragments;
}

var createDeviationFragmentsMemoized = (0, _lodashEs.memoize)(createDeviationFragments);

/**
 * Counts syllables in partial exclusions. If these are found, returns the number of syllables  found, and the modified word.
 * The word is modified so the excluded part isn't counted by the normal syllable counter.
 *
 * @param {String} word The word to count syllables of.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {object} The number of syllables found and the modified word.
 */
var countPartialWordDeviations = function countPartialWordDeviations(word, locale) {
	var deviationFragments = createDeviationFragmentsMemoized((0, _syllables2.default)(locale));
	var remainingParts = word;
	var syllableCount = 0;

	(0, _lodashEs.forEach)(deviationFragments, function (deviationFragment) {
		if (deviationFragment.occursIn(remainingParts)) {
			remainingParts = deviationFragment.removeFrom(remainingParts);
			syllableCount += deviationFragment.getSyllables();
		}
	});

	return { word: remainingParts, syllableCount: syllableCount };
};

/**
 * Count the number of syllables in a word, using vowels and exceptions.
 *
 * @param {String} word The word to count the number of syllables of.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {number} The number of syllables found in a word.
 */
var countUsingVowels = function countUsingVowels(word, locale) {
	var syllableCount = 0;

	syllableCount += countVowelGroups(word, locale);
	syllableCount += countVowelDeviations(word, locale);

	return syllableCount;
};

/**
 * Counts the number of syllables in a word.
 *
 * @param {string} word The word to count syllables of.
 * @param {string} locale The locale of the word.
 * @returns {number} The syllable count for the word.
 */
var countSyllablesInWord = function countSyllablesInWord(word, locale) {
	var syllableCount = 0;

	var fullWordExclusion = countFullWordDeviations(word, locale);
	if (fullWordExclusion !== 0) {
		return fullWordExclusion;
	}

	var partialExclusions = countPartialWordDeviations(word, locale);
	word = partialExclusions.word;
	syllableCount += partialExclusions.syllableCount;
	syllableCount += countUsingVowels(word, locale);

	return syllableCount;
};

/**
 * Counts the number of syllables in a text per word based on vowels.
 * Uses exclusion words for words that cannot be matched with vowel matching.
 *
 * @param {String} text The text to count the syllables of.
 * @param {String} locale The locale to use for counting syllables.
 * @returns {int} The total number of syllables found in the text.
 */
var countSyllablesInText = function countSyllablesInText(text, locale) {
	text = text.toLocaleLowerCase();
	var words = (0, _getWords2.default)(text);

	var syllableCounts = (0, _lodashEs.map)(words, function (word) {
		return countSyllablesInWord(word, locale);
	});

	return (0, _lodashEs.sum)(syllableCounts);
};

exports.default = countSyllablesInText;
//# sourceMappingURL=count.js.map
