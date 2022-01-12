"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (paper) {
  var anchors = (0, _getLinks2.default)(paper);

  return anchors.length;
};

var _getLinks = require("./getLinks");

var _getLinks2 = _interopRequireDefault(_getLinks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=countLinks.js.map
