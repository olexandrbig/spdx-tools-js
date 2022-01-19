'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // SPDX-License-Identifier: MIT

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _general = require('../utils/general');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Annotation = function () {
  /*
  Document annotation information.
    Fields:
    - annotator: Person, Organization or tool that has commented on a file,
    package, or the entire document. Conditional (Mandatory, one), if there
    is an Annotation.
    - annotation_date: To identify when the comment was made. Conditional
    (Mandatory, one), if there is an Annotation. Type: datetime.
    - comment: Annotation comment. Conditional (Mandatory, one), if there is
    an Annotation. Type: str.
    - annotation_type: Annotation type. Conditional (Mandatory, one), if there is an
    Annotation. Type: str.
    - spdx_id: Uniquely identify the element in an SPDX document which is being
    referenced. Conditional (Mandatory, one), if there is an Annotation.
    Type: str.
  */
  function Annotation(identifier, value) {
    _classCallCheck(this, Annotation);

    this.annotator = annotator;
    this.annotation_date = annotation_date;
    this.comment = comment;
    this.annotation_type = annotation_type;
    this.spdx_id = spdx_id;
  }

  _createClass(Annotation, [{
    key: '__eq__',
    value: function __eq__(other) {
      return other instanceof Annotation && this.annotator === other.annotator && this.annotation_date === other.annotation_date && this.comment === other.comment;
    }
  }, {
    key: '__lt__',
    value: function __lt__(other) {
      return this.annotator < other.annotator && this.annotation_date < other.annotation_date && this.comment < other.comment;
    }
  }, {
    key: 'set_annotation_date_now',
    value: function set_annotation_date_now() {
      this.annotation_date = _moment2.default.utc().format();
    }
  }, {
    key: 'annotation_date_iso_format',
    value: function annotation_date_iso_format() {
      return (0, _general.datetime_iso_format)(this.annotation_date);
    }
  }, {
    key: 'has_comment',
    value: function has_comment() {
      return this.comment;
    }
  }, {
    key: 'validate',
    value: function validate(messages) {
      /*
      Returns True if all the fields are valid.
      Appends any error messages to messages parameter.
      */
      messages = this.validate_annotator(messages);
      messages = this.validate_annotation_date(messages);
      messages = this.validate_annotation_type(messages);
      messages = this.validate_spdx_id(messages);

      return messages;
    }
  }, {
    key: 'validate_annotator',
    value: function validate_annotator(messages) {
      if (!this.annotator) {
        messages = messages + ' [\'Annotation missing annotator.\']';
      }
      return messages;
    }
  }, {
    key: 'validate_annotation_date',
    value: function validate_annotation_date(messages) {
      if (!this.annotation_date) {
        messages = messages + ' [\'Annotation missing annotation date.\']';
      }
      return messages;
    }
  }, {
    key: 'validate_annotation_type',
    value: function validate_annotation_type(messages) {
      if (!this.annotation_type) {
        messages = messages + ' [\'Annotation missing annotation type.\']';
      }
      return messages;
    }
  }, {
    key: 'validate_spdx_id',
    value: function validate_spdx_id(messages) {
      if (this.spdx_id) {
        messages = messages + ' [\'Annotation missing SPDX Identifier Reference.\']';
      }
      return messages;
    }
  }]);

  return Annotation;
}();

exports.default = Annotation;