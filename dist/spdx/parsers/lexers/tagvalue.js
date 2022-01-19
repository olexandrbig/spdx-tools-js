'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// SPDX-License-Identifier: MIT

var moo = require('moo');

var Lexer = function () {
  function Lexer() {
    _classCallCheck(this, Lexer);

    var reserved = {
      // # Top level fields
      'SPDXVersion': 'DOC_VERSION',
      'DataLicense': 'DOC_LICENSE',
      'DocumentName': 'DOC_NAME',
      'SPDXID': 'SPDX_ID',
      'DocumentComment': 'DOC_COMMENT',
      'DocumentNamespace': 'DOC_NAMESPACE',
      'ExternalDocumentRef': 'EXT_DOC_REF',
      // # Creation info
      'Creator': 'CREATOR',
      'Created': 'CREATED',
      'CreatorComment': 'CREATOR_COMMENT',
      'LicenseListVersion': 'LIC_LIST_VER',
      // # Review info
      'Reviewer': 'REVIEWER',
      'ReviewDate': 'REVIEW_DATE',
      'ReviewComment': 'REVIEW_COMMENT',
      // # Annotation info
      'Annotator': 'ANNOTATOR',
      'AnnotationDate': 'ANNOTATION_DATE',
      'AnnotationComment': 'ANNOTATION_COMMENT',
      'AnnotationType': 'ANNOTATION_TYPE',
      'SPDXREF': 'ANNOTATION_SPDX_ID',
      // # Package Fields
      'PackageName': 'PKG_NAME',
      'PackageVersion': 'PKG_VERSION',
      'PackageDownloadLocation': 'PKG_DOWN',
      'PackageSummary': 'PKG_SUM',
      'PackageSourceInfo': 'PKG_SRC_INFO',
      'PackageFileName': 'PKG_FILE_NAME',
      'PackageSupplier': 'PKG_SUPPL',
      'PackageOriginator': 'PKG_ORIG',
      'PackageChecksum': 'PKG_CHKSUM',
      'PackageVerificationCode': 'PKG_VERF_CODE',
      'PackageDescription': 'PKG_DESC',
      'PackageLicenseDeclared': 'PKG_LICS_DECL',
      'PackageLicenseConcluded': 'PKG_LICS_CONC',
      'PackageLicenseInfoFromFiles': 'PKG_LICS_FFILE',
      'PackageLicenseComments': 'PKG_LICS_COMMENT',
      'PackageCopyrightText': 'PKG_CPY_TEXT',
      'PackageHomePage': 'PKG_HOME',
      // # Files
      'FileName': 'FILE_NAME',
      'FileType': 'FILE_TYPE',
      'FileChecksum': 'FILE_CHKSUM',
      'LicenseConcluded': 'FILE_LICS_CONC',
      'LicenseInfoInFile': 'FILE_LICS_INFO',
      'FileCopyrightText': 'FILE_CR_TEXT',
      'LicenseComments': 'FILE_LICS_COMMENT',
      'FileComment': 'FILE_COMMENT',
      'FileNotice': 'FILE_NOTICE',
      'FileContributor': 'FILE_CONTRIB',
      'FileDependency': 'FILE_DEP',
      'ArtifactOfProjectName': 'ART_PRJ_NAME',
      'ArtifactOfProjectHomePage': 'ART_PRJ_HOME',
      'ArtifactOfProjectURI': 'ART_PRJ_URI',
      // # License
      'LicenseID': 'LICS_ID',
      'ExtractedText': 'LICS_TEXT',
      'LicenseName': 'LICS_NAME',
      'LicenseCrossReference': 'LICS_CRS_REF',
      'LicenseComment': 'LICS_COMMENT',
      // # Common
      'NOASSERTION': 'NO_ASSERT',
      'UNKNOWN': 'UN_KNOWN',
      'NONE': 'NONE',
      'SOURCE': 'SOURCE',
      'BINARY': 'BINARY',
      'ARCHIVE': 'ARCHIVE',
      'OTHER': 'OTHER'
    };
    var states = ['text', 'exclusive'];
    var tokens = ['TEXT', 'TOOL_VALUE', 'UNKNOWN_TAG', 'ORG_VALUE', 'PERSON_VALUE', 'DATE', 'LINE', 'CHKSUM', 'DOC_REF_ID', 'DOC_URI', 'EXT_DOC_REF_CHKSUM'].concat(Object.values(reserved));
    this.reserved = reserved;
  }

  _createClass(Lexer, [{
    key: 't_text',
    value: function t_text(t) {
      var lexer = moo.compile({
        openTag: ['<text>'],
        closeTag: ['</text>'],
        string: /"(?:\\["\\]|[^\n"\\])*"/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_text_end',
    value: function t_text_end(t) {
      var lexer = moo.compile({
        string: /'<\/text>\s*'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_text_any',
    value: function t_text_any(t) {
      var lexer = moo.compile({
        string: /"(?:\\["\\]|[^\n"\\])*"/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_text_error',
    value: function t_text_error(t) {
      console.log('Lexer error in text state');
    }
  }, {
    key: 't_CHKSUM',
    value: function t_CHKSUM(t) {
      var lexer = moo.compile({
        string: /':\s*SHA1:\s*[a-f0-9]{40,40}'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_DOC_REF_ID',
    value: function t_DOC_REF_ID(t) {
      var lexer = moo.compile({
        string: /':\s*DocumentRef-([A-Za-z0-9\+\.\-]+)'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_DOC_URI',
    value: function t_DOC_URI(t) {
      var lexer = moo.compile({
        string: /'\s*((ht|f)tps?:\/\/\S*)'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_EXT_DOC_REF_CHKSUM',
    value: function t_EXT_DOC_REF_CHKSUM(t) {
      var lexer = moo.compile({
        string: /'\s*SHA1:\s*[a-f0-9]{40,40}'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_TOOL_VALUE',
    value: function t_TOOL_VALUE(t) {
      var lexer = moo.compile({
        string: /':\s*Tool:.+'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_ORG_VALUE',
    value: function t_ORG_VALUE(t) {
      var lexer = moo.compile({
        string: /':\s*Organization:.+'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_PERSON_VALUE',
    value: function t_PERSON_VALUE(t) {
      var lexer = moo.compile({
        string: /':\s*Person:.+'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_DATE',
    value: function t_DATE(t) {
      var lexer = moo.compile({
        string: /':\s*\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_KEYWORD_AS_TAG',
    value: function t_KEYWORD_AS_TAG(t) {
      var lexer = moo.compile({
        string: /'[a-zA-Z]+'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_LINE_OR_KEYWORD_VALUE',
    value: function t_LINE_OR_KEYWORD_VALUE(t) {
      var lexer = moo.compile({
        string: /':.+'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_comment',
    value: function t_comment(t) {
      var lexer = moo.compile({
        string: /'\#.*'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_newline',
    value: function t_newline(t) {
      var lexer = moo.compile({
        string: /'\n+'/
      });
      lexer.reset(t);
    }
  }, {
    key: 't_whitespace',
    value: function t_whitespace(t) {
      var lexer = moo.compile({
        string: /'\s+'/,
        lexError: moo.error
      });
      lexer.reset(t);
    }
  }, {
    key: 'build',
    value: function build(t) {}
  }, {
    key: 'token',
    value: function token(t) {}
  }, {
    key: 'input',
    value: function input(t) {}
  }, {
    key: 't_error',
    value: function t_error(t) {}
  }]);

  return Lexer;
}();

exports.default = Lexer;