"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Result serves as data structure for the AnalysisWorkerWrapper request result.
 */
class Result {
	/**
  * Initializes a result.
  *
  * @param {Object} result The result.
  * @param {Object} [data] Optional extra data.
  */
	constructor(result, data = {}) {
		this.result = result;
		this.data = data;
	}
}
exports.default = Result;
//# sourceMappingURL=Result.js.map
