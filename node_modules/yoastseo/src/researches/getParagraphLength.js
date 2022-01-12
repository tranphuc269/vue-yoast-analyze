"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	var text = paper.getText();
	var paragraphs = (0, _matchParagraphs2.default)(text);
	var paragraphsLength = [];
	paragraphs.map(function (paragraph) {
		paragraphsLength.push({
			wordCount: (0, _countWords2.default)(paragraph),
			text: paragraph
		});
	});

	return (0, _lodashEs.filter)(paragraphsLength, function (paragraphLength) {
		return paragraphLength.wordCount > 0;
	});
};

var _countWords = require("../stringProcessing/countWords.js");

var _countWords2 = _interopRequireDefault(_countWords);

var _matchParagraphs = require("../stringProcessing/matchParagraphs.js");

var _matchParagraphs2 = _interopRequireDefault(_matchParagraphs);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=getParagraphLength.js.map
