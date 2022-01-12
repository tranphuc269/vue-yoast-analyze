"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text, array, locale = "en_EN") {
	let count = 0;
	let matches = [];

	array = array.map(_quotes.normalize);

	(0, _lodashEs.uniq)(array).forEach(function (wordToMatch) {
		const occurrence = (0, _matchTextWithWord2.default)(text, wordToMatch, locale);
		count += occurrence.count;
		matches = matches.concat(occurrence.matches);
	});

	if (matches === null) {
		matches = [];
	}

	matches = matches.map(function (string) {
		return (0, _stripSpaces2.default)((0, _removePunctuation2.default)(string));
	});

	return {
		count: count,
		matches: matches
	};
};

var _stripSpaces = require("../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _removePunctuation = require("../stringProcessing/removePunctuation.js");

var _removePunctuation2 = _interopRequireDefault(_removePunctuation);

var _matchTextWithWord = require("../stringProcessing/matchTextWithWord");

var _matchTextWithWord2 = _interopRequireDefault(_matchTextWithWord);

var _quotes = require("../stringProcessing/quotes.js");

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=matchTextWithArray.js.map
