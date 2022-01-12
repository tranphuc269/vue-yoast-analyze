"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (string) {
  return string.replace(/[\s\n\r\t.,'()"+;!?:/]/g, "");
};
//# sourceMappingURL=removeNonWordCharacters.js.map
