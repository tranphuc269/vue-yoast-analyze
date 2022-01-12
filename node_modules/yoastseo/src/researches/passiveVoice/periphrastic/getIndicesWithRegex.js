"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePart, regex) {
	const results = [];
	/* Decided to use a for loop here so that we could retrieve all matches while keeping result objects intact.
 For every match there is in the sentence part, an object with the match and its index will be pushed into
 the results array. */
	for (let match = regex.exec(sentencePart); match !== null; match = regex.exec(sentencePart)) {
		results.push({
			match: match[0],
			index: match.index
		});
	}
	return results;
};
//# sourceMappingURL=getIndicesWithRegex.js.map
