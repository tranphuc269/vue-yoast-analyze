"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripBlockTagsAtStartEnd = exports.stripIncompleteTags = exports.stripFullTags = undefined;

var _stripSpaces = require("../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _html = require("../helpers/html.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module stringProcessing/stripHTMLTags */

var blockElementStartRegex = new RegExp("^<(" + _html.blockElements.join("|") + ")[^>]*?>", "i");
var blockElementEndRegex = new RegExp("</(" + _html.blockElements.join("|") + ")[^>]*?>$", "i");

/**
 * Strip incomplete tags within a text. Strips an endtag at the beginning of a string and the start tag at the end of a
 * start of a string.
 * @param {String} text The text to strip the HTML-tags from at the begin and end.
 * @returns {String} The text without HTML-tags at the begin and end.
 */
var stripIncompleteTags = function stripIncompleteTags(text) {
  text = text.replace(/^(<\/([^>]+)>)+/i, "");
  text = text.replace(/(<([^/>]+)>)+$/i, "");
  return text;
};

/**
 * Removes the block element tags at the beginning and end of a string and returns this string.
 *
 * @param {string} text The unformatted string.
 * @returns {string} The text with removed HTML begin and end block elements
 */
var stripBlockTagsAtStartEnd = function stripBlockTagsAtStartEnd(text) {
  text = text.replace(blockElementStartRegex, "");
  text = text.replace(blockElementEndRegex, "");
  return text;
};

/**
 * Strip HTML-tags from text
 *
 * @param {String} text The text to strip the HTML-tags from.
 * @returns {String} The text without HTML-tags.
 */
var stripFullTags = function stripFullTags(text) {
  text = text.replace(/(<([^>]+)>)/ig, " ");
  text = (0, _stripSpaces2.default)(text);
  return text;
};

exports.stripFullTags = stripFullTags;
exports.stripIncompleteTags = stripIncompleteTags;
exports.stripBlockTagsAtStartEnd = stripBlockTagsAtStartEnd;
exports.default = {
  stripFullTags: stripFullTags,
  stripIncompleteTags: stripIncompleteTags,
  stripBlockTagsAtStartEnd: stripBlockTagsAtStartEnd
};
//# sourceMappingURL=stripHTMLTags.js.map
