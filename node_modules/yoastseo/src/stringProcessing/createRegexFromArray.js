"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (array, disableWordBoundary = false, extraBoundary = "", doReplaceDiacritics = false) {
	array = (0, _lodashEs.map)(array, function (string) {
		if (doReplaceDiacritics) {
			string = (0, _replaceDiacritics2.default)(string);
		}

		string = (0, _sanitizeString2.default)(string);

		if (disableWordBoundary) {
			return string;
		}
		return (0, _addWordboundary2.default)(string, true, extraBoundary);
	});

	const regexString = "(" + array.join(")|(") + ")";

	return new RegExp(regexString, "ig");
};

var _lodashEs = require("lodash-es");

var _addWordboundary = require("./addWordboundary.js");

var _addWordboundary2 = _interopRequireDefault(_addWordboundary);

var _replaceDiacritics = require("./replaceDiacritics");

var _replaceDiacritics2 = _interopRequireDefault(_replaceDiacritics);

var _sanitizeString = require("./sanitizeString");

var _sanitizeString2 = _interopRequireDefault(_sanitizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=createRegexFromArray.js.map
