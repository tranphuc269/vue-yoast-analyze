"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePartText, auxiliaries, language) {
	var words = (0, _getWords2.default)(sentencePartText);

	var foundParticiples = [];

	(0, _lodashEs.forEach)(words, function (word) {
		if (verbsBeginningWithGe(word).length !== 0) {
			foundParticiples.push(new _GermanParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: "ge at beginning", language: language }));
			return;
		}
		if (verbsWithGeInMiddle(word).length !== 0) {
			foundParticiples.push(new _GermanParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: "ge in the middle", language: language }));
			return;
		}
		if (verbsBeginningWithErVerEntBeZerHerUber(word).length !== 0) {
			foundParticiples.push(new _GermanParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: "er/ver/ent/be/zer/her at beginning", language: language }));
			return;
		}
		if (verbsWithErVerEntBeZerHerUberInMiddle(word).length !== 0) {
			foundParticiples.push(new _GermanParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: "er/ver/ent/be/zer/her in the middle", language: language }));
			return;
		}
		if (verbsEndingWithIert(word).length !== 0) {
			foundParticiples.push(new _GermanParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: "iert at the end", language: language }));
		}
		if ((0, _lodashEs.includes)(irregularParticiples, word)) {
			foundParticiples.push(new _GermanParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: "irregular", language: language }));
		}
	});
	return foundParticiples;
};

var _getWords = require("../../../stringProcessing/getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

var _regex = require("./regex.js");

var _regex2 = _interopRequireDefault(_regex);

var _irregulars = require("./irregulars.js");

var _irregulars2 = _interopRequireDefault(_irregulars);

var _GermanParticiple = require("./GermanParticiple.js");

var _GermanParticiple2 = _interopRequireDefault(_GermanParticiple);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const regexFunction = (0, _regex2.default)();
var verbsBeginningWithErVerEntBeZerHerUber = regexFunction.verbsBeginningWithErVerEntBeZerHerUber;
var verbsBeginningWithGe = regexFunction.verbsBeginningWithGe;
var verbsWithGeInMiddle = regexFunction.verbsWithGeInMiddle;
var verbsWithErVerEntBeZerHerUberInMiddle = regexFunction.verbsWithErVerEntBeZerHerUberInMiddle;
var verbsEndingWithIert = regexFunction.verbsEndingWithIert;

const irregularParticiples = (0, _irregulars2.default)();

/**
 * Creates GermanParticiple Objects for the participles found in a sentence.
 *
 * @param {string} sentencePartText The sentence to finds participles in.
 * @param {Array} auxiliaries The list of auxiliaries from the sentence part.
 * @param {string} language The language.
 *
 * @returns {Array} The array with GermanParticiple Objects.
 */
//# sourceMappingURL=getParticiples.js.map
