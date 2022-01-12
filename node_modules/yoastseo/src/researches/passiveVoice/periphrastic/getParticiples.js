"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePartText, auxiliaries, language) {
	const words = (0, _getWords2.default)(sentencePartText);
	const foundParticiples = [];

	(0, _lodashEs.forEach)(words, function (word) {
		let type = "";
		if (regularParticipleRegex(word, language).length !== 0) {
			type = "regular";
		}
		if (irregularParticipleRegex(word, language).length !== 0) {
			type = "irregular";
		}
		if (type !== "") {
			switch (language) {
				case "fr":
					foundParticiples.push(new _FrenchParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: type, language: language }));
					break;
				case "es":
					foundParticiples.push(new _SpanishParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: type, language: language }));
					break;
				case "it":
					foundParticiples.push(new _ItalianParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: type, language: language }));
					break;
				case "nl":
					foundParticiples.push(new _DutchParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: type, language: language }));
					break;
				case "pl":
					foundParticiples.push(new _PolishParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: type, language: language }));
					break;
				case "pt":
					foundParticiples.push(new _PortugueseParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: type, language: language }));
					break;
				case "en":
				default:
					foundParticiples.push(new _EnglishParticiple2.default(word, sentencePartText, { auxiliaries: auxiliaries, type: type, language: language }));
					break;
			}
		}
	});
	return foundParticiples;
};

var _lodashEs = require("lodash-es");

var _getWords = require("../../../stringProcessing/getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

var _matchParticiples = require("./matchParticiples");

var _matchParticiples2 = _interopRequireDefault(_matchParticiples);

var _EnglishParticiple = require("../../english/passiveVoice/EnglishParticiple.js");

var _EnglishParticiple2 = _interopRequireDefault(_EnglishParticiple);

var _FrenchParticiple = require("../../french/passiveVoice/FrenchParticiple.js");

var _FrenchParticiple2 = _interopRequireDefault(_FrenchParticiple);

var _SpanishParticiple = require("../../spanish/passiveVoice/SpanishParticiple.js");

var _SpanishParticiple2 = _interopRequireDefault(_SpanishParticiple);

var _ItalianParticiple = require("../../italian/passiveVoice/ItalianParticiple.js");

var _ItalianParticiple2 = _interopRequireDefault(_ItalianParticiple);

var _DutchParticiple = require("../../dutch/passiveVoice/DutchParticiple.js");

var _DutchParticiple2 = _interopRequireDefault(_DutchParticiple);

var _PolishParticiple = require("../../polish/passiveVoice/PolishParticiple.js");

var _PolishParticiple2 = _interopRequireDefault(_PolishParticiple);

var _PortugueseParticiple = require("../../portuguese/passiveVoice/PortugueseParticiple.js");

var _PortugueseParticiple2 = _interopRequireDefault(_PortugueseParticiple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const matchParticiples = (0, _matchParticiples2.default)();
const regularParticipleRegex = matchParticiples.regularParticiples;
const irregularParticipleRegex = matchParticiples.irregularParticiples;

/**
 * Creates participle objects for the participles found in a sentence part.
 *
 * @param {string} sentencePartText The sentence part to find participles in.
 * @param {Array} auxiliaries The list of auxiliaries from the sentence part.
 * @param {string} language The language to find the participles for.
 * @returns {Array} The list with participle objects.
 */
//# sourceMappingURL=getParticiples.js.map
