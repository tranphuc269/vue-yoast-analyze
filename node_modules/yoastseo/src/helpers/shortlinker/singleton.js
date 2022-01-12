"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureShortlinker = configureShortlinker;
exports.createShortlink = createShortlink;
exports.createAnchorOpeningTag = createAnchorOpeningTag;

var _Shortlinker = require("./Shortlinker");

var _Shortlinker2 = _interopRequireDefault(_Shortlinker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set global scope.
let globalScope;

// In the browser, window exists so that is the global scope.
if (typeof window === "undefined") {
  // Inside a web worker, self exists so that is the global scope.
  if (typeof self === "undefined") {
    // Fall back tot the `global`, because that is the global scope in Node.JS.
    globalScope = global;
  } else {
    globalScope = self;
  }
} else {
  globalScope = window;
}

globalScope.yoast = globalScope.yoast || {};
globalScope.yoast.shortlinker = null;

/**
 * Retrieves the Shortlinker instance.
 *
 * @returns {Shortlinker} The Shortlinker.
 */
function getShortlinker() {
  if (globalScope.yoast.shortlinker === null) {
    globalScope.yoast.shortlinker = new _Shortlinker2.default();
  }
  return globalScope.yoast.shortlinker;
}

/**
 * Configures the Shortlinker instance.
 *
 * @param {Object} config             The configuration.
 * @param {Object} [config.params={}] The default params for in the url.
 *
 * @returns {void}
 */
function configureShortlinker(config) {
  getShortlinker().configure(config);
}

/**
 * Creates a link by combining the params from the config and appending them to the url.
 *
 * @param {string} url         The url.
 * @param {Object} [params={}] Optional extra params for in the url.
 *
 * @returns {string} The url with query string.
 */
function createShortlink(url, params = {}) {
  return getShortlinker().append(url, params);
}

/**
 * Creates an anchor opening tag.
 *
 * @param {string} url         The url.
 * @param {Object} [params={}] Optional extra params for in the url.
 *
 * @returns {string} The anchor opening tag.
 */
function createAnchorOpeningTag(url, params = {}) {
  return getShortlinker().createAnchorOpeningTag(url, params);
}
//# sourceMappingURL=singleton.js.map
