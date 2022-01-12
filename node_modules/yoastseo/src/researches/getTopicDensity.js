"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	const wordCount = (0, _countWords2.default)(paper.getText());
	if (wordCount === 0) {
		return 0;
	}
	const topicCountResult = (0, _topicCount2.default)(paper).count;
	return topicCountResult / wordCount * 100;
};

var _countWords = require("../stringProcessing/countWords.js");

var _countWords2 = _interopRequireDefault(_countWords);

var _topicCount = require("./topicCount.js");

var _topicCount2 = _interopRequireDefault(_topicCount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=getTopicDensity.js.map
