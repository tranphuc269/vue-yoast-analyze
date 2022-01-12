"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	text = (0, _unifyWhitespace.unifyNonBreakingSpace)(text);
	let blocks = (0, _html.getBlocks)(text);

	// Split each block on newlines.
	blocks = (0, _lodashEs.flatMap)(blocks, function (block) {
		return block.split(newLineRegex);
	});

	const sentences = (0, _lodashEs.flatMap)(blocks, getSentencesFromBlockCached);

	return (0, _lodashEs.filter)(sentences, (0, _lodashEs.negate)(_lodashEs.isEmpty));
};

var _lodashEs = require("lodash-es");

var _html = require("../helpers/html.js");

var _unifyWhitespace = require("../stringProcessing/unifyWhitespace.js");

var _SentenceTokenizer = require("./SentenceTokenizer");

var _SentenceTokenizer2 = _interopRequireDefault(_SentenceTokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Character classes.
// Lodash imports.
const newLines = "\n\r|\n|\r";

// Regular expressions.


// Internal dependencies.
const newLineRegex = new RegExp(newLines);

/**
 * Returns the sentences from a certain block.
 *
 * @param {string} block The HTML inside a HTML block.
 * @returns {Array<string>} The list of sentences in the block.
 */
function getSentencesFromBlock(block) {
	const sentenceTokenizer = new _SentenceTokenizer2.default();

	var _sentenceTokenizer$cr = sentenceTokenizer.createTokenizer();

	const tokenizer = _sentenceTokenizer$cr.tokenizer,
	      tokens = _sentenceTokenizer$cr.tokens;

	sentenceTokenizer.tokenize(tokenizer, block);

	return tokens.length === 0 ? [] : sentenceTokenizer.getSentencesFromTokens(tokens);
}

const getSentencesFromBlockCached = (0, _lodashEs.memoize)(getSentencesFromBlock);

/**
 * Returns sentences in a string.
 *
 * @param {String} text The string to count sentences in.
 * @returns {Array} Sentences found in the text.
 */
//# sourceMappingURL=getSentences.js.map
