"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper, researcher) {
	const topicForms = researcher.getResearch("morphology");
	const parsedSlug = (0, _parseSlug2.default)(paper.getUrl());

	let keyphraseInSlug = (0, _findKeywordFormsInString.findTopicFormsInString)(topicForms, parsedSlug, false, paper.getLocale());
	/* In case we deal with a language where dashes are part of the word (e.g., in Indonesian: buku-buku),
  * Try looking for the keywords in the unparsed slug.
  */
	if (keyphraseInSlug.percentWordMatches === 0) {
		const unparsedSlug = paper.getUrl();
		keyphraseInSlug = (0, _findKeywordFormsInString.findTopicFormsInString)(topicForms, unparsedSlug, false, paper.getLocale());
	}
	return {
		keyphraseLength: topicForms.keyphraseForms.length,
		percentWordMatches: keyphraseInSlug.percentWordMatches
	};
};

var _parseSlug = require("../stringProcessing/parseSlug");

var _parseSlug2 = _interopRequireDefault(_parseSlug);

var _findKeywordFormsInString = require("./findKeywordFormsInString.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=keywordCountInUrl.js.map
