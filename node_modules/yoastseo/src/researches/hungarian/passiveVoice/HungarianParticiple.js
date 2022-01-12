"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Participle = require("../../../values/Participle.js");

var _Participle2 = _interopRequireDefault(_Participle);

var _checkException = require("../../passiveVoice/periphrastic/checkException.js");

var _checkException2 = _interopRequireDefault(_checkException);

var _nonPassivesInVaAndVe = require("./nonPassivesInVaAndVe.js");

var _nonPassivesInVaAndVe2 = _interopRequireDefault(_nonPassivesInVaAndVe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a Participle object for the Hungarian language.
 *
 * @param {string} participle           The participle.
 * @param {string} sentencePart         The sentence part that contains the participle.
 * @param {Object} attributes           The attributes object.
 *
 * @constructor
 */
const HungarianParticiple = function HungarianParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  _checkException2.default.call(this);
};

require("util").inherits(HungarianParticiple, _Participle2.default);

/**
 * Checks whether a found participle is in the nonPassivesInVaAndVe list.
 * If a word is in the nonPassivesInVaAndVe list, it isn't a participle.
 *
 * @returns {boolean} Returns true if it is in the nonVerbsEndingEd list, otherwise returns false.
 */
HungarianParticiple.prototype.isNonPassivesInVaAndVe = function () {
  return _nonPassivesInVaAndVe2.default.includes(this.getParticiple());
};

/**
 * Returns Hungarian participles used as passives unless they are on an exception list.
 *
 * @returns {boolean}       Returns true unless the participles are on an exception list.
 */
HungarianParticiple.prototype.isPassive = function () {
  return !this.isNonPassivesInVaAndVe();
};

exports.default = HungarianParticiple;
//# sourceMappingURL=HungarianParticiple.js.map
