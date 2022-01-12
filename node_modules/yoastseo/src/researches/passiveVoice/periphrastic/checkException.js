"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	if ((0, _lodashEs.isEmpty)(this.getParticiple())) {
		this.setSentencePartPassiveness(false);
		return;
	}

	this.setSentencePartPassiveness(this.isPassive());
};

var _lodashEs = require("lodash-es");
//# sourceMappingURL=checkException.js.map
