"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	return {
		en: _determineStem.determineStem,
		de: _determineStem2.determineStem,
		nl: _determineStem3.determineStem,
		es: _stem2.default,
		fr: _stem4.default,
		ru: _stem6.default,
		it: _stem8.default,
		pt: _stem10.default,
		id: _stem12.default,
		pl: _stem14.default,
		ar: _stem16.default,
		sv: _stem18.default,
		hu: _stem20.default,
		he: _stem22.default,
		nb: _stem24.default,
		tr: _stem26.default
	};
};

var _determineStem = require("../morphology/english/determineStem");

var _determineStem2 = require("../morphology/german/determineStem");

var _determineStem3 = require("../morphology/dutch/determineStem");

var _stem = require("../morphology/spanish/stem");

var _stem2 = _interopRequireDefault(_stem);

var _stem3 = require("../morphology/french/stem");

var _stem4 = _interopRequireDefault(_stem3);

var _stem5 = require("../morphology/russian/stem");

var _stem6 = _interopRequireDefault(_stem5);

var _stem7 = require("../morphology/italian/stem");

var _stem8 = _interopRequireDefault(_stem7);

var _stem9 = require("../morphology/portuguese/stem");

var _stem10 = _interopRequireDefault(_stem9);

var _stem11 = require("../morphology/indonesian/stem");

var _stem12 = _interopRequireDefault(_stem11);

var _stem13 = require("../morphology/polish/stem");

var _stem14 = _interopRequireDefault(_stem13);

var _stem15 = require("../morphology/arabic/stem");

var _stem16 = _interopRequireDefault(_stem15);

var _stem17 = require("../morphology/swedish/stem");

var _stem18 = _interopRequireDefault(_stem17);

var _stem19 = require("../morphology/hungarian/stem");

var _stem20 = _interopRequireDefault(_stem19);

var _stem21 = require("../morphology/hebrew/stem");

var _stem22 = _interopRequireDefault(_stem21);

var _stem23 = require("../morphology/norwegian/stem");

var _stem24 = _interopRequireDefault(_stem23);

var _stem25 = require("../morphology/turkish/stem");

var _stem26 = _interopRequireDefault(_stem25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=getStemForLanguage.js.map
