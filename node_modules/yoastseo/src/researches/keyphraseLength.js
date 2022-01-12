"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (paper, researcher) {
  const topicForms = researcher.getResearch("morphology");

  return topicForms.keyphraseForms.length;
};
//# sourceMappingURL=keyphraseLength.js.map
