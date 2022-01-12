"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePart, participle, language) {
	// Break the sentence part up into words and convert to lower case.
	const wordsInSentencePart = (0, _getWords2.default)(sentencePart).map(word => word.toLowerCase());

	// Search the participle in the word list.
	const participleIndex = wordsInSentencePart.indexOf(participle.toLowerCase());

	/*
  * There can be no exception in the following situations:
  *
  * -1 The participle is not found.
  *  0 There is no word before the participle.
  */
	if (participleIndex < 1) {
		return false;
	}

	// Get the exceptions word list.
	const precedenceExceptions = (0, _lodashEs.get)(cannotBeBetweenPassiveAuxiliaryAndParticiple, language, []);

	// Check if the words preceding the participle are in the exceptions list.
	for (let i = 0; i < participleIndex; i++) {
		if ((0, _lodashEs.includes)(precedenceExceptions, wordsInSentencePart[i])) {
			return true;
		}
	}

	return false;
};

var _lodashEs = require("lodash-es");

var _functionWords = require("../researches/english/functionWords");

var _functionWords2 = _interopRequireDefault(_functionWords);

var _functionWords3 = require("../researches/french/functionWords");

var _functionWords4 = _interopRequireDefault(_functionWords3);

var _functionWords5 = require("../researches/italian/functionWords");

var _functionWords6 = _interopRequireDefault(_functionWords5);

var _functionWords7 = require("../researches/spanish/functionWords");

var _functionWords8 = _interopRequireDefault(_functionWords7);

var _getWords = require("../stringProcessing/getWords");

var _getWords2 = _interopRequireDefault(_getWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cannotBeBetweenPassiveAuxiliaryAndParticiple = {
	en: (0, _functionWords2.default)().cannotBeBetweenPassiveAuxiliaryAndParticiple,
	fr: (0, _functionWords4.default)().cannotBeBetweenPassiveAuxiliaryAndParticiple,
	it: (0, _functionWords6.default)().cannotBeBetweenPassiveAuxiliaryAndParticiple,
	es: (0, _functionWords8.default)().cannotBeBetweenPassiveAuxiliaryAndParticiple
};

/**
 * Checks whether a word from the precedence exception list occurs anywhere in the sentence part before the participle.
 * If this is the case, the sentence part is not passive.
 *
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {string} participle   The participle.
 * @param {string} language     The language of the participle.
 *
 * @returns {boolean} Returns true if a word from the precedence exception list occurs anywhere in the
 *                    sentence part before the participle, otherwise returns false.
 */
//# sourceMappingURL=precedenceExceptionWithoutRegex.js.map
