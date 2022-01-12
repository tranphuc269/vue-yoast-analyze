"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (locale) {
	switch ((0, _getLanguage2.default)(locale)) {
		case "de":
			return {
				transitionWords: transitionWordsGerman,
				twoPartTransitionWords: _twoPartTransitionWords4.default
			};
		case "es":
			return {
				transitionWords: transitionWordsSpanish,
				twoPartTransitionWords: _twoPartTransitionWords8.default
			};
		case "fr":
			return {
				transitionWords: transitionWordsFrench,
				twoPartTransitionWords: _twoPartTransitionWords6.default
			};
		case "nl":
			return {
				transitionWords: transitionWordsDutch,
				twoPartTransitionWords: _twoPartTransitionWords10.default
			};
		case "it":
			return {
				transitionWords: transitionWordsItalian,
				twoPartTransitionWords: _twoPartTransitionWords12.default
			};
		case "pt":
			return {
				transitionWords: transitionWordsPortuguese,
				twoPartTransitionWords: _twoPartTransitionWords14.default
			};
		case "ru":
			return {
				transitionWords: transitionWordsRussian,
				twoPartTransitionWords: _twoPartTransitionWords16.default
			};
		case "ca":
			return {
				transitionWords: transitionWordsCatalan,
				twoPartTransitionWords: _twoPartTransitionWords18.default
			};
		case "pl":
			return {
				transitionWords: transitionWordsPolish,
				twoPartTransitionWords: _twoPartTransitionWords20.default
			};
		case "sv":
			return {
				transitionWords: transitionWordsSwedish,
				twoPartTransitionWords: _twoPartTransitionWords22.default
			};
		case "hu":
			return {
				transitionWords: transitionWordsHungarian,
				twoPartTransitionWords: _twoPartTransitionWords24.default
			};
		case "id":
			return {
				transitionWords: transitionWordsIndonesian,
				twoPartTransitionWords: _twoPartTransitionWords26.default
			};
		case "he":
			return {
				transitionWords: transitionWordsHebrew,
				twoPartTransitionWords: _twoPartTransitionWords28.default
			};
		case "ar":
			return {
				transitionWords: transitionWordsArabic,
				twoPartTransitionWords: _twoPartTransitionWords30.default
			};
		case "tr":
			return {
				transitionWords: transitionWordsTurkish,
				twoPartTransitionWords: _twoPartTransitionWords32.default
			};
		default:
		case "en":
			return {
				transitionWords: transitionWordsEnglish,
				twoPartTransitionWords: _twoPartTransitionWords2.default
			};
	}
};

var _transitionWords = require("../researches/english/transitionWords.js");

var _transitionWords2 = _interopRequireDefault(_transitionWords);

var _twoPartTransitionWords = require("../researches/english/twoPartTransitionWords.js");

var _twoPartTransitionWords2 = _interopRequireDefault(_twoPartTransitionWords);

var _transitionWords3 = require("../researches/german/transitionWords.js");

var _transitionWords4 = _interopRequireDefault(_transitionWords3);

var _twoPartTransitionWords3 = require("../researches/german/twoPartTransitionWords.js");

var _twoPartTransitionWords4 = _interopRequireDefault(_twoPartTransitionWords3);

var _transitionWords5 = require("../researches/french/transitionWords.js");

var _transitionWords6 = _interopRequireDefault(_transitionWords5);

var _twoPartTransitionWords5 = require("../researches/french/twoPartTransitionWords.js");

var _twoPartTransitionWords6 = _interopRequireDefault(_twoPartTransitionWords5);

var _transitionWords7 = require("../researches/spanish/transitionWords.js");

var _transitionWords8 = _interopRequireDefault(_transitionWords7);

var _twoPartTransitionWords7 = require("../researches/spanish/twoPartTransitionWords.js");

var _twoPartTransitionWords8 = _interopRequireDefault(_twoPartTransitionWords7);

var _transitionWords9 = require("../researches/dutch/transitionWords.js");

var _transitionWords10 = _interopRequireDefault(_transitionWords9);

var _twoPartTransitionWords9 = require("../researches/dutch/twoPartTransitionWords.js");

var _twoPartTransitionWords10 = _interopRequireDefault(_twoPartTransitionWords9);

var _transitionWords11 = require("../researches/italian/transitionWords.js");

var _transitionWords12 = _interopRequireDefault(_transitionWords11);

var _twoPartTransitionWords11 = require("../researches/italian/twoPartTransitionWords.js");

var _twoPartTransitionWords12 = _interopRequireDefault(_twoPartTransitionWords11);

var _transitionWords13 = require("../researches/portuguese/transitionWords.js");

var _transitionWords14 = _interopRequireDefault(_transitionWords13);

var _twoPartTransitionWords13 = require("../researches/portuguese/twoPartTransitionWords.js");

var _twoPartTransitionWords14 = _interopRequireDefault(_twoPartTransitionWords13);

var _transitionWords15 = require("../researches/russian/transitionWords.js");

var _transitionWords16 = _interopRequireDefault(_transitionWords15);

var _twoPartTransitionWords15 = require("../researches/russian/twoPartTransitionWords.js");

var _twoPartTransitionWords16 = _interopRequireDefault(_twoPartTransitionWords15);

var _transitionWords17 = require("../researches/catalan/transitionWords.js");

var _transitionWords18 = _interopRequireDefault(_transitionWords17);

var _twoPartTransitionWords17 = require("../researches/catalan/twoPartTransitionWords.js");

var _twoPartTransitionWords18 = _interopRequireDefault(_twoPartTransitionWords17);

var _transitionWords19 = require("../researches/polish/transitionWords.js");

var _transitionWords20 = _interopRequireDefault(_transitionWords19);

var _twoPartTransitionWords19 = require("../researches/polish/twoPartTransitionWords.js");

var _twoPartTransitionWords20 = _interopRequireDefault(_twoPartTransitionWords19);

var _transitionWords21 = require("../researches/swedish/transitionWords.js");

var _transitionWords22 = _interopRequireDefault(_transitionWords21);

var _twoPartTransitionWords21 = require("../researches/swedish/twoPartTransitionWords.js");

var _twoPartTransitionWords22 = _interopRequireDefault(_twoPartTransitionWords21);

var _transitionWords23 = require("../researches/hungarian/transitionWords.js");

var _transitionWords24 = _interopRequireDefault(_transitionWords23);

var _twoPartTransitionWords23 = require("../researches/hungarian/twoPartTransitionWords.js");

var _twoPartTransitionWords24 = _interopRequireDefault(_twoPartTransitionWords23);

var _transitionWords25 = require("../researches/indonesian/transitionWords.js");

var _transitionWords26 = _interopRequireDefault(_transitionWords25);

var _twoPartTransitionWords25 = require("../researches/indonesian/twoPartTransitionWords.js");

var _twoPartTransitionWords26 = _interopRequireDefault(_twoPartTransitionWords25);

var _transitionWords27 = require("../researches/hebrew/transitionWords.js");

var _transitionWords28 = _interopRequireDefault(_transitionWords27);

var _twoPartTransitionWords27 = require("../researches/hebrew/twoPartTransitionWords.js");

var _twoPartTransitionWords28 = _interopRequireDefault(_twoPartTransitionWords27);

var _getLanguage = require("./getLanguage.js");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _transitionWords29 = require("../researches/arabic/transitionWords.js");

var _transitionWords30 = _interopRequireDefault(_transitionWords29);

var _twoPartTransitionWords29 = require("../researches/arabic/twoPartTransitionWords.js");

var _twoPartTransitionWords30 = _interopRequireDefault(_twoPartTransitionWords29);

var _transitionWords31 = require("../researches/turkish/transitionWords.js");

var _transitionWords32 = _interopRequireDefault(_transitionWords31);

var _twoPartTransitionWords31 = require("../researches/turkish/twoPartTransitionWords.js");

var _twoPartTransitionWords32 = _interopRequireDefault(_twoPartTransitionWords31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transitionWordsEnglish = (0, _transitionWords2.default)().allWords;

const transitionWordsGerman = (0, _transitionWords4.default)().allWords;

const transitionWordsFrench = (0, _transitionWords6.default)().allWords;

const transitionWordsSpanish = (0, _transitionWords8.default)().allWords;

const transitionWordsDutch = (0, _transitionWords10.default)().allWords;

const transitionWordsItalian = (0, _transitionWords12.default)().allWords;

const transitionWordsPortuguese = (0, _transitionWords14.default)().allWords;

const transitionWordsRussian = (0, _transitionWords16.default)().allWords;

const transitionWordsCatalan = (0, _transitionWords18.default)().allWords;

const transitionWordsPolish = (0, _transitionWords20.default)().allWords;

const transitionWordsSwedish = (0, _transitionWords22.default)().allWords;

const transitionWordsHungarian = (0, _transitionWords24.default)().allWords;

const transitionWordsIndonesian = (0, _transitionWords26.default)().allWords;

const transitionWordsHebrew = (0, _transitionWords28.default)().allWords;

const transitionWordsArabic = (0, _transitionWords30.default)().allWords;

const transitionWordsTurkish = (0, _transitionWords32.default)().allWords;

/**
 * Returns transition words for a specific locale.
 *
 * @param {string} locale The locale to return function words for.
 *
 * @returns {Object} The function words for a locale.
 */
//# sourceMappingURL=getTransitionWords.js.map
