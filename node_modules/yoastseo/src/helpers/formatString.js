"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (string, formatMap, delimiter = "%%") {
	delimiter = (0, _lodashEs.escapeRegExp)(delimiter);
	const parameterRegex = new RegExp(`${delimiter}(.+?)${delimiter}`, "g");
	let match;
	let formattedString = string;

	// Try to match and replace each occurrence of "%%something%%" in the string.
	while ((match = parameterRegex.exec(string)) !== null) {
		const key = match[1];
		// Create regex from parameter (e.g. "%%key%%")
		const replaceRegex = new RegExp(`${delimiter}${(0, _lodashEs.escapeRegExp)(key)}${delimiter}`, "g");
		// Replace occurrence (if parameter exists in the format map).
		if (key in formatMap) {
			formattedString = formattedString.replace(replaceRegex, formatMap[key]);
		}
	}

	return formattedString;
};

var _lodashEs = require("lodash-es");
//# sourceMappingURL=formatString.js.map
