"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (synonyms) {
	let synonymsSplit = synonyms.split(",");

	synonymsSplit = synonymsSplit.map(function (synonym) {
		return (0, _removePunctuationExceptQuotes2.default)((0, _stripSpaces2.default)(synonym));
	}).filter(function (synonym) {
		return synonym;
	});
	return synonymsSplit;
};

var _stripSpaces = require("../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _removePunctuationExceptQuotes = require("../stringProcessing/removePunctuationExceptQuotes.js");

var _removePunctuationExceptQuotes2 = _interopRequireDefault(_removePunctuationExceptQuotes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=parseSynonyms.js.map
