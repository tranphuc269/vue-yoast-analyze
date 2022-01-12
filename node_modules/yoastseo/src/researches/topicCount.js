"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper, onlyKeyword = false) {
	const keyword = paper.getKeyword();
	const synonyms = (0, _parseSynonyms2.default)(paper.getSynonyms());
	const text = (0, _quotes.normalize)(paper.getText());
	const sentences = (0, _getSentences2.default)(text);
	let topicWords = [];

	if (onlyKeyword === true) {
		topicWords = topicWords.concat(keyword);
	} else {
		topicWords = topicWords.concat(keyword, synonyms).filter(Boolean);
		topicWords.sort((a, b) => b.length - a.length);
	}

	if ((0, _lodashEs.isEmpty)(topicWords)) {
		return {
			count: 0,
			matches: [],
			markings: [],
			matchesIndices: []
		};
	}

	let topicFound = [];
	let topicFoundInSentence = [];
	let markings = [];
	let indexOfSentence = 0;
	let indexRunningThroughSentence = 0;
	const matchesIndices = [];

	sentences.forEach(function (sentence) {
		topicFoundInSentence = (0, _matchTextWithArray2.default)(sentence, topicWords, paper.getLocale()).matches;
		if (topicFoundInSentence.length > 0) {
			topicFoundInSentence.forEach(function (occurrence) {
				const indexOfOccurrenceInSentence = sentence.indexOf(occurrence, indexRunningThroughSentence);
				matchesIndices.push({
					index: indexOfOccurrenceInSentence + indexOfSentence,
					match: occurrence
				});
				indexRunningThroughSentence += indexOfOccurrenceInSentence + occurrence.length;
			});

			markings = markings.concat(new _Mark2.default({
				original: sentence,
				marked: sentence.replace((0, _createRegexFromArray2.default)(topicFoundInSentence), function (x) {
					return (0, _addMarkSingleWord2.default)(x);
				})
			}));
		}

		topicFound = topicFound.concat(topicFoundInSentence);
		indexOfSentence += sentence.length + 1;
	});

	return {
		count: topicFound.length,
		matches: (0, _lodashEs.uniq)(topicFound).sort((a, b) => b.length - a.length),
		markings: markings,
		matchesIndices: matchesIndices
	};
};

var _matchTextWithArray = require("../stringProcessing/matchTextWithArray.js");

var _matchTextWithArray2 = _interopRequireDefault(_matchTextWithArray);

var _quotes = require("../stringProcessing/quotes.js");

var _parseSynonyms = require("../stringProcessing/parseSynonyms");

var _parseSynonyms2 = _interopRequireDefault(_parseSynonyms);

var _lodashEs = require("lodash-es");

var _getSentences = require("../stringProcessing/getSentences");

var _getSentences2 = _interopRequireDefault(_getSentences);

var _createRegexFromArray = require("../stringProcessing/createRegexFromArray");

var _createRegexFromArray2 = _interopRequireDefault(_createRegexFromArray);

var _addMarkSingleWord = require("../markers/addMarkSingleWord");

var _addMarkSingleWord2 = _interopRequireDefault(_addMarkSingleWord);

var _Mark = require("../values/Mark.js");

var _Mark2 = _interopRequireDefault(_Mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=topicCount.js.map
