"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = serialize;

var _lodashEs = require("lodash-es");

/**
 * Serializes a data structure to transfer it over a web worker message.
 *
 * @param {*} thing The data structure to serialize.
 *
 * @returns {*} The serialized data structure.
 */
function serialize(thing) {
	if ((0, _lodashEs.isArray)(thing)) {
		return thing.map(serialize);
	}

	const thingIsObject = (0, _lodashEs.isObject)(thing);

	if (thingIsObject && thing.serialize) {
		return thing.serialize();
	}

	if (thingIsObject) {
		return (0, _lodashEs.mapValues)(thing, value => serialize(value));
	}

	return thing;
}
//# sourceMappingURL=serialize.js.map
