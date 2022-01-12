"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentences) {
	var sentencesWordCount = [];
	(0, _lodashEs.forEach)(sentences, function (sentence) {
		// For counting words we want to omit the HTMLtags.
		var strippedSentence = (0, _stripHTMLTags.stripFullTags)(sentence);
		var length = (0, _countWords2.default)(strippedSentence);

		if (length <= 0) {
			return;
		}

		sentencesWordCount.push({
			sentence: sentence,
			sentenceLength: (0, _countWords2.default)(sentence)
		});
	});
	return sentencesWordCount;
};

var _countWords = require("./countWords.js");

var _countWords2 = _interopRequireDefault(_countWords);

var _lodashEs = require("lodash-es");

var _stripHTMLTags = require("./stripHTMLTags.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=sentencesLength.js.map
