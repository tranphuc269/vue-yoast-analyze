"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	const text = paper.getText();
	const locale = paper.getLocale();
	const language = (0, _getLanguage2.default)(locale);
	const sentences = (0, _getSentences2.default)(text).map(function (sentence) {
		return new _Sentence2.default(sentence, locale);
	});
	const totalNumberSentences = sentences.length;

	if (morphologicalLanguages.includes(language)) {
		return {
			total: totalNumberSentences,
			passives: getMorphologicalPassives(sentences, language)
		};
	}
	if (periphrasticLanguages.includes(language)) {
		return {
			total: totalNumberSentences,
			passives: getPeriphrasticPassives(sentences, language)
		};
	}
	if (morphologicalAndPeriphrasticLanguages.includes(language)) {
		return {
			total: totalNumberSentences,
			passives: getMorphologicalAndPeriphrasticPassive(sentences, language)
		};
	}
};

var _getSentences = require("../stringProcessing/getSentences.js");

var _getSentences2 = _interopRequireDefault(_getSentences);

var _stripHTMLTags = require("../stringProcessing/stripHTMLTags.js");

var _getLanguage = require("../helpers/getLanguage.js");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _Sentence = require("../values/Sentence.js");

var _Sentence2 = _interopRequireDefault(_Sentence);

var _lodashEs = require("lodash-es");

var _determinePassiveSentencePart = require("./passiveVoice/periphrastic/determinePassiveSentencePart.js");

var _determinePassiveSentencePart2 = _interopRequireDefault(_determinePassiveSentencePart);

var _determinePassiveSentence = require("./passiveVoice/morphological/determinePassiveSentence.js");

var _determinePassiveSentence2 = _interopRequireDefault(_determinePassiveSentence);

var _getSentenceParts = require("./passiveVoice/periphrastic/getSentenceParts.js");

var _getSentenceParts2 = _interopRequireDefault(_getSentenceParts);

var _getSentencePartsSplitOnStopwords = require("./passiveVoice/periphrastic/getSentencePartsSplitOnStopwords.js");

var _getSentencePartsSplitOnStopwords2 = _interopRequireDefault(_getSentencePartsSplitOnStopwords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const morphologicalLanguages = ["ru", "tr", "sv", "id", "ar", "he", "tr"];
const periphrasticLanguages = ["en", "de", "nl", "fr", "es", "it", "pt", "cn", "pl"];
const morphologicalAndPeriphrasticLanguages = ["hu"];

/**
 * Looks for morphological passive voice.
 *
 * @param {Array} sentences Sentences extracted from the text.
 * @param {string} language Language of the text.
 * @returns {Object} The found passive sentences.
 */
const getMorphologicalPassives = function getMorphologicalPassives(sentences, language) {
	const passiveSentences = [];

	(0, _lodashEs.forEach)(sentences, function (sentence) {
		const strippedSentence = (0, _stripHTMLTags.stripFullTags)(sentence.getSentenceText()).toLocaleLowerCase();

		sentence.setPassive((0, _determinePassiveSentence2.default)(strippedSentence, language));

		if (sentence.isPassive() === true) {
			passiveSentences.push(sentence.getSentenceText());
		}
	});

	return passiveSentences;
};

/**
 * Looks for periphrastic passive voice.
 *
 * @param {Array} sentences Sentences extracted from the text.
 * @param {string} language Language of the text.
 * @returns {Object} The found passive sentences.
 */
const getPeriphrasticPassives = function getPeriphrasticPassives(sentences, language) {
	const passiveSentences = [];

	(0, _lodashEs.forEach)(sentences, function (sentence) {
		const strippedSentence = (0, _stripHTMLTags.stripFullTags)(sentence.getSentenceText()).toLocaleLowerCase();

		// The functionality based on sentencePart objects should be rewritten using array indices of stopwords and auxiliaries.
		let sentenceParts = [];

		if (language === "de" || language === "nl" || language === "pl" || language === "hu") {
			sentenceParts = (0, _getSentencePartsSplitOnStopwords2.default)(strippedSentence, language);
		} else {
			sentenceParts = (0, _getSentenceParts2.default)(strippedSentence, language);
		}

		let passive = false;
		(0, _lodashEs.forEach)(sentenceParts, function (sentencePart) {
			sentencePart.setPassive((0, _determinePassiveSentencePart2.default)(sentencePart.getSentencePartText(), sentencePart.getAuxiliaries(), language));
			passive = passive || sentencePart.isPassive();
		});
		if (passive) {
			passiveSentences.push(sentence.getSentenceText());
		}
	});

	return passiveSentences;
};

/**
 * Looks for both morphological and periphrastic passive voice
 *
 * @param {Array} sentences Sentences extracted from the text.
 * @param {string} language Language of the text.
 *
 * @returns {Object} The found passive sentences.
 */
const getMorphologicalAndPeriphrasticPassive = function getMorphologicalAndPeriphrasticPassive(sentences, language) {
	const morphologicalSentences = getMorphologicalPassives(sentences, language);
	const periphrasticSentences = getPeriphrasticPassives(sentences, language);

	return morphologicalSentences.concat(periphrasticSentences);
};

/**
 * Determines the number of passive sentences in the text.
 *
 * @param {Paper} paper The paper object to get the text from.
 * @returns {Object} The total number of sentences in the text and the found passive sentences.
 */
//# sourceMappingURL=getPassiveVoice.js.map
