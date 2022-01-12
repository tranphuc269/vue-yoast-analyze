"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePartText, auxiliaries, language) {
	const words = (0, _getWords2.default)(sentencePartText);

	const foundParticiples = [];

	(0, _lodashEs.forEach)(words, function (word) {
		if (word.endsWith("ve")) {
			foundParticiples.push(new _HungarianParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: "ve at the end", language: language }));
			return;
		}
		if (word.endsWith("va")) {
			foundParticiples.push(new _HungarianParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: "va at the end", language: language }));
			return;
		}
		if (word.endsWith("ódni")) {
			foundParticiples.push(new _HungarianParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: "ódni at the end", language: language }));
			return;
		}
		if (word.endsWith("ődni")) {
			foundParticiples.push(new _HungarianParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: "ődni at the end", language: language }));
			return;
		}
		if (_participles2.default.includes(word)) {
			foundParticiples.push(new _HungarianParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: "re/ra at the end", language: language }));
		}
	});
	return foundParticiples;
};

var _getWords = require("../../../stringProcessing/getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

var _participles = require("./participles.js");

var _participles2 = _interopRequireDefault(_participles);

var _HungarianParticiple = require("./HungarianParticiple.js");

var _HungarianParticiple2 = _interopRequireDefault(_HungarianParticiple);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=getParticiples.js.map
