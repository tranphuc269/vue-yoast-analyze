"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	var paragraphs = getParagraphsInTags(text);

	if (paragraphs.length > 0) {
		return paragraphs;
	}

	// If no <p> tags found, split on double linebreaks.
	var blocks = (0, _html.getBlocks)(text);

	blocks = (0, _lodashEs.filter)(blocks, function (block) {
		// Match explicit paragraph tags, or if a block has no HTML tags.
		return 0 !== block.indexOf("<h");
	});

	paragraphs = (0, _lodashEs.flatMap)(blocks, function (block) {
		return block.split("\n\n");
	});

	if (paragraphs.length > 0) {
		return paragraphs;
	}

	// If no paragraphs are found, return an array containing the entire text.
	return [text];
};

var _lodashEs = require("lodash-es");

var _html = require("../helpers/html");

/**
 * Matches the paragraphs in <p>-tags and returns the text in them.
 * @param {string} text The text to match paragraph in.
 * @returns {array} An array containing all paragraphs texts.
 */
var getParagraphsInTags = function getParagraphsInTags(text) {
	var paragraphs = [];
	// Matches everything between the <p> and </p> tags.
	var regex = /<p(?:[^>]+)?>(.*?)<\/p>/ig;
	var match;

	while ((match = regex.exec(text)) !== null) {
		paragraphs.push(match);
	}

	// Returns only the text from within the paragraph tags.
	return (0, _lodashEs.map)(paragraphs, function (paragraph) {
		return paragraph[1];
	});
};

/**
 * Returns an array with all paragraphs from the text.
 * @param {string} text The text to match paragraph in.
 * @returns {Array} The array containing all paragraphs from the text.
 */
//# sourceMappingURL=matchParagraphs.js.map
