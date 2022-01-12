"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _relevantWords = require("../stringProcessing/relevantWords");

var _countWords = require("../stringProcessing/countWords");

var _countWords2 = _interopRequireDefault(_countWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retrieves the relevant words from the given paper.
 *
 * @param {Paper} paper The paper to determine the relevant words of.
 *
 * @returns {Object}            result                     A compound result object.
 * @returns {WordCombination[]} result.prominentWords      Relevant words for this paper, filtered and sorted.
 * @returns {boolean}           result.hasMetaDescription  Whether the metadescription is available in the input paper.
 * @returns {boolean}           result.hasTitle            Whether the title is available in the input paper.
 */
function relevantWords(paper) {
	const text = paper.getText();
	const metadescription = paper.getDescription();
	const title = paper.getTitle();

	const result = {};
	result.hasMetaDescription = metadescription !== "";
	result.hasTitle = title !== "";
	result.prominentWords = [];

	/**
  * We only want to return suggestions (and spend time calculating prominent words) if the text is at least 300 words
  * and has a title or a metadescription of if the text is at least 400 words if it has neither.
  */
	if ((0, _countWords2.default)(text) < 400) {
		return result;
	}

	result.prominentWords = (0, _relevantWords.getRelevantWords)(paper.getText(), paper.getLocale());
	return result;
}

exports.default = relevantWords;
//# sourceMappingURL=relevantWords.js.map
