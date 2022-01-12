"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	// Remove "words" comprised only of numbers
	text = text.replace(/\b[0-9]+\b/g, "");

	text = (0, _stripSpaces2.default)(text);

	if (text === ".") {
		text = "";
	}
	return text;
};

var _stripSpaces = require("../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=stripNumbers.js.map
