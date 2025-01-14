"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// SPDX-License-Identifier: MIT


var StandardLogger = exports.StandardLogger = function () {
  function StandardLogger() {
    _classCallCheck(this, StandardLogger);
  }

  _createClass(StandardLogger, [{
    key: "log",
    value: function log(msg) {
      console.log(msg);
    }
  }]);

  return StandardLogger;
}();

var FileLogger = exports.FileLogger = function () {
  function FileLogger(logfile) {
    _classCallCheck(this, FileLogger);

    this.dest = logfile;
  }

  _createClass(FileLogger, [{
    key: "log",
    value: function log(msg) {
      this.dest.write(msg + " \n");
    }
  }]);

  return FileLogger;
}();