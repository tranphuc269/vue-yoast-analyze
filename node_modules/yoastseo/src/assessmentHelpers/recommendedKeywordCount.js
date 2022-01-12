"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text, keyphraseLength, recommendedKeywordDensity, maxOrMin) {
	const wordCount = (0, _countWords2.default)(text);

	if (wordCount === 0) {
		return 0;
	}

	const lengthKeyphraseFactor = (0, _keyphraseLengthFactor2.default)(keyphraseLength);
	const recommendedKeywordCount = recommendedKeywordDensity * wordCount / (100 * lengthKeyphraseFactor);

	/*
  * The recommended keyword count should always be at least 2,
  * regardless of the keyword density, the word count, or the keyphrase length.
  */
	if (recommendedKeywordCount < 2) {
		return 2;
	}

	switch (maxOrMin) {
		case "min":
			// Round up for the recommended minimum count.
			return Math.ceil(recommendedKeywordCount);
		default:
		case "max":
			// Round down for the recommended maximum count.
			return Math.floor(recommendedKeywordCount);
	}
};

var _countWords = require("../stringProcessing/countWords.js");

var _countWords2 = _interopRequireDefault(_countWords);

var _keyphraseLengthFactor = require("../helpers/keyphraseLengthFactor.js");

var _keyphraseLengthFactor2 = _interopRequireDefault(_keyphraseLengthFactor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=recommendedKeywordCount.js.map
