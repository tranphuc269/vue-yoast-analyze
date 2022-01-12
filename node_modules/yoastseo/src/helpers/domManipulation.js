"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

/**
 * Adds a class to an element
 *
 * @param {HTMLElement} element The element to add the class to.
 * @param {string} className The class to add.
 * @returns {void}
 */
var addClass = function addClass(element, className) {
  var classes = element.className.split(" ");

  if (-1 === classes.indexOf(className)) {
    classes.push(className);
  }

  element.className = classes.join(" ");
};

/**
 * Removes a class from an element
 *
 * @param {HTMLElement} element The element to remove the class from.
 * @param {string} className The class to remove.
 * @returns {void}
 */
var removeClass = function removeClass(element, className) {
  var classes = element.className.split(" ");
  var foundClass = classes.indexOf(className);

  if (-1 !== foundClass) {
    classes.splice(foundClass, 1);
  }

  element.className = classes.join(" ");
};

/**
 * Removes multiple classes from an element
 *
 * @param {HTMLElement} element The element to remove the classes from.
 * @param {Array} classes A list of classes to remove
 * @returns {void}
 */
var removeClasses = function removeClasses(element, classes) {
  (0, _lodashEs.forEach)(classes, this.removeClass.bind(null, element));
};

/**
 * Checks whether an element has a specific class.
 *
 * @param {HTMLElement} element The element to check for the class.
 * @param {string} className The class to look for.
 * @returns {boolean} Whether or not the class is present.
 */
var hasClass = function hasClass(element, className) {
  return element.className.indexOf(className) > -1;
};

exports.default = {
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  removeClasses: removeClasses
};
//# sourceMappingURL=domManipulation.js.map
