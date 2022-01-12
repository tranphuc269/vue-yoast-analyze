"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchString, positiveLookAhead = false, extraWordBoundary = "", locale = "") {
  var wordBoundary, wordBoundaryStart, wordBoundaryEnd;

  if (locale === "id_ID") {
    wordBoundary = "[ \\u00a0 \\n\\r\\t\.,\(\)”“〝〞〟‟„\"+;!¡?¿:\/»«‹›" + extraWordBoundary + "<>";
  } else {
    /*
     * \u00a0 - no-break space
           * \u06d4 - Urdu full stop
           * \u061f - Arabic question mark
           * \u060C - Arabic comma
           * \u061B - Arabic semicolon
           */
    wordBoundary = "[ \\u00a0\\u06d4\\u061f\\u060C\\u061B \\n\\r\\t\.,\(\)”“〝〞〟‟„\"+\\-;!¡?¿:\/»«‹›" + extraWordBoundary + "<>";
  }

  wordBoundaryStart = "(^|" + wordBoundary + "'‘’‛`])";
  if (positiveLookAhead) {
    wordBoundaryEnd = "($|((?=" + wordBoundary + "]))|((['‘’‛`])(" + wordBoundary + "])))";
  } else {
    wordBoundaryEnd = "($|(" + wordBoundary + "])|((['‘’‛`])(" + wordBoundary + "])))";
  }

  return wordBoundaryStart + matchString + wordBoundaryEnd;
};
//# sourceMappingURL=addWordboundary.js.map
