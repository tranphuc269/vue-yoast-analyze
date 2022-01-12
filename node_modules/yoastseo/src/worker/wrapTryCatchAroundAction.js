"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = wrapTryCatchAroundAction;

var _formatString = require("../helpers/formatString");

var _formatString2 = _interopRequireDefault(_formatString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Logs and formats the error message to send back to the plugin
 * when an analysis web worker action fails.
 *
 * @param {Logger}	logger					The logger instance to log with.
 * @param {Error} 	error					The error to log.
 * @param {Object}	payload					The action payload.
 * @param {string} 	[errorMessagePrefix=""]	The prefix of the error message.
 *
 * @returns {string} the error message to send back.
 */
const handleError = function handleError(logger, error, payload, errorMessagePrefix = "") {
	// Try to format the string with payload parameters, if there are any.
	if (payload) {
		errorMessagePrefix = (0, _formatString2.default)(errorMessagePrefix, payload);
	}

	let errorMessage = errorMessagePrefix ? [errorMessagePrefix] : [];

	if (error.name && error.message) {
		if (error.stack) {
			logger.debug(error.stack);
		}
		// Standard JavaScript error (e.g. when calling `throw new Error( message )`).
		errorMessage.push(`${error.name}: ${error.message}`);
	}

	errorMessage = errorMessage.join("\n\t");
	logger.error(errorMessage);
	return errorMessage;
};

/**
 * Wraps the given action in a try-catch that logs the error message.
 *
 * @param {Logger}   logger                  The logger instance to log with.
 * @param {Function} action                  The action to safely run.
 * @param {string}   [errorMessagePrefix=""] The prefix of the error message.
 *
 * @returns {Function} The wrapped action.
 */
function wrapTryCatchAroundAction(logger, action, errorMessagePrefix = "") {
	return async (...args) => {
		try {
			return await action(...args);
		} catch (error) {
			const errorMessage = handleError(logger, error, args[1], errorMessagePrefix);
			return { error: errorMessage };
		}
	};
}
//# sourceMappingURL=wrapTryCatchAroundAction.js.map
