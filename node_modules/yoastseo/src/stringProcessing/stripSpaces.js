"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	// Replace multiple spaces with single space
	text = text.replace(/\s{2,}/g, " ");

	// Replace spaces followed by periods with only the period.
	text = text.replace(/\s\./g, ".");

	// Remove first/last character if space
	text = text.replace(/^\s+|\s+$/g, "");

	return text;
};
//# sourceMappingURL=stripSpaces.js.map
