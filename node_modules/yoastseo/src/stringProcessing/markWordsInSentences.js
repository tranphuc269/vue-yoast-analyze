"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markWordsInSentences = markWordsInSentences;

var _matchTextWithArray = require("./matchTextWithArray");

var _matchTextWithArray2 = _interopRequireDefault(_matchTextWithArray);

var _createRegexFromArray = require("./createRegexFromArray");

var _createRegexFromArray2 = _interopRequireDefault(_createRegexFromArray);

var _addMarkSingleWord = require("../markers/addMarkSingleWord");

var _addMarkSingleWord2 = _interopRequireDefault(_addMarkSingleWord);

var _Mark = require("../values/Mark");

var _Mark2 = _interopRequireDefault(_Mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adds marks to a sentence and merges marks if those are only separated by a space
 * (e.g., if highlighting words "ballet" and "shoes" in a sentence "I have a lot of ballet shoes and other paraphernalia."
 * the marks will be put around "ballet shoes" together, not "`ballet` `shoes`".)
 *
 * @param {string}    sentence               The sentence to mark words in.
 * @param {[string]}  topicFoundInSentence   The words to mark in the sentence.
 *
 * @returns {string} The sentence with marks.
 */
const collectMarkingsInSentence = function collectMarkingsInSentence(sentence, topicFoundInSentence) {
  const markup = sentence.replace((0, _createRegexFromArray2.default)(topicFoundInSentence), function (x) {
    return (0, _addMarkSingleWord2.default)(x);
  });

  return markup.replace(new RegExp("</yoastmark> <yoastmark class='yoast-text-mark'>", "ig"), " ");
};

/**
 * Adds marks to an array of sentences.
 *
 * @param {[string]}    wordsToMark The words to mark.
 * @param {[string]}    sentences   The sentences in which to mark these words.
 * @param {string}      locale      The locale.
 *
 * @returns {[string]} The sentences with marks.
 */
function markWordsInSentences(wordsToMark, sentences, locale) {
  let topicFoundInSentence = [];
  let markings = [];

  sentences.forEach(function (sentence) {
    topicFoundInSentence = (0, _matchTextWithArray2.default)(sentence, wordsToMark, locale).matches;

    if (topicFoundInSentence.length > 0) {
      markings = markings.concat(new _Mark2.default({
        original: sentence,
        marked: collectMarkingsInSentence(sentence, topicFoundInSentence)
      }));
    }
  });

  return markings;
}
//# sourceMappingURL=markWordsInSentences.js.map
