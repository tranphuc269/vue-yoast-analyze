"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _singleton = require("./singleton");

Object.keys(_singleton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _singleton[key];
    }
  });
});
//# sourceMappingURL=index.js.map
