"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getLanguagesWithWordFormSupport = exports.scoreToRating = exports.measureTextWidth = undefined;

var _inRange = require("./inRange");

Object.keys(_inRange).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _inRange[key];
		}
	});
});

var _scoreToRating = require("../interpreters/scoreToRating");

var _scoreToRating2 = _interopRequireDefault(_scoreToRating);

var _createMeasurementElement = require("./createMeasurementElement");

var _getLanguagesWithWordFormSupport = require("./getLanguagesWithWordFormSupport");

var _getLanguagesWithWordFormSupport2 = _interopRequireDefault(_getLanguagesWithWordFormSupport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.measureTextWidth = _createMeasurementElement.measureTextWidth;
exports.scoreToRating = _scoreToRating2.default;
exports.getLanguagesWithWordFormSupport = _getLanguagesWithWordFormSupport2.default;
//# sourceMappingURL=index.js.map
