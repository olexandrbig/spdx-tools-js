'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.license_parser_2 = exports.license_parser_1 = exports.conjunction_parser_2 = exports.conjunction_parser_1 = exports.disjunction_parser_2 = exports.disjunction_parser_1 = exports.get_token_list = exports.license_disjunction = exports.license_conjunction = exports.license_lexer = exports.whitespace_lexer = exports.or_lexer = exports.and_lexer = exports.rp_lexer = exports.lp_lexer = exports.gen_tokenizer = exports.tokens = exports.max = exports.SPDXNone = exports.UnKnown = exports.NoAssert = exports.datetime_iso_format = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // SPDX-License-Identifier: MIT

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lexr = require('lexr');
var Lexer = require("lex");

var datetime_iso_format = exports.datetime_iso_format = function datetime_iso_format(dateTime) {
  // Return an ISO-8601 representation of a datetime object.
  console.log((0, _moment2.default)(dateTime).toISOString());
  return (0, _moment2.default)(dateTime).toISOString();
};

var NoAssert = exports.NoAssert = function () {
  function NoAssert() {
    _classCallCheck(this, NoAssert);
  }

  _createClass(NoAssert, [{
    key: 'to_value',

    // Represent SPDX NOASSERTION value.
    value: function to_value() {
      return 'NOASSERTION';
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.to_value();
    }
  }]);

  return NoAssert;
}();

var UnKnown = exports.UnKnown = function () {
  function UnKnown() {
    _classCallCheck(this, UnKnown);
  }

  _createClass(UnKnown, [{
    key: 'to_value',

    // Represent SPDX UNKNOWN value.
    value: function to_value() {
      return 'NOASSERTION';
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.to_value();
    }
  }]);

  return UnKnown;
}();

var SPDXNone = exports.SPDXNone = function () {
  function SPDXNone() {
    _classCallCheck(this, SPDXNone);
  }

  _createClass(SPDXNone, [{
    key: 'to_value',

    // Represent SPDX None value.
    value: function to_value() {
      return 'NONE';
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.to_value();
    }
  }]);

  return SPDXNone;
}();

var max = exports.max = function max(item1, item2) {
  if (item2 > item1) {
    return item2;
  }
  if (item2 < item1) {
    return item1;
  }
  return null;
};

// TOKENIZER

var tokens = exports.tokens = {
  LP: /[(]/,
  RP: /[)]/,
  AND: /and|AND/g,
  OR: /or|OR/g,
  LICENSE: /[A-Za-z.0-9\-+]+/
};

var gen_tokenizer = exports.gen_tokenizer = function gen_tokenizer() {
  var tokenizer = new lexr.Tokenizer("");
  var tokens = {
    LP: /[(]/,
    RP: /[)]/,
    AND: /and|AND/,
    OR: /or|OR/,
    LICENSE: /[A-Za-z.0-9\-+]+/
  };
  tokenizer.addTokenSet(tokens);
  tokenizer.ignoreWhiteSpace();
  tokenizer.ignoreNewLine();
  return tokenizer;
};

// exports.tokenizer = tokenizer();


//  LEXERS
var lp_lexer = exports.lp_lexer = function lp_lexer(lexer_input) {
  var lexer = new Lexer();

  lexer.addRule(/[(]/g, function (lexeme) {
    console.log(lexeme);
  });

  lexer.setInput(lexer_input);

  lexer.lex();
};

var rp_lexer = exports.rp_lexer = function rp_lexer(lexer_input) {
  var lexer = new Lexer();

  lexer.addRule(/[)]/g, function (lexeme) {
    console.log(lexeme);
  });

  lexer.setInput(lexer_input);

  lexer.lex();
};

var and_lexer = exports.and_lexer = function and_lexer(lexer_input) {
  var lexer = new Lexer();

  lexer.addRule(/and|AND/g, function (lexeme) {
    console.log(lexeme);
  });

  lexer.setInput(lexer_input);

  lexer.lex();
};

var or_lexer = exports.or_lexer = function or_lexer(lexer_input) {
  var lexer = new Lexer();

  lexer.addRule(/or|OR/g, function (lexeme) {
    console.log(lexeme);
  });

  lexer.setInput(lexer_input);

  lexer.lex();
};

var whitespace_lexer = exports.whitespace_lexer = function whitespace_lexer(lexer_input) {
  var lexer = new Lexer();

  lexer.addRule(/^\s+$/, function (lexeme) {
    console.log(lexeme);
  });

  lexer.setInput(lexer_input);

  lexer.lex();
};

var license_lexer = exports.license_lexer = function license_lexer(lexer_input) {
  var lexer = new Lexer();

  lexer.addRule(/[A-Za-z.0-9\-+]+/, function (lexeme) {
    console.log(lexeme);
  });

  lexer.setInput(lexer_input);

  lexer.lex();
};

// PARSER UTILS
var license_conjunction = exports.license_conjunction = function license_conjunction(license1, license2) {
  if (license1 === license2) {
    return '{license1} AND {license2}';
  }
  return undefined;
};

var license_disjunction = exports.license_disjunction = function license_disjunction(license1, license2) {
  if (license1 === license2) {
    return '{license1} OR {license2}';
  }
  return undefined;
};

var get_token_list = exports.get_token_list = function get_token_list() {
  // TODO: Complete this method
  return [];
};

// PARSERS
var disjunction_parser_1 = exports.disjunction_parser_1 = function disjunction_parser_1(token_list) {
  return license_disjunction(token_list[1], token_list[3]);
};

var disjunction_parser_2 = exports.disjunction_parser_2 = function disjunction_parser_2(token_list) {
  return token_list[1];
};

var conjunction_parser_1 = exports.conjunction_parser_1 = function conjunction_parser_1(token_list) {
  return license_conjunction(token_list[1], token_list[3]);
};

var conjunction_parser_2 = exports.conjunction_parser_2 = function conjunction_parser_2(token_list) {
  return token_list[1];
};

var license_parser_1 = exports.license_parser_1 = function license_parser_1(token_list) {
  return token_list[1];
};

var license_parser_2 = exports.license_parser_2 = function license_parser_2(token_list) {
  return token_list[2];
};

// export { tokenizer };


module.exports = {
  NoAssert: NoAssert,
  UnKnown: UnKnown,
  SPDXNone: SPDXNone,
  datetime_iso_format: datetime_iso_format
};