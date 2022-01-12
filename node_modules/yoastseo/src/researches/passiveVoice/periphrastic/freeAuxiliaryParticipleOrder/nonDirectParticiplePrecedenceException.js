"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePart, participle, auxiliaries, language) {
	const auxiliariesUnique = (0, _lodashEs.uniq)(auxiliaries);

	const auxiliaryIndices = (0, _indices.getIndicesByWordListSorted)(auxiliariesUnique, sentencePart);

	const participleIndex = sentencePart.indexOf(participle);
	let nonDirectParticiplePrecendenceExceptionRegex;

	switch (language) {
		case "pl":
			nonDirectParticiplePrecendenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotBeBetweenAuxiliaryAndParticiplePolish);
			break;
	}

	// This exception is only applicable for passive constructions in which the auxiliary precedes the participle.
	const matches = auxiliaryIndices.filter(auxiliaryIndex => auxiliaryIndex.index < participleIndex);

	// If there are no auxiliaries before the participle, this exception is not applicable.
	if (matches.length === 0) {
		return false;
	}

	// We pick the auxiliary closest to the participle, since that is most likely the one belonging to the participle.
	const participleAuxiliary = matches[matches.length - 1];

	const precedenceExceptionIndices = (0, _getIndicesWithRegex2.default)(sentencePart, nonDirectParticiplePrecendenceExceptionRegex);

	// Check whether there are any precendence words between the auxiliary and the participle.
	const remaningPrecedenceExceptionIndices = precedenceExceptionIndices.filter(precedenceExceptionIndex => precedenceExceptionIndex.index > participleAuxiliary.index && precedenceExceptionIndex.index < participleIndex);

	return remaningPrecedenceExceptionIndices.length > 0;
};

var _lodashEs = require("lodash-es");

var _createRegexFromArray = require("../../../../stringProcessing/createRegexFromArray.js");

var _createRegexFromArray2 = _interopRequireDefault(_createRegexFromArray);

var _getIndicesWithRegex = require("../getIndicesWithRegex.js");

var _getIndicesWithRegex2 = _interopRequireDefault(_getIndicesWithRegex);

var _functionWords = require("../../../polish/functionWords.js");

var _functionWords2 = _interopRequireDefault(_functionWords);

var _indices = require("../../../../stringProcessing/indices.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cannotBeBetweenAuxiliaryAndParticiplePolish = (0, _functionWords2.default)().cannotBeBetweenPassiveAuxiliaryAndParticiple;

/**
 * Checks whether there are any exception words in between the auxiliary and participle. If there are, it doesn't return a passive.
 *
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {string} participle The participle in the sentence part.
 * @param {string} auxiliaries One or more auxiliaries in the sentence part.
 * @param {string} language The language of the participle.
 *
 * @returns {boolean} Returns true if a word from the 'cannot be between passive auxiliary and participle' exception list
 * appears anywhere in between the last (closest to participle) auxiliary and the participle.
 */
//# sourceMappingURL=nonDirectParticiplePrecedenceException.js.map
