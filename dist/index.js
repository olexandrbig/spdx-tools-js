'use strict';

var _utils = require('./spdx/utils');

var _checksum = require('./spdx/checksum');

var _checksum2 = _interopRequireDefault(_checksum);

var _tagvalue = require('./spdx/writers/tagvalue');

var _version = require('./spdx/version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SPDX-License-Identifier: MIT

var documentjs = require('./spdx/document');
var creationinfojs = require('./spdx/creationinfo');
var packagejs = require('./spdx/package');
var filejs = require('./spdx/file');
var utilsjs = require('./spdx/utils');
var path = require('path');
// import Document  from './spdx/document';
// import License from './spdx/document';

var moo = require('moo');

var printMsg = function printMsg() {
  var txt = "Javascript (tools) python. 1.9 and BSD-3.4";
  console.log(txt);
  // const tknizer = gen_tokenizer().tokenize(txt);
  // console.log(tokens);
  // console.log(tknizer);
  // const new_algo = new Algorithm("ID1", "VAL1");
  // console.log(new_algo.to_tv())
  // let lexer = moo.compile({
  //     WS:      /[ \t]+/,
  //     comment: /\/\/.*?$/,
  //     number:  /0|[1-9][0-9]*/,
  //     string:  /"(?:\\["\\]|[^\n"\\])*"/,
  //     lparen:  '(',
  //     rparen:  ')',
  //     keyword: ['while', 'if', 'else', 'moo', 'cows', '<text>'],
  //     NL:      { match: /\n/, lineBreaks: true },
  //     string99:  /(?:^|\s)text(?:\s|$)/,
  //   })
  // lexer.reset("while <text> (10) cows\nmoo")
  // console.log(lexer)
  // console.log(lexer.next())
  // console.log(lexer.next())
  // console.log(lexer.next())
  // console.log(lexer.next())
  // console.log(lexer.next())
  // process.argv.forEach(function (val, index, array) {
  // console.log(index + ': ' + val);
  // });
  // console.log(process.argv.length)
};

exports.printMsg = printMsg();
console.log("START");

var license_fxt = function license_fxt(item1, item2) {
  return [item1, item2];
};
var version = new _version2.default(2, 1);
var license = new documentjs.License();
var license_from_id = license.from_identifier(license_fxt, 'CC0-1.0');
var doc = new documentjs.Document(version, license);
doc.comment = "notice";
var tool_name = 'SPDX JS';
var tool_version = "1.0";
var tool = new creationinfojs.Tool(tool_name + ' ' + tool_version);
doc.creation_info.add_creator(tool);
doc.creation_info.set_created_now();
doc.add_extr_lic("spdx license");
console.log(doc);
var input_path = "~/Desktop/pn/spdx-tools-js";
var package_ = doc.package = new packagejs.Package(path.basename(input_path), new utilsjs.NoAssert());
package_.cr_text = "Copyright";
package_.add_lics_from_file("spdx license");
console.log(package_);

// simulate the creation of just one file
var file_name = "File name";
var file_entry = new filejs.SpdxFile(file_name, "", new _checksum2.default('SHA1', ''));
file_entry.add_lics("spdx license");
file_entry.add_lics(new utilsjs.NoAssert());
file_entry.conc_lics = new utilsjs.NoAssert();
file_entry.copyright = new utilsjs.NoAssert();
package_.add_file(file_entry);
package_.verif_code = doc.package.calc_verif_code();
package_.license_declared = new utilsjs.NoAssert();
package_.conc_lics = new utilsjs.NoAssert();
console.log(package_.files.length);
console.log(file_entry);
if (package_.files) {
  var spdx_output = "doc.spdx";
  (0, _tagvalue.write_document)(doc, spdx_output, false);
}