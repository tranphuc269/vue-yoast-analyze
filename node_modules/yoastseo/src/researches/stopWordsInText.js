"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	var i,
	    matches = [];

	for (i = 0; i < stopwords.length; i++) {
		if (text.match((0, _createWordRegex2.default)(stopwords[i])) !== null) {
			matches.push(stopwords[i]);
		}
	}

	return matches;
};

var _stopwords = require("../config/stopwords.js");

var _stopwords2 = _interopRequireDefault(_stopwords);

var _createWordRegex = require("../stringProcessing/createWordRegex.js");

var _createWordRegex2 = _interopRequireDefault(_createWordRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stopwords = (0, _stopwords2.default)();

/**
 * Checks a text to see if there are any stopwords, that are defined in the stopwords config.
 *
 * @param {string} text The input text to match stopwords.
 * @returns {Array} An array with all stopwords found in the text.
 */
//# sourceMappingURL=stopWordsInText.js.map
