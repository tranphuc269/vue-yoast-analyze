"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _replaceDiacritics = require("../stringProcessing/replaceDiacritics.js");

var _replaceDiacritics2 = _interopRequireDefault(_replaceDiacritics);

var _addWordboundary = require("../stringProcessing/addWordboundary.js");

var _addWordboundary2 = _interopRequireDefault(_addWordboundary);

var _sanitizeString = require("../stringProcessing/sanitizeString");

var _sanitizeString2 = _interopRequireDefault(_sanitizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a regex from a string so it can be matched everywhere in the same way.
 *
 * @param {string} string The string to make a regex from.
 * @param {string} [extraBoundary=""] A string that is used as extra boundary for the regex.
 * @param {boolean} [doReplaceDiacritics=true] If set to false, it doesn't replace diacritics. Defaults to true.
 * @returns {RegExp} regex The regex made from the keyword
 */
/** @module stringProcessing/stringToRegex */
exports.default = (0, _lodashEs.memoize)(function (string, extraBoundary, doReplaceDiacritics) {
	if ((0, _lodashEs.isUndefined)(extraBoundary)) {
		extraBoundary = "";
	}

	if ((0, _lodashEs.isUndefined)(doReplaceDiacritics) || doReplaceDiacritics === true) {
		string = (0, _replaceDiacritics2.default)(string);
	}

	string = (0, _sanitizeString2.default)(string);
	string = (0, _lodashEs.escapeRegExp)(string);
	string = (0, _addWordboundary2.default)(string, false, extraBoundary);
	return new RegExp(string, "ig");
});
//# sourceMappingURL=createWordRegex.js.map
