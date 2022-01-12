"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (followingWords, match) {
	if ((0, _lodashEs.isEmpty)(followingWords)) {
		return false;
	}

	// The followingWordIndices include the preceding space.
	var wordAfterMatchIndex = match.index + match.match.length;
	var followingWordsIndices = [];

	(0, _lodashEs.forEach)(followingWords, function (followingWord) {
		followingWordsIndices.push(followingWord.index);
	});

	return (0, _lodashEs.includes)(followingWordsIndices, wordAfterMatchIndex);
};

var _lodashEs = require("lodash-es");
//# sourceMappingURL=followsIndex.js.map
