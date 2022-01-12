"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	text = (0, _stripSpaces2.default)((0, _stripHTMLTags.stripFullTags)(text));
	if (text === "") {
		return [];
	}

	var words = text.split(/\s/g);

	words = (0, _lodashEs.map)(words, function (word) {
		return (0, _removePunctuation2.default)(word);
	});

	return (0, _lodashEs.filter)(words, function (word) {
		return word.trim() !== "";
	});
};

var _stripHTMLTags = require("./stripHTMLTags.js");

var _stripSpaces = require("./stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _removePunctuation = require("./removePunctuation.js");

var _removePunctuation2 = _interopRequireDefault(_removePunctuation);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=getWords.js.map
