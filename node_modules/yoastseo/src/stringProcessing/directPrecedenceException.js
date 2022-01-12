"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePart, participleIndex, language) {
	let directPrecedenceExceptionRegex;
	switch (language) {
		case "fr":
			directPrecedenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotDirectlyPrecedePassiveParticipleFrench);
			break;
		case "es":
			directPrecedenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotDirectlyPrecedePassiveParticipleSpanish);
			break;
		case "it":
			directPrecedenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotDirectlyPrecedePassiveParticipleItalian);
			break;
		case "nl":
			directPrecedenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotDirectlyPrecedePassiveParticipleDutch);
			break;
		case "pl":
			directPrecedenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotDirectlyPrecedePassiveParticiplePolish);
			break;
		case "en":
		default:
			directPrecedenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotDirectlyPrecedePassiveParticipleEnglish);
			break;
	}
	const directPrecedenceExceptionMatch = (0, _getIndicesWithRegex2.default)(sentencePart, directPrecedenceExceptionRegex);
	return (0, _includesIndex2.default)(directPrecedenceExceptionMatch, participleIndex);
};

var _getIndicesWithRegex = require("../researches/passiveVoice/periphrastic/getIndicesWithRegex.js");

var _getIndicesWithRegex2 = _interopRequireDefault(_getIndicesWithRegex);

var _includesIndex = require("./includesIndex");

var _includesIndex2 = _interopRequireDefault(_includesIndex);

var _createRegexFromArray = require("./createRegexFromArray.js");

var _createRegexFromArray2 = _interopRequireDefault(_createRegexFromArray);

var _functionWords = require("../researches/french/functionWords.js");

var _functionWords2 = _interopRequireDefault(_functionWords);

var _functionWords3 = require("../researches/english/functionWords.js");

var _functionWords4 = _interopRequireDefault(_functionWords3);

var _functionWords5 = require("../researches/spanish/functionWords.js");

var _functionWords6 = _interopRequireDefault(_functionWords5);

var _functionWords7 = require("../researches/italian/functionWords.js");

var _functionWords8 = _interopRequireDefault(_functionWords7);

var _functionWords9 = require("../researches/dutch/functionWords.js");

var _functionWords10 = _interopRequireDefault(_functionWords9);

var _functionWords11 = require("../researches/polish/functionWords.js");

var _functionWords12 = _interopRequireDefault(_functionWords11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cannotDirectlyPrecedePassiveParticipleFrench = (0, _functionWords2.default)().cannotDirectlyPrecedePassiveParticiple;

const cannotDirectlyPrecedePassiveParticipleEnglish = (0, _functionWords4.default)().cannotDirectlyPrecedePassiveParticiple;

const cannotDirectlyPrecedePassiveParticipleSpanish = (0, _functionWords6.default)().cannotDirectlyPrecedePassiveParticiple;

const cannotDirectlyPrecedePassiveParticipleItalian = (0, _functionWords8.default)().cannotDirectlyPrecedePassiveParticiple;

const cannotDirectlyPrecedePassiveParticipleDutch = (0, _functionWords10.default)().cannotDirectlyPrecedePassiveParticiple;

const cannotDirectlyPrecedePassiveParticiplePolish = (0, _functionWords12.default)().cannotDirectlyPrecedePassiveParticiple;

/**
 * Checks whether the participle is directly preceded by a word from the direct precedence exception list.
 * If this is the case, the sentence part is not passive.
 *
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {number} participleIndex The index of the participle.
 * @param {string} language The language of the participle.
 *
 * @returns {boolean} Returns true if a word from the direct precedence exception list is directly preceding
 * the participle, otherwise returns false.
 */
//# sourceMappingURL=directPrecedenceException.js.map
