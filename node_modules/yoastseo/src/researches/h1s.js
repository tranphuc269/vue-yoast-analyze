"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	const text = paper.getText();

	let blocks = (0, _html.getBlocks)(text);
	blocks = (0, _lodashEs.reject)(blocks, emptyBlock);

	const h1s = [];
	blocks.forEach((block, index) => {
		const match = h1Regex.exec(block);
		if (match) {
			h1s.push({
				tag: "h1",
				content: match[1],
				position: index
			});
		}
	});

	return h1s;
};

var _html = require("../helpers/html");

var _lodashEs = require("lodash-es");

const h1Regex = /<h1.*?>(.*?)<\/h1>/;

/**
 * Gets a block from a text and checks if it is totally empty or if it is an empty paragraph.
 *
 * @param {string} block A HTML block extracted from the paper.
 *
 * @returns {boolean} Whether the block is empty or not.
 */
const emptyBlock = function emptyBlock(block) {
	block = block.trim();
	return block === "<p></p>" || block === "";
};

/**
 * Gets all H1s in a text, including their content and their position with regards to other HTML blocks.
 *
 * @param {Paper} paper The paper for which to get the H1s.
 *
 * @returns {Array} An array with all H1s, their content and position.
 */
//# sourceMappingURL=h1s.js.map
