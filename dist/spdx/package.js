'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Package = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // SPDX-License-Identifier: MIT

var _config = require('./config');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _document = require('./document');

var _document2 = _interopRequireDefault(_document);

var _creationinfo = require('./creationinfo');

var _creationinfo2 = _interopRequireDefault(_creationinfo);

var _checksum = require('./checksum');

var _checksum2 = _interopRequireDefault(_checksum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hash = require('object-hash');

var Package = exports.Package = function () {
  /*
  Represent an analyzed Package.
    Fields:
     - name : Mandatory, string.
     - version: Optional, string.
     - file_name: Optional, string.
     - supplier: Optional, Organization or Person or NO_ASSERTION.
     - originator: Optional, Organization or Person.
     - download_location: Mandatory, URL as string.
     - homepage: Optional, URL as string or NONE or NO_ASSERTION.
     - verif_code: Mandatory string.
     - check_sum: Optional , spdx.checksum.Algorithm.
     - source_info: Optional string.
     - conc_lics: Mandatory spdx.document.License or spdx.utils.SPDXNone or
     - spdx.utils.NoAssert.
     - license_declared : Mandatory spdx.document.License or spdx.utils.SPDXNone or
     - spdx.utils.NoAssert.
     - license_comment  : optional string.
     - licenses_from_files: list of spdx.document.License or spdx.utils.SPDXNone or
     - spdx.utils.NoAssert.
     - cr_text: Copyright text, string , utils.NoAssert or utils.SPDXNone. Mandatory.
     - summary: Optional str.
     - description: Optional str.
     - files: List of files in package, atleast one.
     - verif_exc_files : list of file names excluded from verification code or None.
  */
  function Package(name, download_location, version, file_name, supplier, originator) {
    _classCallCheck(this, Package);

    this.name = name;
    this.version = version;
    this.file_name = file_name;
    this.supplier = supplier;
    this.originator = originator;
    this.download_location = download_location;
    this.homepage = null;
    this.verif_code = null;
    this.check_sum = null;
    this.source_info = null;
    this.conc_lics = null;
    this.license_declared = null;
    this.license_comment = null;
    this.licenses_from_files = [];
    this.cr_text = null;
    this.summary = null;
    this.description = null;
    this.files = [];
    this.verif_exc_files = [];
    this.license_from_files = [];
  }

  _createClass(Package, [{
    key: 'add_file',
    value: function add_file(fil) {
      this.files.push(fil);
    }
  }, {
    key: 'add_lics_from_file',
    value: function add_lics_from_file(lics) {
      this.license_from_files.push(lics);
    }
  }, {
    key: 'add_exc_file',
    value: function add_exc_file(filename) {
      this.verif_exc_files.push(filename);
    }
  }, {
    key: 'validate',
    value: function validate(messages) {
      /*
      Validate the package fields.
      Append user friendly error messages to the `messages` list.
      */
      messages = this.validate_checksum(messages);
      messages = this.validate_optional_str_fields(messages);
      messages = this.validate_mandatory_str_fields(messages);
      messages = this.validate_files(messages);
      messages = this.validate_mandatory_fields(messages);
      messages = this.validate_optional_fields(messages);
      return messages;
    }
  }, {
    key: 'validate_optional_fields',
    value: function validate_optional_fields(messages) {
      if (this.originator && (this.originator instanceof _utils2.default || this.originator instanceof _creationinfo2.default)) {
        messages = messages + ' [Package originator must be instance of spdx.utils.NoAssert or spdx.creationinfo.Creator]';
      }
      if (this.supplier && (this.supplier instanceof _utils2.default || this.supplier instanceof _creationinfo2.default)) {
        messages = messages + ' [Package supplier must be instance of spdx.utils.NoAssert or spdx.creationinfo.Creator]';
      }
      return messages;
    }
  }, {
    key: 'validate_mandatory_fields',
    value: function validate_mandatory_fields(mssages) {
      if (!(this.conc_lics instanceof _utils2.default || this.conc_lics instanceof _utils2.default || this.conc_lics instanceof _document2.default)) {
        messages = messages + ' [Package concluded license must be instance of spdx.utils.SPDXNone or spdx.utils.NoAssert or spdx.document.License]';
      }
      if (!(this.license_declared instanceof _utils2.default || this.license_declared instanceof _utils2.default || this.license_declared instanceof _document2.default)) {
        messages = messages + ' [Package declared license must be instance of spdx.utils.SPDXNone or spdx.utils.NoAssert or spdx.document.License]';
      }
      // #TODO: Complete this
      if (!this.licenses_from_files) {
        messages = messages + ' [Package licenses_from_files can not be empty]';
      }
      return messages;
    }
  }, {
    key: 'validate_files',
    value: function validate_files(messages) {
      if (!this.files) {
        messages = messages + ' [Package must have at least one file]';
      } else {
        for (var i = 0; i < this.files.length; i++) {
          messages = this.files[i].validate(messages);
        }
      }
      return messages;
    }
  }, {
    key: 'validate_optional_str_fields',
    value: function validate_optional_str_fields(messages) {
      /*
      Fields marked as optional and of type string in class
          docstring must be of a type that provides __str__ method.
      */
      var FIELDS = ['file_name', 'version', 'homepage', 'source_info', 'summary', 'description'];
      messages = this.validate_str_fields(FIELDS, true, messages);
      return messages;
    }
  }, {
    key: 'validate_mandatory_str_fields',
    value: function validate_mandatory_str_fields(messages) {
      /*
      Fields marked as Mandatory and of type string in class
      docstring must be of a type that provides __str__ method.
      */
      var FIELDS = ['name', 'download_location', 'verif_code', 'cr_text'];
      messages = this.validate_str_fields(FIELDS, false, messages);

      return messages;
    }
  }, {
    key: 'validate_str_fields',
    value: function validate_str_fields(messages) {
      /*
      Helper for validate_mandatory_str_field and
          validate_optional_str_fields
      */
      // #TODO: Complete this
      return messages;
    }
  }, {
    key: 'validate_checksum',
    value: function validate_checksum(messages) {
      if (!(this.check_sum instanceof _checksum2.default)) {
        messages = messages + ' [Package checksum must be instance of spdx.checksum.Algorithm]';
      } else if (this.check_sum.identifier !== 'SHA1') {
        messages = messages + ' [File checksum algorithm must be SHA1]';
      }
      return messages;
    }
  }, {
    key: 'calc_verif_code',
    value: function calc_verif_code() {
      // TODO: Complete this
      return '';
    }
  }, {
    key: 'has_optional_field',
    value: function has_optional_field(field) {
      // TODO: Complete this
    }
  }]);

  return Package;
}();

module.exports = {
  Package: Package
};