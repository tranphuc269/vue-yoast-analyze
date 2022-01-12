"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (paper) {
  const anchors = (0, _getAnchorsFromText2.default)(paper.getText());

  return (0, _lodashEs.map)(anchors, _url2.default.getFromAnchorTag);
};

var _getAnchorsFromText = require("../stringProcessing/getAnchorsFromText.js");

var _getAnchorsFromText2 = _interopRequireDefault(_getAnchorsFromText);

var _lodashEs = require("lodash-es");

var _url = require("../stringProcessing/url.js");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=getLinks.js.map
