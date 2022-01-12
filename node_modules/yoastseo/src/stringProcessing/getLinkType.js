"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text, url) {
	const anchorUrl = _url2.default.getFromAnchorTag(text);

	/**
  * A link is "Other" if:
  * - The protocol is neither null, nor http, nor https.
  * - The link is a relative fragment URL (starts with #), because it won't navigate to another page.
  */
	const protocol = _url2.default.getProtocol(anchorUrl);
	if (protocol && !_url2.default.protocolIsHttpScheme(protocol) || _url2.default.isRelativeFragmentURL(anchorUrl)) {
		return "other";
	}

	if (_url2.default.isInternalLink(anchorUrl, _url2.default.getHostname(url))) {
		return "internal";
	}

	return "external";
};

var _url = require("./url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=getLinkType.js.map
