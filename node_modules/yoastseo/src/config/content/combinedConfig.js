"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (locale) {
	const language = (0, _getLanguage2.default)(locale);
	if (configurations.hasOwnProperty(language)) {
		return (0, _lodashEs.defaultsDeep)(configurations[language], _default2.default);
	}

	return _default2.default;
};

var _lodashEs = require("lodash-es");

var _getLanguage = require("./../../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _default = require("./default");

var _default2 = _interopRequireDefault(_default);

var _it = require("./it");

var _it2 = _interopRequireDefault(_it);

var _ru = require("./ru");

var _ru2 = _interopRequireDefault(_ru);

var _pl = require("./pl");

var _pl2 = _interopRequireDefault(_pl);

var _es = require("./es");

var _es2 = _interopRequireDefault(_es);

var _ca = require("./ca");

var _ca2 = _interopRequireDefault(_ca);

var _pt = require("./pt");

var _pt2 = _interopRequireDefault(_pt);

var _he = require("./he");

var _he2 = _interopRequireDefault(_he);

var _tr = require("./tr");

var _tr2 = _interopRequireDefault(_tr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configurations = {
	it: _it2.default,
	ru: _ru2.default,
	pl: _pl2.default,
	es: _es2.default,
	ca: _ca2.default,
	pt: _pt2.default,
	he: _he2.default,
	tr: _tr2.default
};

/**
 * Returns a combined config for YoastSEO.js
 *
 * @param {string} locale The locale to retrieve the config for.
 *
 * @returns {Object} The configuration object.
 */
//# sourceMappingURL=combinedConfig.js.map
