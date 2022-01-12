"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	return {
		regularParticiples: (0, _lodashEs.memoize)(regularParticiples),
		irregularParticiples: (0, _lodashEs.memoize)(irregularParticiples)
	};
};

var _lodashEs = require("lodash-es");

var _irregulars = require("../../english/passiveVoice/irregulars");

var _irregulars2 = _interopRequireDefault(_irregulars);

var _irregulars3 = require("../../french/passiveVoice/irregulars");

var _irregulars4 = _interopRequireDefault(_irregulars3);

var _participles = require("../../spanish/passiveVoice/participles");

var _participles2 = _interopRequireDefault(_participles);

var _participles3 = require("../../portuguese/passiveVoice/participles");

var _participles4 = _interopRequireDefault(_participles3);

var _participles5 = require("../../italian/passiveVoice/participles");

var _participles6 = _interopRequireDefault(_participles5);

var _irregulars5 = require("../../dutch/passiveVoice/irregulars");

var _irregulars6 = _interopRequireDefault(_irregulars5);

var _participles7 = require("../../polish/passiveVoice/participles");

var _participles8 = _interopRequireDefault(_participles7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const irregularsEnglish = (0, _irregulars2.default)();

const irregularsFrench = (0, _irregulars4.default)();

const irregularsRegularFrench = irregularsFrench.irregularsRegular;
const irregularsIrregularFrench = irregularsFrench.irregularsIrregular;
const irregularsEndingInSFrench = irregularsFrench.irregularsEndingInS;

const spanishParticiples = (0, _participles2.default)();

const portugueseParticiples = (0, _participles4.default)();

const italianParticiples = (0, _participles6.default)();

const irregularsDutch = (0, _irregulars6.default)();
const nlRegex1 = /^(ge|be|ont|ver|her|er)\S+(d|t)($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig;
const nlRegex2 = /^(aan|af|bij|binnen|los|mee|na|neer|om|onder|samen|terug|tegen|toe|uit|vast)(ge)\S+(d|t|n)($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig;

const polishParticiples = (0, _participles8.default)();

// The language-specific participle regexes.
const languageVariables = {
	en: {
		regularParticiplesRegex: /\w+ed($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig
	},
	fr: {
		regularParticiplesRegex: /\S+(é|ée|és|ées)($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig
	},
	nl: {
		regularParticipleRegexPattern1: nlRegex1,
		regularParticipleRegexPattern2: nlRegex2
	}
};
const languagesWithoutRegularParticiples = ["es", "it", "pl", "pt"];

/**
 * Returns words that have been determined to be a regular participle.
 *
 * @param {string} word The word to check.
 * @param {string} language The language in which to match.
 *
 * @returns {Array} A list with the matches.
 */
const regularParticiples = function regularParticiples(word, language) {
	// In certain languages we don't match participles with a regular regex pattern.
	if (languagesWithoutRegularParticiples.includes(language)) {
		return [];
	}

	// Matches word with language-specific participle regexes.
	let matches = [];

	Object.keys(languageVariables[language]).forEach(function (regex) {
		const match = word.match(languageVariables[language][regex]);
		if (match !== null) {
			matches.push(match);
		}
	});

	matches = (0, _lodashEs.flattenDeep)(matches);

	return matches;
};

/**
 * Returns an array of matches of irregular participles with suffixes.
 *
 * @param {string} word The word to match on.
 * @param {Array} irregulars The list of irregulars to match.
 * @param {string} suffixes The suffixes to match the word with.
 *
 * @returns {Array} A list with matched irregular participles.
 */
const matchFrenchParticipleWithSuffix = function matchFrenchParticipleWithSuffix(word, irregulars, suffixes) {
	const matches = [];
	(0, _lodashEs.forEach)(irregulars, function (irregular) {
		const irregularParticiplesRegex = new RegExp("^" + irregular + suffixes + "?$", "ig");
		const participleMatch = word.match(irregularParticiplesRegex);
		if (participleMatch) {
			matches.push(participleMatch[0]);
		}
	});
	return matches;
};

/**
 * Returns the matches for a word in the list of irregulars.
 *
 * @param {string} word The word to match in the list.
 * @param {string} language The language for which to match.
 *
 * @returns {Array} A list with the matches.
 */
const irregularParticiples = function irregularParticiples(word, language) {
	let matches = [];

	switch (language) {
		case "fr":
			// Match different classes of participles with suffixes.
			matches = matches.concat(matchFrenchParticipleWithSuffix(word, irregularsRegularFrench, "(e|s|es)"));
			matches = matches.concat(matchFrenchParticipleWithSuffix(word, irregularsEndingInSFrench, "(e|es)"));

			// Match irregular participles that don't require adding a suffix.
			(0, _lodashEs.find)(irregularsIrregularFrench, function (irregularParticiple) {
				if (irregularParticiple === word) {
					matches.push(irregularParticiple);
				}
			});
			break;
		case "es":
			// In Spanish, we only match passives from a word list.
			if ((0, _lodashEs.includes)(spanishParticiples, word)) {
				matches.push(word);
			}
			break;
		case "it":
			// In Italian, we only match passives from a word list.
			if ((0, _lodashEs.includes)(italianParticiples, word)) {
				matches.push(word);
			}
			break;
		case "nl":
			if ((0, _lodashEs.includes)(irregularsDutch, word)) {
				matches.push(word);
			}
			break;
		case "pl":
			// In Polish, we only match passives from a word list.
			if ((0, _lodashEs.includes)(polishParticiples, word)) {
				matches.push(word);
			}
			break;
		case "pt":
			// In Portuguese, we only match passives from a word list.
			if ((0, _lodashEs.includes)(portugueseParticiples, word)) {
				matches.push(word);
			}
			break;
		case "en":
		default:
			(0, _lodashEs.find)(irregularsEnglish, function (irregularParticiple) {
				if (irregularParticiple === word) {
					matches.push(irregularParticiple);
				}
			});
			break;
	}
	return matches;
};

/**
 * Returns methods to return participles for a language.
 *
 * @returns {Object} Methods to return participles in a language.
 */
//# sourceMappingURL=matchParticiples.js.map
