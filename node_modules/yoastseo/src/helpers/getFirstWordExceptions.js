"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (locale) {
	const firstWordExceptions = {
		en: _firstWordExceptions2.default,
		de: _firstWordExceptions4.default,
		fr: _firstWordExceptions8.default,
		es: _firstWordExceptions6.default,
		nl: _firstWordExceptions10.default,
		it: _firstWordExceptions12.default,
		ru: _firstWordExceptions14.default,
		pl: _firstWordExceptions16.default,
		sv: _firstWordExceptions18.default,
		pt: _firstWordExceptions20.default,
		id: _firstWordExceptions22.default,
		he: _firstWordExceptions24.default,
		ar: _firstWordExceptions26.default,
		hu: _firstWordExceptions28.default,
		tr: _firstWordExceptions30.default
	};

	// If available, return the language-specific first word exceptions.
	if (Object.keys(firstWordExceptions).includes((0, _getLanguage2.default)(locale))) {
		return firstWordExceptions[(0, _getLanguage2.default)(locale)];
	}

	// Return the English first word exceptions as a default.
	return _firstWordExceptions2.default;
};

var _firstWordExceptions = require("../researches/english/firstWordExceptions.js");

var _firstWordExceptions2 = _interopRequireDefault(_firstWordExceptions);

var _firstWordExceptions3 = require("../researches/german/firstWordExceptions.js");

var _firstWordExceptions4 = _interopRequireDefault(_firstWordExceptions3);

var _firstWordExceptions5 = require("../researches/spanish/firstWordExceptions.js");

var _firstWordExceptions6 = _interopRequireDefault(_firstWordExceptions5);

var _firstWordExceptions7 = require("../researches/french/firstWordExceptions.js");

var _firstWordExceptions8 = _interopRequireDefault(_firstWordExceptions7);

var _firstWordExceptions9 = require("../researches/dutch/firstWordExceptions.js");

var _firstWordExceptions10 = _interopRequireDefault(_firstWordExceptions9);

var _firstWordExceptions11 = require("../researches/italian/firstWordExceptions.js");

var _firstWordExceptions12 = _interopRequireDefault(_firstWordExceptions11);

var _firstWordExceptions13 = require("../researches/russian/firstWordExceptions.js");

var _firstWordExceptions14 = _interopRequireDefault(_firstWordExceptions13);

var _firstWordExceptions15 = require("../researches/polish/firstWordExceptions.js");

var _firstWordExceptions16 = _interopRequireDefault(_firstWordExceptions15);

var _firstWordExceptions17 = require("../researches/swedish/firstWordExceptions.js");

var _firstWordExceptions18 = _interopRequireDefault(_firstWordExceptions17);

var _firstWordExceptions19 = require("../researches/portuguese/firstWordExceptions.js");

var _firstWordExceptions20 = _interopRequireDefault(_firstWordExceptions19);

var _firstWordExceptions21 = require("../researches/indonesian/firstWordExceptions.js");

var _firstWordExceptions22 = _interopRequireDefault(_firstWordExceptions21);

var _firstWordExceptions23 = require("../researches/hebrew/firstWordExceptions.js");

var _firstWordExceptions24 = _interopRequireDefault(_firstWordExceptions23);

var _firstWordExceptions25 = require("../researches/arabic/firstWordExceptions.js");

var _firstWordExceptions26 = _interopRequireDefault(_firstWordExceptions25);

var _firstWordExceptions27 = require("../researches/hungarian/firstWordExceptions.js");

var _firstWordExceptions28 = _interopRequireDefault(_firstWordExceptions27);

var _firstWordExceptions29 = require("../researches/turkish/firstWordExceptions.js");

var _firstWordExceptions30 = _interopRequireDefault(_firstWordExceptions29);

var _getLanguage = require("./getLanguage.js");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=getFirstWordExceptions.js.map
