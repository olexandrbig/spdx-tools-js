"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// SPDX-License-Identifier: MIT

var VERSION_REGEX = exports.VERSION_REGEX = /(\d+)\.(\d+)/gm;

var Version = function () {
  /*
  Version number composed of major and minor.
    Fields:
    - major: Major number, int.
    - minor: Minor number, int.
  */
  function Version(major, minor) {
    _classCallCheck(this, Version);

    console.log("in constructor");
    this.major = major;
    this.minor = minor;
  }

  _createClass(Version, [{
    key: "from_str",
    value: function from_str(value) {
      /*
      Constructs a Version from a string.
          Returns None if string not in N.N form where N represents a
          number.
      */
      var res = value.match(VERSION_REGEX);
      if (res) {
        return [res[1], res[2]];
      } else {
        return null;
      }
    }
  }, {
    key: "to_str",
    value: function to_str() {
      return "SPDX-" + this.major + "." + this.minor;
    }
  }, {
    key: "__eq__",
    value: function __eq__(other) {
      return this.major === other.major && this.minor === other.minor;
    }
  }, {
    key: "__lt__",
    value: function __lt__(other) {
      return this.major < other.major || this.major === other.major && this.minor < other.minor;
    }
  }]);

  return Version;
}();

exports.default = Version;