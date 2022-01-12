"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text, wordToMatch, locale, extraBoundary) {
	text = (0, _stripNonTextTags2.default)(text);
	text = (0, _unifyWhitespace.unifyAllSpaces)(text);
	text = (0, _quotes.normalize)(text);
	wordToMatch = (0, _stripSpaces2.default)((0, _quotes.normalize)(wordToMatch));

	let matches = (0, _matchTextWithTransliteration2.default)(text, wordToMatch, locale, extraBoundary);
	matches = (0, _lodashEs.map)(matches, function (keyword) {
		return (0, _stripSpaces2.default)((0, _removePunctuation2.default)(keyword));
	});

	// Create an array of positions of matches to determine where in the text the wordToMatch occurred first.
	const positions = (0, _lodashEs.map)(matches, function (keyword) {
		return text.indexOf(keyword);
	});

	return {
		count: matches.length,
		matches: matches,
		position: Math.min(...positions)
	};
};

var _stripNonTextTags = require("../stringProcessing/stripNonTextTags.js");

var _stripNonTextTags2 = _interopRequireDefault(_stripNonTextTags);

var _stripSpaces = require("../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _removePunctuation = require("../stringProcessing/removePunctuation.js");

var _removePunctuation2 = _interopRequireDefault(_removePunctuation);

var _unifyWhitespace = require("../stringProcessing/unifyWhitespace.js");

var _matchTextWithTransliteration = require("../stringProcessing/matchTextWithTransliteration.js");

var _matchTextWithTransliteration2 = _interopRequireDefault(_matchTextWithTransliteration);

var _quotes = require("../stringProcessing/quotes.js");

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=matchTextWithWord.js.map
