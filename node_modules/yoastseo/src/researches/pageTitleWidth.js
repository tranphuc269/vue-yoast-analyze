"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (paper) {
  if (paper.hasTitle()) {
    return paper.getTitleWidth();
  }
  return 0;
};
//# sourceMappingURL=pageTitleWidth.js.map
