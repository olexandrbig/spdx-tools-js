'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // SPDX-License-Identifier: MIT

var _config = require('./config');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _document = require('./document');

var _document2 = _interopRequireDefault(_document);

var _creationinfo = require('./creationinfo');

var _creationinfo2 = _interopRequireDefault(_creationinfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hash = require('object-hash');

var Review = function () {
  /*
  Document review information.
    Fields:
    - reviewer: Person, Organization or tool that reviewed the SPDX file.
      Mandatory one.
    - review_date: Review date, mandatory one. Type: datetime.
    - comment: Review comment. Optional one. Type: str.
  */
  function Review(reviewer, review_date, comment) {
    _classCallCheck(this, Review);

    this.reviewer = reviewer;
    this.review_date = review_date;
    this.comment = comment;
  }

  _createClass(Review, [{
    key: '__eq__',
    value: function __eq__(other) {
      return other instanceof Review && this.reviewer === other.reviewer && this.review_date === other.review_date && this.coment === other.comment;
    }
  }, {
    key: '__lt__',
    value: function __lt__(other) {
      return this.reviewer < other.reviewer && this.review_date < other.review_date && this.coment < other.comment;
    }
  }, {
    key: 'set_review_date_now',
    value: function set_review_date_now() {
      this.review_date = moment();
    }
  }, {
    key: 'review_date_iso_format',
    value: function review_date_iso_format() {
      return (0, _utils.datetime_iso_format)(this.review_date);
    }
  }, {
    key: 'has_comment',
    value: function has_comment() {
      return this.comment ? true : false;
    }
  }, {
    key: 'validate',
    value: function validate(messages) {
      /*
      Returns True if all the fields are valid.
          Appends any error messages to messages parameter.
      */
      messages = this.validate_reviewer(messages);
      messages = this.validate_review_date(messages);
      return messages;
    }
  }, {
    key: 'validate_reviewer',
    value: function validate_reviewer(messages) {
      if (!this.reviewer) {
        messages = messages + ' [Review missing reviewer.]';
      }
      return messages;
    }
  }, {
    key: 'validate_review_date',
    value: function validate_review_date(messages) {
      if (!this.review_date) {
        messages = messages + ' [Review missing review date.]';
      }
      return messages;
    }
  }]);

  return Review;
}();

exports.default = Review;