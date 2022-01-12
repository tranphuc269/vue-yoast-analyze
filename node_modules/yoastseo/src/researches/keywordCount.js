"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper, researcher) {
	const topicForms = researcher.getResearch("morphology");
	const text = paper.getText();
	const locale = paper.getLocale();

	const sentences = (0, _getSentences2.default)(text);

	const keywordsFound = {
		count: 0,
		matches: [],
		sentencesWithKeywords: []
	};

	/*
  * Count the amount of key phrase occurrences in the sentences.
  * An occurrence is counted when all keywords of the key phrase are contained within the sentence.
  * Each sentence can contain multiple key phrases
  * (e.g. "The apple potato is an apple and a potato." has two occurrences of the key phrase "apple potato").
  */
	sentences.forEach(sentence => {
		const matchesInSentence = topicForms.keyphraseForms.map(keywordForms => (0, _matchTextWithArray2.default)(sentence, keywordForms, locale));
		const hasAllKeywords = matchesInSentence.every(keywordForm => keywordForm.count > 0);

		if (hasAllKeywords) {
			const counts = matchesInSentence.map(match => match.count);
			const foundWords = (0, _lodashEs.flattenDeep)(matchesInSentence.map(match => match.matches));
			keywordsFound.count += Math.min(...counts);
			keywordsFound.matches.push(foundWords);
			keywordsFound.sentencesWithKeywords.push(sentence);
		}
	});

	const matches = (0, _lodashEs.uniq)((0, _lodashEs.flattenDeep)(keywordsFound.matches)).sort((a, b) => b.length - a.length);

	return {
		count: keywordsFound.count,
		matches: matches,
		markings: (0, _markWordsInSentences.markWordsInSentences)(matches, keywordsFound.sentencesWithKeywords, locale),
		length: topicForms.keyphraseForms.length
	};
};

var _matchTextWithArray = require("../stringProcessing/matchTextWithArray");

var _matchTextWithArray2 = _interopRequireDefault(_matchTextWithArray);

var _lodashEs = require("lodash-es");

var _getSentences = require("../stringProcessing/getSentences");

var _getSentences2 = _interopRequireDefault(_getSentences);

var _markWordsInSentences = require("../stringProcessing/markWordsInSentences");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=keywordCount.js.map
