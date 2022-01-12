"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (locale, languages) {
  var language = (0, _getLanguage2.default)(locale);
  return (0, _lodashEs.indexOf)(languages, language) > -1;
};

var _lodashEs = require("lodash-es");

var _getLanguage = require("./getLanguage.js");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=getLanguageAvailability.js.map
