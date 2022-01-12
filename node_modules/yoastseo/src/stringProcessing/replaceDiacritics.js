"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	var map = (0, _diacritics2.default)();

	for (var i = 0; i < map.length; i++) {
		text = text.replace(map[i].letters, map[i].base);
	}
	return text;
};

var _diacritics = require("../config/diacritics.js");

var _diacritics2 = _interopRequireDefault(_diacritics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=replaceDiacritics.js.map
