"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	var sentences = (0, _getSentences2.default)(text);
	var sentenceCount = 0;
	for (var i = 0; i < sentences.length; i++) {
		sentenceCount++;
	}
	return sentenceCount;
};

var _getSentences = require("../stringProcessing/getSentences.js");

var _getSentences2 = _interopRequireDefault(_getSentences);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=countSentences.js.map
