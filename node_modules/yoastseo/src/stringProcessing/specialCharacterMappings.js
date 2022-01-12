"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.replaceTurkishIsMemoized = exports.replaceTurkishIs = exports.combinations = exports.arraysOverlap = exports.arraysDifference = exports.getIndicesOfCharacter = exports.getIndicesOfWords = undefined;

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

var _includes = require("lodash/includes");

var _includes2 = _interopRequireDefault(_includes);

var _memoize = require("lodash/memoize");

var _memoize2 = _interopRequireDefault(_memoize);

var _getWords = require("./getWords");

var _getWords2 = _interopRequireDefault(_getWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets positions of the first character of a word in the input text.
 *
 * @param {string} text The original text, for which the indices of word beginnings need to be determined.
 *
 * @returns {Array} indices The array of indices in the text at which words start.
 */
function getIndicesOfWords(text) {
	const indices = [];
	const words = (0, _getWords2.default)(text);
	let startSearchFrom = 0;

	words.forEach(function (word) {
		const currentIndex = text.indexOf(word, startSearchFrom);
		indices.push(currentIndex);
		startSearchFrom = currentIndex + word.length;
	});

	return indices;
}

/**
 * Gets indices of a specific character in the input text.
 *
 * @param {string} text The original text, for which the indices of specific characters have to be determined.
 * @param {string} characterToFind The character that needs to be found in the text.
 *
 * @returns {Array} indices The array of indices in the text at which the characterToFind occurs.
 */
function getIndicesOfCharacter(text, characterToFind) {
	const indices = [];

	if (text.indexOf(characterToFind) > -1) {
		for (let i = 0; i < text.length; i++) {
			if (text[i] === characterToFind) {
				indices.push(i);
			}
		}
	}

	return indices;
}

/**
 * Compares two arrays of which the second array is the sub-array of the first array.
 * Returns the array of elements of the first array which are not in the second array.
 *
 * @param {Array} bigArray The array with all elements.
 * @param {Array} subarray The array with some elements from the bigArray.
 *
 * @returns {Array} difference An array of all elements of bigArray which are not in subarray.
 */
function arraysDifference(bigArray, subarray) {
	return (0, _filter2.default)(bigArray, function (element) {
		return !(0, _includes2.default)(subarray, element);
	});
}

/**
 * Compares two arrays and returns the array of elements that occur in both arrays.
 *
 * @param {Array} firstArray The first array with elements to compare.
 * @param {Array} secondArray The second array with elements to compare.
 *
 * @returns {Array} overlap An array of all elements of firstArray which are also in secondArray.
 */
function arraysOverlap(firstArray, secondArray) {
	return (0, _filter2.default)(firstArray, function (element) {
		return (0, _includes2.default)(secondArray, element);
	});
}

/**
 * Generates all possible combinations of the elements of an array (treated as unique).
 * https://gist.github.com/jpillora/4435759
 *
 * @param {Array} collection The array with elements that should be combined.
 *
 * @returns {Array} result An array of all possible combinations of elements of the original array.
 */
function combinations(collection) {
	/**
  * A recursive function that iterates through all elements of an array to produce its combinations.
  *
  * @param {Array} xs The array to start accumulating with.
  * @param {Array} array The array with elements that should be combined.
  *
  * @returns {Array} result An array of all possible combinations of elements of the original array.
  */
	function acc(xs, array) {
		const x = xs[0];

		if (typeof x === "undefined") {
			return array;
		}

		for (let i = 0, l = array.length; i < l; ++i) {
			array.push(array[i].concat(x));
		}
		return acc(xs.slice(1), array);
	}
	return acc(collection, [[]]).slice(1).concat([[]]);
}

/**
 * Replaces characters on specified indices in the input text.
 *
 * @param {string} text The original text, for which the characters have to be substituted.
 * @param {Array} indices The array of indices that have to be substituted.
 * @param {string} substitute The character that is used to substitute in the text.
 *
 * @returns {string} result The string of the original text with the characters on specified indices are substituted with the substitute character.
 */
function replaceCharactersByIndex(text, indices, substitute) {
	const modifiedTextSplitByLetter = text.split("");

	indices.forEach(function (index) {
		modifiedTextSplitByLetter.splice(index, 1, substitute);
	});

	return modifiedTextSplitByLetter.join("");
}

/**
 * Generates upper and lower case for Turkish strings that contain characters İ or ı, which appear to not be processed correctly by regexes.
 *
 * @param {string} text The text to build possible upper and lower case alternatives.
 *
 * @returns {Array} An array of strings that contains all possible upper and lower case alternatives of the original string
 */
function replaceTurkishIs(text) {
	// Get indices of all occurrences of İ, I, i, or ı.
	const indicesOfAllIs = getIndicesOfCharacter(text, "İ").concat(getIndicesOfCharacter(text, "I"), getIndicesOfCharacter(text, "i"), getIndicesOfCharacter(text, "ı"));
	indicesOfAllIs.sort();

	// If there are no Is return the text
	if (indicesOfAllIs.length === 0) {
		return [text];
	}
	const indicesOfIsInWordBeginnings = arraysOverlap(getIndicesOfWords(text), indicesOfAllIs);

	const results = [];

	// First round of creating combinations: assign which indices will be replaced by İ
	const combinationsDottedI = combinations(indicesOfIsInWordBeginnings);

	combinationsDottedI.forEach(function (oneCombinationDottedI) {
		// If the combination is full array, just add it to results immediately without going through the rest of iterations.
		if (oneCombinationDottedI === indicesOfIsInWordBeginnings) {
			results.push([oneCombinationDottedI, [], [], []]);
		} else {
			const indicesNotDottedI = arraysDifference(indicesOfIsInWordBeginnings, oneCombinationDottedI);

			// Second round of creating combinations: assign which indices will be replaced by I
			const combinationsDotlessI = combinations(indicesNotDottedI);
			combinationsDotlessI.forEach(function (oneCombinationDotlessI) {
				// If the combination is full array, just add it to results immediately without going through the rest of iterations.
				if (oneCombinationDotlessI === indicesNotDottedI) {
					results.push([oneCombinationDottedI, oneCombinationDotlessI, [], []]);
				} else {
					const indicesSmalli = arraysDifference(indicesNotDottedI, oneCombinationDotlessI);

					// Third round of creating combinations: assign which indices will be replaced by i
					const combinationsDottedi = combinations(indicesSmalli);

					combinationsDottedi.forEach(function (oneCombinationDottedi) {
						// If the combination is full array, just add it to results immediately without going through the rest of iterations.
						if (oneCombinationDottedi === indicesSmalli) {
							results.push([oneCombinationDottedI, oneCombinationDotlessI, oneCombinationDottedi, []]);
						} else {
							const oneCombinationDotlessi = arraysDifference(indicesSmalli, oneCombinationDottedi);

							results.push([oneCombinationDottedI, oneCombinationDotlessI, oneCombinationDottedi, oneCombinationDotlessi]);
						}
					});
				}
			});
		}
	});

	const textAlternations = [];

	results.forEach(function (result) {
		const toDottedI = replaceCharactersByIndex(text, result[0], "İ");
		const toDotlessI = replaceCharactersByIndex(toDottedI, result[1], "I");
		const toDottedi = replaceCharactersByIndex(toDotlessI, result[2], "i");
		const toDotlessi = replaceCharactersByIndex(toDottedi, result[3], "ı");
		textAlternations.push(toDotlessi);
	});

	return textAlternations;
}

const replaceTurkishIsMemoized = (0, _memoize2.default)(replaceTurkishIs);

exports.getIndicesOfWords = getIndicesOfWords;
exports.getIndicesOfCharacter = getIndicesOfCharacter;
exports.arraysDifference = arraysDifference;
exports.arraysOverlap = arraysOverlap;
exports.combinations = combinations;
exports.replaceTurkishIs = replaceTurkishIs;
exports.replaceTurkishIsMemoized = replaceTurkishIsMemoized;
//# sourceMappingURL=specialCharacterMappings.js.map
