"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text, locale) {
	var map = (0, _transliterations2.default)(locale);
	for (var i = 0; i < map.length; i++) {
		text = text.replace(map[i].letter, map[i].alternative);
	}
	return text;
};

var _transliterations = require("../config/transliterations.js");

var _transliterations2 = _interopRequireDefault(_transliterations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=transliterate.js.map
