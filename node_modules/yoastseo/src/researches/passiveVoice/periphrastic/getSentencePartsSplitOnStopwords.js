"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _createRegexFromArray = require("../../../stringProcessing/createRegexFromArray.js");

var _createRegexFromArray2 = _interopRequireDefault(_createRegexFromArray);

var _stripSpaces = require("../../../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _SentencePart = require("../../german/passiveVoice/SentencePart.js");

var _SentencePart2 = _interopRequireDefault(_SentencePart);

var _auxiliaries = require("../../german/passiveVoice/auxiliaries.js");

var _auxiliaries2 = _interopRequireDefault(_auxiliaries);

var _stopwords = require("../../german/passiveVoice/stopwords.js");

var _stopwords2 = _interopRequireDefault(_stopwords);

var _SentencePart3 = require("../../dutch/passiveVoice/SentencePart.js");

var _SentencePart4 = _interopRequireDefault(_SentencePart3);

var _stopwords3 = require("../../dutch/passiveVoice/stopwords.js");

var _stopwords4 = _interopRequireDefault(_stopwords3);

var _auxiliaries3 = require("../../dutch/passiveVoice/auxiliaries.js");

var _auxiliaries4 = _interopRequireDefault(_auxiliaries3);

var _SentencePart5 = require("../../polish/passiveVoice/SentencePart.js");

var _SentencePart6 = _interopRequireDefault(_SentencePart5);

var _stopwords5 = require("../../polish/passiveVoice/stopwords.js");

var _stopwords6 = _interopRequireDefault(_stopwords5);

var _auxiliaries5 = require("../../polish/passiveVoice/auxiliaries.js");

var _auxiliaries6 = _interopRequireDefault(_auxiliaries5);

var _SentencePart7 = require("../../hungarian/passiveVoice/SentencePart.js");

var _SentencePart8 = _interopRequireDefault(_SentencePart7);

var _stopwords7 = require("../../hungarian/passiveVoice/stopwords.js");

var _stopwords8 = _interopRequireDefault(_stopwords7);

var _auxiliaries7 = require("../../hungarian/passiveVoice/auxiliaries.js");

var _auxiliaries8 = _interopRequireDefault(_auxiliaries7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// German-specific imports.
const auxiliariesGerman = (0, _auxiliaries2.default)().allAuxiliaries;

const stopwordsGerman = (0, _stopwords2.default)();

// Dutch-specific imports.

const stopwordsDutch = (0, _stopwords4.default)();

const auxiliariesDutch = (0, _auxiliaries4.default)();

// Polish-specific imports.

const stopwordsPolish = (0, _stopwords6.default)();

const auxiliariesPolish = (0, _auxiliaries6.default)();

// Hungarian-specific imports.

const stopwordsHungarian = (0, _stopwords8.default)();

const auxiliariesHungarian = (0, _auxiliaries8.default)().allAuxiliaries;

// The language-specific variables.
const languageVariables = {
	de: {
		SentencePart: _SentencePart2.default,
		stopwordRegex: (0, _createRegexFromArray2.default)(stopwordsGerman),
		auxiliaryRegex: (0, _createRegexFromArray2.default)(auxiliariesGerman),
		locale: "de_DE"
	},
	nl: {
		SentencePart: _SentencePart4.default,
		stopwordRegex: (0, _createRegexFromArray2.default)(stopwordsDutch),
		auxiliaryRegex: (0, _createRegexFromArray2.default)(auxiliariesDutch),
		locale: "nl_NL"
	},
	pl: {
		SentencePart: _SentencePart6.default,
		stopwordRegex: (0, _createRegexFromArray2.default)(stopwordsPolish),
		auxiliaryRegex: (0, _createRegexFromArray2.default)(auxiliariesPolish),
		locale: "pl_PL"
	},
	hu: {
		SentencePart: _SentencePart8.default,
		stopwordRegex: (0, _createRegexFromArray2.default)(stopwordsHungarian),
		auxiliaryRegex: (0, _createRegexFromArray2.default)(auxiliariesHungarian),
		locale: "hu_HU"
	}
};

/**
 * Strips spaces from the auxiliary matches.
 *
 * @param {Array} matches       A list with matches of auxiliaries.
 *
 * @returns {Array}             A list with matches with spaces removed.
 */
function sanitizeMatches(matches) {
	return (0, _lodashEs.map)(matches, function (match) {
		return (0, _stripSpaces2.default)(match);
	});
}

/**
 * Splits sentences into sentence parts based on stopwords.
 *
 * @param {string} sentence     The sentence to split.
 * @param {Array} stopwords     The array with matched stopwords.
 *
 * @returns {Array}             The array with sentence parts.
 */
function splitOnWords(sentence, stopwords) {
	const splitSentences = [];

	// Split the sentence on each found stopword and push this part in an array.
	(0, _lodashEs.forEach)(stopwords, function (stopword) {
		const sentenceSplit = sentence.split(stopword);
		if (!(0, _lodashEs.isEmpty)(sentenceSplit[0])) {
			splitSentences.push(sentenceSplit[0]);
		}
		const startIndex = sentence.indexOf(stopword);
		const endIndex = sentence.length;
		sentence = (0, _stripSpaces2.default)(sentence.substr(startIndex, endIndex));
	});

	// Push the remainder of the sentence in the sentence parts array.
	splitSentences.push(sentence);
	return splitSentences;
}

/**
 * Creates sentence parts based on split sentences.

 * @param {Array}   sentences   The array with split sentences.
 * @param {string}  language    The language for which to create sentence parts.
 *
 * @returns {Array}             The array with sentence parts.
 */
function createSentenceParts(sentences, language) {
	const auxiliaryRegex = languageVariables[language].auxiliaryRegex;
	const SentencePart = languageVariables[language].SentencePart;
	const sentenceParts = [];
	(0, _lodashEs.forEach)(sentences, function (part) {
		const foundAuxiliaries = sanitizeMatches(part.match(auxiliaryRegex || []));
		sentenceParts.push(new SentencePart(part, foundAuxiliaries, languageVariables[language].locale));
	});
	return sentenceParts;
}

/**
 * Splits the sentence into sentence parts based on stopwords.
 *
 * @param {string} sentence     The text to split into sentence parts.
 * @param {string} language     The language for which to split sentences.
 *
 * @returns {Array}             The array with sentence parts.
 */
function splitSentence(sentence, language) {
	const stopwordRegex = languageVariables[language].stopwordRegex;
	const stopwords = sentence.match(stopwordRegex) || [];
	const splitSentences = splitOnWords(sentence, stopwords);
	return createSentenceParts(splitSentences, language);
}

exports.default = splitSentence;
//# sourceMappingURL=getSentencePartsSplitOnStopwords.js.map
