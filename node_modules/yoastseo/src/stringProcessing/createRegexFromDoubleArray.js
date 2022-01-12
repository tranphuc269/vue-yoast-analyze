"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (array) {
	array = array.map(function (wordCombination) {
		return wordCombinationToRegexString(wordCombination);
	});
	const regexString = "(" + array.join(")|(") + ")";
	return new RegExp(regexString, "ig");
};

var _addWordboundary = require("../stringProcessing/addWordboundary.js");

var _addWordboundary2 = _interopRequireDefault(_addWordboundary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a regex string of combined strings from the input array.
 * @param {array} array The array containing the various parts of a transition word combination.
 * @returns {array} The array with replaced entries.
 */
const wordCombinationToRegexString = function wordCombinationToRegexString(array) {
	array = array.map(function (word) {
		return (0, _addWordboundary2.default)(word);
	});
	return array.join("(.*?)");
};

/**
 * Creates a regex of combined strings from the input array, containing arrays with two entries.
 * @param {array} array The array containing arrays.
 * @returns {RegExp} The regex created from the array.
 */
/** @module stringProcessing/createRegexFromDoubleArray */
//# sourceMappingURL=createRegexFromDoubleArray.js.map
