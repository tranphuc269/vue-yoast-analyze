"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (paper) {
  return (0, _imageInText2.default)(paper.getText()).length;
};

var _imageInText = require("./../stringProcessing/imageInText");

var _imageInText2 = _interopRequireDefault(_imageInText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=imageCountInText.js.map
