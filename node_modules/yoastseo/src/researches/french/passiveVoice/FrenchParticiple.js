"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _directPrecedenceExceptionWithoutRegex = require("../../../stringProcessing/directPrecedenceExceptionWithoutRegex");

var _directPrecedenceExceptionWithoutRegex2 = _interopRequireDefault(_directPrecedenceExceptionWithoutRegex);

var _precedenceExceptionWithoutRegex = require("../../../stringProcessing/precedenceExceptionWithoutRegex");

var _precedenceExceptionWithoutRegex2 = _interopRequireDefault(_precedenceExceptionWithoutRegex);

var _Participle = require("../../../values/Participle");

var _Participle2 = _interopRequireDefault(_Participle);

var _checkException = require("../../passiveVoice/periphrastic/checkException");

var _checkException2 = _interopRequireDefault(_checkException);

var _exceptionsParticiples = require("./exceptionsParticiples");

var _exceptionsParticiples2 = _interopRequireDefault(_exceptionsParticiples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _exceptionsParticiple = (0, _exceptionsParticiples2.default)();

const exceptionsParticiplesAdjectivesVerbs = _exceptionsParticiple.adjectivesVerbs,
      exceptionsParticiplesNounsVowel = _exceptionsParticiple.nounsStartingWithVowel,
      exceptionsParticiplesNounsConsonant = _exceptionsParticiple.nounsStartingWithConsonant,
      exceptionsParticiplesOthers = _exceptionsParticiple.others;

/**
 * Creates an Participle object for the French language.
 *
 * @param {string} participle The participle.
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {Object} attributes  The attributes object.
 *
 * @constructor
 */

var FrenchParticiple = function FrenchParticiple(participle, sentencePart, attributes) {
	_Participle2.default.call(this, participle, sentencePart, attributes);
	_checkException2.default.call(this);
};

require("util").inherits(FrenchParticiple, _Participle2.default);

/**
 * Checks whether the participle is irregular.
 *
 * @returns {boolean} Returns true if the passive is irregular.
 */
var checkIrregular = function checkIrregular() {
	if (this.getType() === "irregular") {
		return true;
	}
};

/**
 * Checks if any exceptions are applicable to this participle that would result in the sentence part not being passive.
 * If no exceptions are found, the sentence part is passive.
 *
 * @returns {boolean} Returns true if no exception is found.
 */
FrenchParticiple.prototype.isPassive = function () {
	const sentencePart = this.getSentencePart();
	const participle = this.getParticiple();
	const language = this.getLanguage();

	// Only check precedence exceptions for irregular participles.
	if (checkIrregular.call(this)) {
		return !this.directPrecedenceException(sentencePart, participle, language) && !this.precedenceException(sentencePart, participle, language);
	}
	// Check precedence exceptions and exception lists for regular participles.
	return !this.isOnAdjectivesVerbsExceptionList() && !this.isOnNounsExceptionList() && !this.isOnOthersExceptionList() && !this.directPrecedenceException(sentencePart, participle, language) && !this.precedenceException(sentencePart, participle, language);
};

/**
 * Creates regexes to match adjective and verb participle exceptions (including suffixes) and memoizes them.
 *
 * @returns {Array} Returns an array with all adjective and verb participle exceptions.
 */
var getExceptionsParticiplesAdjectivesVerbsRegexes = (0, _lodashEs.memoize)(function () {
	const exceptionsParticiplesAdjectivesVerbsRegexes = [];
	(0, _lodashEs.forEach)(exceptionsParticiplesAdjectivesVerbs, function (exceptionParticiplesAdjectivesVerbs) {
		exceptionsParticiplesAdjectivesVerbsRegexes.push(new RegExp("^" + exceptionParticiplesAdjectivesVerbs + "(e|s|es)?$", "ig"));
	});
	return exceptionsParticiplesAdjectivesVerbsRegexes;
});

/**
 * Creates regexes to match noun participle exceptions (including suffixes) and memoizes them.
 *
 * @returns {Array} Returns an array with all noun participle exceptions.
 */
var getExceptionsParticiplesNounsRegexes = (0, _lodashEs.memoize)(function () {
	const exceptionsParticiplesNounsRegexes = [];

	// Nouns starting with a vowel are checked with -s suffix and l' and d' prefixes.
	(0, _lodashEs.forEach)(exceptionsParticiplesNounsVowel, function (exceptionParticipleNounVowel) {
		exceptionsParticiplesNounsRegexes.push(new RegExp("^(l'|d')?" + exceptionParticipleNounVowel + "(s)?$", "ig"));
	});
	// Nouns starting with a consonant are checked with -s suffix.
	(0, _lodashEs.forEach)(exceptionsParticiplesNounsConsonant, function (exceptionParticipleNounConsonant) {
		exceptionsParticiplesNounsRegexes.push(new RegExp("^" + exceptionParticipleNounConsonant + "(s)?$", "ig"));
	});

	return exceptionsParticiplesNounsRegexes;
});

/**
 * Checks whether a given participle matches a list of regex exceptions.
 *
 * @param {Array} participleExceptionRegexes The array of regexes to check.
 * @returns {boolean} Returns true if the participle matches a regex.
 */
var checkParticipleExceptionRegexes = function checkParticipleExceptionRegexes(participleExceptionRegexes) {
	var participle = this.getParticiple();
	var match = [];

	(0, _lodashEs.forEach)(participleExceptionRegexes, function (participleExceptionRegex) {
		var exceptionMatch = participle.match(participleExceptionRegex);
		if (exceptionMatch) {
			match.push(exceptionMatch[0]);
		}
	});

	if (match.length > 0) {
		return true;
	}

	return false;
};

/**
 * Checks whether a found participle is in the exception list of adjectives and verbs.
 * These words are checked with e/s/es as possible suffixes.
 * If a word is on the list, it isn't a participle.
 *
 * @returns {boolean} Returns true if it is in the exception list of adjectives and verbs, otherwise returns false.
 */
FrenchParticiple.prototype.isOnAdjectivesVerbsExceptionList = function () {
	var exceptionParticiplesAdjectivesVerbs = getExceptionsParticiplesAdjectivesVerbsRegexes();
	return checkParticipleExceptionRegexes.call(this, exceptionParticiplesAdjectivesVerbs);
};

/**
 * Checks whether a found participle is in the exception list of nouns.
 * These words are checked with s as a possible suffix.
 * If a word is on the list, it isn't a participle.
 *
 * @returns {boolean} Returns true if it is in the exception list of nouns, otherwise returns false.
 */
FrenchParticiple.prototype.isOnNounsExceptionList = function () {
	var exceptionsParticiplesNouns = getExceptionsParticiplesNounsRegexes();
	return checkParticipleExceptionRegexes.call(this, exceptionsParticiplesNouns);
};

/**
 * Checks whether a found participle is in the exception list in the 'other' category.
 * If a word is on the list, it isn't a participle.
 * Irregular participles do not end in -é and therefore can't be on the list.
 *
 * @returns {boolean} Returns true if it is in the exception list of nouns, otherwise returns false.
 */
FrenchParticiple.prototype.isOnOthersExceptionList = function () {
	return (0, _lodashEs.includes)(exceptionsParticiplesOthers, this.getParticiple());
};

FrenchParticiple.prototype.directPrecedenceException = _directPrecedenceExceptionWithoutRegex2.default;

FrenchParticiple.prototype.precedenceException = _precedenceExceptionWithoutRegex2.default;

exports.default = FrenchParticiple;
//# sourceMappingURL=FrenchParticiple.js.map
