"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (precedingWords, participleIndex) {
	if ((0, _lodashEs.isEmpty)(precedingWords)) {
		return false;
	}

	var precedingWordsIndices = [];
	(0, _lodashEs.forEach)(precedingWords, function (precedingWord) {
		var precedingWordsIndex = precedingWord.index;
		precedingWordsIndices.push(precedingWordsIndex);
	});

	var matches = [];
	(0, _lodashEs.forEach)(precedingWordsIndices, function (precedingWordsIndex) {
		// + 1 because the beginning word boundary is not included in the passive participle match
		if (precedingWordsIndex + 1 < participleIndex) {
			matches.push(precedingWordsIndex);
		}
	});

	if (matches.length > 0) {
		return true;
	}
	return false;
};

var _lodashEs = require("lodash-es");
//# sourceMappingURL=precedesIndex.js.map
