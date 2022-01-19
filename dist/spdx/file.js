'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpdxFile = exports.SpdxFileType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // SPDX-License-Identifier: MIT

var utilsjs = require('./utils');
var documentjs = require('./document');


var hash = require('object-hash');

var SpdxFileType = exports.SpdxFileType = function SpdxFileType() {
  _classCallCheck(this, SpdxFileType);

  var SOURCE = 1;
  var BINARY = 2;
  var ARCHIVE = 3;
  var OTHER = 4;
  this.SOURCE = SOURCE;
  this.BINARY = BINARY;
  this.ARCHIVE = ARCHIVE;
  this.OTHER = OTHER;
};

var SpdxFile = exports.SpdxFile = function () {
  /*
  Represent an SPDX file.
    Fields:
    - name: File name, str mandatory one.
    - spdx_id: Uniquely identify any element in an SPDX document which may be
    referenced by other elements. Mandatory, one. Type: str.
    - comment: File comment str, Optional zero or one.
    - type: one of FileType.SOURCE, FileType.BINARY, FileType.ARCHIVE
      and FileType.OTHER, optional zero or one.
    - chk_sum: SHA1, Mandatory one.
    - conc_lics: Mandatory one. document.License or utils.new utilsjs.NoAssert or utils.new utilsjs.SPDXNone.
    - licenses_in_file: list of licenses found in file, mandatory one or more.
      document.License or utils.new utilsjs.SPDXNone or utils.new utilsjs.NoAssert.
    - document.license or utils.new utilsjs.NoAssert or utils.new utilsjs.SPDXNone.
    - license_comment: Optional.
    - copyright: Copyright text, Mandatory one. utils.new utilsjs.NoAssert or utils.new utilsjs.SPDXNone or str.
    - notice: optional One, str.
    - contributors: List of strings.
    - dependencies: list of file locations.
    - artifact_of_project_name: list of project names, possibly empty.
    - artifact_of_project_home: list of project home page, possibly empty.
    - artifact_of_project_uri: list of project uris, possibly empty.
    */
  function SpdxFile(name, spdx_id, chk_sum) {
    _classCallCheck(this, SpdxFile);

    this.name = name;
    this.spdx_id = spdx_id;
    this.comment = null;
    this.type = null;
    this.chk_sum = chk_sum || null;
    this.conc_lics = null;
    this.licenses_in_file = [];
    this.license_comment = null;
    this.copyright = null;
    this.notice = null;
    this.contributors = [];
    this.dependencies = [];
    this.artifact_of_project_name = [];
    this.artifact_of_project_home = [];
    this.artifact_of_project_uri = [];
  }

  _createClass(SpdxFile, [{
    key: '__eq__',
    value: function __eq__(other) {
      return other instanceof SpdxFile && this.name === other.name;
    }
  }, {
    key: '__lt__',
    value: function __lt__(other) {
      return this.name < other.name;
    }
  }, {
    key: 'add_lics',
    value: function add_lics(lics) {
      this.licenses_in_file.push(lics);
    }
  }, {
    key: 'add_contrib',
    value: function add_contrib(contrib) {
      this.contributors.push(contrib);
    }
  }, {
    key: 'add_depend',
    value: function add_depend(depend) {
      this.dependencies.push(depend);
    }
  }, {
    key: 'add_artifact',
    value: function add_artifact(symbol, value) {
      // Add value as artifact_of_project{symbol}.
      symbol = 'artifact_of_project_' + symbol;
      // @TODO: Fix this
      // artifact = getattr(self, symbol);
      // artifact.push(value);
    }
  }, {
    key: 'validate',
    value: function validate(messages) {
      /*
      Validates the fields and appends user friendly messages
      to messages parameter if there are errors.
      */
      messages = this.validate_concluded_license(messages);
      messages = this.validate_type(messages);
      messages = this.validate_checksum(messages);
      messages = this.validate_licenses_in_file(messages);
      messages = this.validate_copyright(messages);
      messages = this.validate_artifacts(messages);
      messages = this.validate_spdx_id(messages);
      return messages;
    }
  }, {
    key: 'validate_spdx_id',
    value: function validate_spdx_id(messages) {
      if (!this.spdx_id) {
        messages = messages + ' [\n          \'File has no SPDX identifier..\'\n      ]';
      }
      return messages;
    }
  }, {
    key: 'validate_copyright',
    value: function validate_copyright(messages) {
      if (!(this.copyright instanceof String || this.copyright instanceof new utilsjs.NoAssert() || this.copyright instanceof new utilsjs.SPDXNone())) {
        messages = messages + ' [\n          \'File copyright must be str or unicode or utils.new utilsjs.NoAssert or utils.new utilsjs.SPDXNone\'\n      ]';
      }
      return messages;
    }
  }, {
    key: 'validate_artifacts',
    value: function validate_artifacts(messages) {
      if (this.artifact_of_project_home.length < (0, _utils.max)(this.artifact_of_project_uri.length, this.artifact_of_project_name.length)) {
        messages = messages + ' + [\n          \'File must have as much artifact of project as uri or homepage\']';
      }
      return messages;
    }
  }, {
    key: 'validate_licenses_in_file',
    value: function validate_licenses_in_file(messages) {
      // FIXME: what are we testing the length of a list? or?
      if (this.licenses_in_file.length === 0) {
        messages = messages + ' + [\n          \'File must have at least one license in file.\'\n      ]';
      }
      return messages;
    }
  }, {
    key: 'validate_concluded_license',
    value: function validate_concluded_license(messages) {
      // FIXME: use isinstance instead??
      if (!(this.conc_lics instanceof documentjs.License || this.conc_lics instanceof new utilsjs.NoAssert() || this.conc_lics instanceof new utilsjs.SPDXNone())) {
        messages = messages + ' + [\'File concluded license must be one of document.License, utils.new utilsjs.NoAssert or utils.new utilsjs.SPDXNone\']';
      }
      return messages;
    }
  }, {
    key: 'validate_type',
    value: function validate_type(messages) {
      if (![null, SpdxFileType.SOURCE, SpdxFileType.OTHER, SpdxFileType.BINARY, SpdxFileType.ARCHIVE].includes(this.type)) {
        messages = messages + ' + [\'File type must be one of the constants defined in class spdx.file.FileType\']';
      }
      return messages;
    }
  }, {
    key: 'validate_checksum',
    value: function validate_checksum(messages) {
      if (!(this.chk_sum instanceof checksum.Algorithm)) {
        messages = messages + ' + [\'File checksum must be instance of spdx.checksum.Algorithm\']';
      } else if (this.chk_sum.identifier === 'SHA1') {
        messages = messages + ' + [\'File checksum algorithm must be SHA1\']';
      }
      return messages;
    }
  }, {
    key: 'calc_chksum',
    value: function calc_chksum() {
      var BUFFER_SIZE = 65536;
      var file_handle = fs.readFileSync(this.name, 'utf8');
      return hash(file_handle);
    }
  }, {
    key: 'has_optional_field',
    value: function has_optional_field(field) {
      // @TODO Fix this
      // return getattr(self, field, None) is not None
      return false;
    }
  }]);

  return SpdxFile;
}();

module.exports = {
  SpdxFileType: SpdxFileType,
  SpdxFile: SpdxFile
};