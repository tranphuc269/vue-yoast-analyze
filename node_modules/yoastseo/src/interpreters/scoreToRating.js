"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Interpreters a score and gives it a particular rating.
 *
 * @param {Number} score The score to interpreter.
 * @returns {string} The rating, given based on the score.
 */
const ScoreToRating = function ScoreToRating(score) {
	if (score === -1) {
		return "error";
	}

	if (score === 0) {
		return "feedback";
	}

	if (score <= 4) {
		return "bad";
	}

	if (score > 4 && score <= 7) {
		return "ok";
	}

	if (score > 7) {
		return "good";
	}

	return "";
};

exports.default = ScoreToRating;
//# sourceMappingURL=scoreToRating.js.map
