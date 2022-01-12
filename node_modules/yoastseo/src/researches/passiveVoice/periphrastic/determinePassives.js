"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sentencePart, auxiliaries, language) {
  const participles = (0, _getParticiples2.default)(sentencePart, auxiliaries, language);
  return (0, _determineSentencePartIsPassive2.default)(participles);
};

var _getParticiples = require("./getParticiples.js");

var _getParticiples2 = _interopRequireDefault(_getParticiples);

var _determineSentencePartIsPassive = require("./determineSentencePartIsPassive.js");

var _determineSentencePartIsPassive2 = _interopRequireDefault(_determineSentencePartIsPassive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=determinePassives.js.map
