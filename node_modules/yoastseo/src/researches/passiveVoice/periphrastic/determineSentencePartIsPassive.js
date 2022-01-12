"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (participles) {
	let passive = false;
	(0, _lodashEs.forEach)(participles, function (participle) {
		if (participle.determinesSentencePartIsPassive()) {
			passive = true;
		}
	});
	return passive;
};

var _lodashEs = require("lodash-es");
//# sourceMappingURL=determineSentencePartIsPassive.js.map
