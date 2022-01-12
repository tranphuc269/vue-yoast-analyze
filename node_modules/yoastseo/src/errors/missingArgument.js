"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Error that means that an argument should be passed that wasn't passed.
 *
 * @constructor
 *
 * @param {string} message The message for this error.
 *
 * @returns {void}
 */
function MissingArgumentError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
}

_util2.default.inherits(MissingArgumentError, Error);

exports.default = MissingArgumentError;
//# sourceMappingURL=missingArgument.js.map
