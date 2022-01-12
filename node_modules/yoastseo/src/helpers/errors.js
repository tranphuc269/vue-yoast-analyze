"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.showTrace = undefined;

var _lodashEs = require("lodash-es");

/**
 * Shows and error trace of the error message in the console if the console is available.
 *
 * @param {string} [errorMessage=""] The error message.
 * @returns {void}
 */
function showTrace(errorMessage) {
	if ((0, _lodashEs.isUndefined)(errorMessage)) {
		errorMessage = "";
	}

	if (!(0, _lodashEs.isUndefined)(console) && !(0, _lodashEs.isUndefined)(console.trace)) {
		console.trace(errorMessage);
	}
}

exports.showTrace = showTrace;
exports.default = {
	showTrace: showTrace
};
//# sourceMappingURL=errors.js.map
