"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (matches, keywordForms, locale) {
	let foundInHeader = -1;

	if (matches !== null) {
		foundInHeader = 0;
		for (let i = 0; i < matches.length; i++) {
			// NOTE: This replaceString call seemingly doesn't work, as no replacement value is being sent to the .replace method in replaceString
			const formattedHeaders = (0, _replaceString2.default)(matches[i], removalWords);
			if ((0, _matchTextWithArray2.default)(formattedHeaders, keywordForms, locale).count > 0 || (0, _matchTextWithArray2.default)(matches[i], keywordForms, locale).count > 0) {
				foundInHeader++;
			}
		}
	}
	return foundInHeader;
};

var _replaceString = require("../stringProcessing/replaceString.js");

var _replaceString2 = _interopRequireDefault(_replaceString);

var _removalWords = require("../config/removalWords.js");

var _removalWords2 = _interopRequireDefault(_removalWords);

var _matchTextWithArray = require("../stringProcessing/matchTextWithArray.js");

var _matchTextWithArray2 = _interopRequireDefault(_matchTextWithArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const removalWords = (0, _removalWords2.default)();

/**
 * Matches the keyword in an array of strings
 *
 * @param {Array} matches The array with the matched headings.
 * @param {String[]} keywordForms The array of keyword forms to match
 * @param {string} locale The locale used for transliteration.
 * @returns {number} The number of occurrences of the keyword in the headings.
 */
//# sourceMappingURL=subheadingsMatch.js.map
