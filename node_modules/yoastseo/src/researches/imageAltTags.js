"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper, researcher) {
	const topicForms = researcher.getResearch("morphology");

	return matchAltProperties((0, _imageInText2.default)(paper.getText()), topicForms, paper.getLocale());
};

var _imageInText = require("../stringProcessing/imageInText");

var _imageInText2 = _interopRequireDefault(_imageInText);

var _getAlttagContent = require("../stringProcessing/getAlttagContent");

var _getAlttagContent2 = _interopRequireDefault(_getAlttagContent);

var _findKeywordFormsInString = require("../researches/findKeywordFormsInString");

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Matches the alt-tags in the images found in the text.
 * Returns an object with the totals and different alt-tags.
 *
 * @param {Array} imageMatches Array with all the matched images in the text
 * @param {Object} topicForms The object with the keyphrase and the synonyms forms from the paper.
 * @param {string} locale The locale used for transliteration.
 * @returns {object} altProperties Object with all alt-tags that were found.
 */
/** @module researches/imageAltTags */

const matchAltProperties = function matchAltProperties(imageMatches, topicForms, locale) {
	const altProperties = {
		noAlt: 0,
		withAlt: 0,
		withAltKeyword: 0,
		withAltNonKeyword: 0
	};

	for (let i = 0; i < imageMatches.length; i++) {
		const alttag = (0, _getAlttagContent2.default)(imageMatches[i]);

		// If no alt-tag is set
		if (alttag === "") {
			altProperties.noAlt++;
			continue;
		}

		// If no keyword is set, but the alt-tag is
		if ((0, _lodashEs.isEmpty)(topicForms.keyphraseForms)) {
			altProperties.withAlt++;
			continue;
		}

		// If the keyword is matched in the alt tag
		const keywordMatchedInAltTag = (0, _findKeywordFormsInString.findTopicFormsInString)(topicForms, alttag, true, locale);
		if (keywordMatchedInAltTag.percentWordMatches >= 50) {
			altProperties.withAltKeyword++;
			continue;
		}

		altProperties.withAltNonKeyword++;
	}

	return altProperties;
};

/**
 * Checks the text for images, checks the type of each image and alt attributes for containing keywords
 *
 * @param {Paper} paper The paper to check for images.
 * @param {Researcher} researcher The researcher to use for analysis.
 *
 * @returns {object} Object containing all types of found images
 */
//# sourceMappingURL=imageAltTags.js.map
