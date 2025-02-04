"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// SPDX-License-Identifier: MIT

var Algorithm = function () {
  // Generic checksum algorithm.
  function Algorithm(identifier, value) {
    _classCallCheck(this, Algorithm);

    this.identifier = identifier;
    this.value = value;
  }

  _createClass(Algorithm, [{
    key: "to_tv",
    value: function to_tv() {
      return this.identifier + ": " + this.value;
    }
  }]);

  return Algorithm;
}();

exports.default = Algorithm;