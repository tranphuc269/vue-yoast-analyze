"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	var urlLength = paper.getUrl().length;
	var keywordLength = paper.getKeyword().length;
	var maxUrlLength = 40;
	var maxSlugLength = 20;

	if (urlLength > maxUrlLength && urlLength > keywordLength + maxSlugLength) {
		return true;
	}
	return false;
};
//# sourceMappingURL=urlIsTooLong.js.map
