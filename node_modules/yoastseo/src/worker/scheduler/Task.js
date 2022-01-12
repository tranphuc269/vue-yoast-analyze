"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

/**
 * Represents a scheduler task.
 */
class Task {
	/**
  * Initializes a task.
  *
  * @param {number}   id      The task identifier.
  * @param {Function} execute Executes the job with the data.
  * @param {Function} done    Callback for the scheduler.
  * @param {Object}   [data]  Optional data for when executing the task.
  * @param {string}   type    The type of the task (analyze, analyzeRelatedKeywords, loadScript or customMessage)
  */
	constructor(id, execute, done, data = {}, type = "analyze") {
		if (!(0, _lodashEs.isNumber)(id)) {
			throw new Error("Task.id should be a number.");
		}
		if (!(0, _lodashEs.isFunction)(execute)) {
			throw new Error("Task.execute should be a function.");
		}
		if (!(0, _lodashEs.isFunction)(done)) {
			throw new Error("Task.done should be a function.");
		}
		if (!(0, _lodashEs.isObject)(data)) {
			throw new Error("Task.data should be an object.");
		}
		this.id = id;
		this.execute = execute;
		this.done = done;
		this.data = data;
		this.type = type;
	}
}
exports.default = Task;
//# sourceMappingURL=Task.js.map
