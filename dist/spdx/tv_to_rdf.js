'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tv_to_rdf = undefined;

var _loggers = require('./parsers/loggers');

var _loggers2 = _interopRequireDefault(_loggers);

var _tagvaluebuilder = require('./parsers/tagvaluebuilder');

var _tagvaluebuilder2 = _interopRequireDefault(_tagvaluebuilder);

var _rdf = require('./writers/rdf');

var _rdf2 = _interopRequireDefault(_rdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SPDX-License-Identifier: MIT

var tv_to_rdf = exports.tv_to_rdf = function tv_to_rdf(infile_name, outfile_name) {
  /*
  Convert a SPDX file from tag/value format to RDF format.
    Return True on sucess, False otherwise.
  */
};

var runLib = function runLib() {
  var cmdArguments = process.argv;
  cmdArguments.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });
  console.log(cmdArguments.length);
  if (cmdArguments.length < 3) {
    console.log('Usage: spdx-tv2rdf <tag-value-file> <rdf-file> Convert an SPDX tag/value document to RDF.');
  }
  var tvfile = cmdArguments[2];
  var rdffile = cmdArguments[3];
  var success = tv_to_rdf(tvfile, rdffile);
};