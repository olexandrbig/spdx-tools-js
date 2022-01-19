'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Document = exports.ExtractedLicense = exports.LicenseDisjunction = exports.LicenseConjunction = exports.License = exports._add_parens = exports.ExternalDocumentRef = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // SPDX-License-Identifier: MIT

var _config = require('./config');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var creationinfojs = require('./creationinfo');

var hash = require('object-hash');

var ExternalDocumentRef = exports.ExternalDocumentRef = function () {
  /*
  External Document References entity that contains the following fields :
    - external_document_id: A unique string containing letters, numbers, '.',
        '-' or '+'.
    - spdx_document_uri: The unique ID of the SPDX document being referenced.
    - check_sum: The checksum of the referenced SPDX document.
  */
  function ExternalDocumentRef(external_document_id, spdx_document_uri, check_sum) {
    _classCallCheck(this, ExternalDocumentRef);

    this.external_document_id = external_document_id;
    this.spdx_document_uri = spdx_document_uri;
    this.check_sum = check_sum;
  }

  _createClass(ExternalDocumentRef, [{
    key: '__eq__',
    value: function __eq__(other) {
      return other instanceof ExternalDocumentRef && this.external_document_id === other.external_document_id && this.spdx_document_uri === other.spdx_document_uri && this.check_sum === other.check_sum;
    }
  }, {
    key: '__lt__',
    value: function __lt__(other) {
      return this.external_document_id < other.external_document_id && this.spdx_document_uri < other.spdx_document_uri && this.check_sum < other.check_sum;
    }
  }, {
    key: 'validate',
    value: function validate(messages) {
      /*
      Validate all fields of the ExternalDocumentRef class and update the
          messages list with user friendly error messages for display.
      */
      messages = this.validate_ext_doc_id(messages);
      messages = this.validate_spdx_doc_uri(messages);
      messages = this.validate_checksum(messages);
      return messages;
    }
  }, {
    key: 'validate_ext_doc_id',
    value: function validate_ext_doc_id(messages) {
      if (!this.external_document_id) {
        messages = messages + ' [\n          \'ExternalDocumentRef has no External Document ID.\'\n      ]';
      }
      return messages;
    }
  }, {
    key: 'validate_spdx_doc_uri',
    value: function validate_spdx_doc_uri(messages) {
      if (!this.spdx_document_uri) {
        messages = messages + ' [\n            \'ExternalDocumentRef has no SPDX Document URI.\'\n        ]';
      }
      return messages;
    }
  }, {
    key: 'validate_checksum',
    value: function validate_checksum(messages) {
      if (!this.check_sum) {
        messages = messages + ' [\'ExternalDocumentRef has no Checksum.\']';
      }
      return messages;
    }
  }]);

  return ExternalDocumentRef;
}();

var _add_parens = exports._add_parens = function _add_parens(required, text) {
  /* Add parens around a license expression if `required` is True, otherwise
   return `text` unmodified.
  */
  if (required) return '(' + text + ')';
  return text;
};

var isArray = function isArray(myArray) {
  return myArray.constructor.toString().indexOf("Array") > -1;
};

var License = exports.License = function () {
  function License(full_name, identifier) {
    _classCallCheck(this, License);

    this._full_name = full_name;
    this._identifier = identifier;
  }

  _createClass(License, [{
    key: 'from_identifier',
    value: function from_identifier(cls, identifier) {
      /*
      If identifier exists in config.LICENSE_MAP
          the full_name is retrieved from it. Otherwise
          the full_name is the same as the identifier.
      */
      var license_map_keys = Object.keys(_config.LICENSE_MAP);
      console.log(license_map_keys.length);
      console.log(isArray(license_map_keys));
      if (license_map_keys.includes(identifier)) {
        return cls(_config.LICENSE_MAP[identifier], identifier);
      } else {
        return cls(identifier, identifier);
      }
    }
  }, {
    key: 'from_full_name',
    value: function from_full_name(cls, full_name) {
      /*
      Return a new License for a full_name. If the full_name exists in
          config.LICENSE_MAP the identifier is retrieved from it.
          Otherwise the identifier is the same as the full_name.
      */
      if (Object.keys(_config.LICENSE_MAP).includes(full_name)) {
        return cls(full_name, _config.LICENSE_MAP[full_name]);
      } else {
        return cls(full_name, full_name);
      }
    }
  }, {
    key: 'url',
    value: function url() {
      return 'http://spdx.org/licenses/{this.identifier}';
    }
  }, {
    key: 'full_name',
    value: function full_name() {
      return this._full_name;
    }
  }, {
    key: 'identifier',
    value: function identifier() {
      return this._identifier;
    }
  }, {
    key: 'set_full_name',
    value: function set_full_name(value) {
      this._full_name = value;
    }
  }, {
    key: '__eq__',
    value: function __eq__(other) {
      return other instanceof License && this.identifier === other.identifier && this.full_name === other.full_name;
    }
  }, {
    key: '__lt__',
    value: function __lt__(other) {
      return other instanceof License && this.identifier < other.identifier;
    }
  }, {
    key: '__str__',
    value: function __str__() {
      return this.identifier;
    }
  }, {
    key: '__hash__',
    value: function __hash__() {
      return hash(this.identifier);
    }
  }]);

  return License;
}();

var LicenseConjunction = exports.LicenseConjunction = function (_License) {
  _inherits(LicenseConjunction, _License);

  // A conjunction of two licenses.
  function LicenseConjunction(license_1, license_2) {
    _classCallCheck(this, LicenseConjunction);

    var _this = _possibleConstructorReturn(this, (LicenseConjunction.__proto__ || Object.getPrototypeOf(LicenseConjunction)).call(this));

    _this.license_1 = license_1;
    _this.license_2 = license_2;
    return _this;
  }

  _createClass(LicenseConjunction, [{
    key: 'full_name',
    value: function full_name() {
      license_1_complex = typeof this.license_1 == "LicenseDisjunction";
      license_2_complex = typeof this.license_2 == "LicenseDisjunction";

      return _add_parens(license_1_complex, self.license_1.full_name) + ' AND ' + _add_parens(license_2_complex, self.license_2.full_name);
    }
  }, {
    key: 'identifier',
    value: function identifier() {
      license_1_complex = typeof this.license_1 == "LicenseDisjunction";
      license_2_complex = typeof this.license_2 == "LicenseDisjunction";

      return _add_parens(license_1_complex, self.license_1.identifier) + ' AND ' + _add_parens(license_2_complex, self.license_2.identifier);
    }
  }]);

  return LicenseConjunction;
}(License);

var LicenseDisjunction = exports.LicenseDisjunction = function (_License2) {
  _inherits(LicenseDisjunction, _License2);

  // A disjunction of two licenses.
  function LicenseDisjunction(license_1, license_2) {
    _classCallCheck(this, LicenseDisjunction);

    var _this2 = _possibleConstructorReturn(this, (LicenseDisjunction.__proto__ || Object.getPrototypeOf(LicenseDisjunction)).call(this));

    _this2.license_1 = license_1;
    _this2.license_2 = license_2;
    return _this2;
  }

  _createClass(LicenseDisjunction, [{
    key: 'full_name',
    value: function full_name() {
      license_1_complex = typeof this.license_1 == "LicenseDisjunction";
      license_2_complex = typeof this.license_2 == "LicenseDisjunction";

      return _add_parens(license_1_complex, self.license_1.full_name) + ' OR ' + _add_parens(license_2_complex, self.license_2.full_name);
    }
  }, {
    key: 'identifier',
    value: function identifier() {
      license_1_complex = typeof this.license_1 == "LicenseDisjunction";
      license_2_complex = typeof this.license_2 == "LicenseDisjunction";

      return _add_parens(license_1_complex, self.license_1.identifier) + ' OR ' + _add_parens(license_2_complex, self.license_2.identifier);
    }
  }]);

  return LicenseDisjunction;
}(License);

var ExtractedLicense = exports.ExtractedLicense = function (_License3) {
  _inherits(ExtractedLicense, _License3);

  /*
  Represent an ExtractedLicense with its additional attributes:
    - text: Extracted text, str. Mandatory.
    - cross_ref: list of cross references.
    - comment: license comment, str.
    - full_name: license name. str or utils.NoAssert.
  */
  function ExtractedLicense(identifier) {
    _classCallCheck(this, ExtractedLicense);

    var _this3 = _possibleConstructorReturn(this, (ExtractedLicense.__proto__ || Object.getPrototypeOf(ExtractedLicense)).call(this));

    _this3.text = null;
    _this3.cross_ref = [];
    _this3.comment = null;
    return _this3;
  }

  _createClass(ExtractedLicense, [{
    key: '__eq__',
    value: function __eq__(other) {
      return other instanceof ExtractedLicense && this.identifier === other.identifier && this.full_name === other.full_name;
    }
  }, {
    key: '__lt__',
    value: function __lt__(other) {
      return other instanceof ExtractedLicense && this.identifier < other.identifier && this.full_name < other.full_name;
    }
  }, {
    key: 'add_xref',
    value: function add_xref(ref) {
      this.cross_ref.push(ref);
    }
  }, {
    key: 'validate',
    value: function validate(messages) {
      if (!this.text) {
        messages = messages + ' [\'ExtractedLicense text can not be None\']';
      }
      return messages;
    }
  }]);

  return ExtractedLicense;
}(License);

var Document = exports.Document = function () {
  /*
  Represent an SPDX document with these fields:
    - version: Spec version. Mandatory, one - Type: Version.
    - data_license: SPDX-Metadata license. Mandatory, one. Type: License.
    - name: Name of the document. Mandatory, one. Type: str.
    - spdx_id: SPDX Identifier for the document to refer to itself in
      relationship to other elements. Mandatory, one. Type: str.
    - ext_document_references: External SPDX documents referenced within the
        given SPDX document. Optional, one or many. Type: ExternalDocumentRef
    - comment: Comments on the SPDX file, optional one. Type: str
    - namespace: SPDX document specific namespace. Mandatory, one. Type: str
    - creation_info: SPDX file creation info. Mandatory, one. Type: CreationInfo
    - package: Package described by this document. Mandatory, one. Type: Package
    - extracted_licenses: List of licenses extracted that are not part of the
      SPDX license list. Optional, many. Type: ExtractedLicense.
    - reviews: SPDX document review information, Optional zero or more.
      Type: Review.
    - annotations: SPDX document annotation information, Optional zero or more.
      Type: Annotation.
  */
  function Document(version, data_license, name, spdx_id, namespace, comment, package_) {
    _classCallCheck(this, Document);

    this.version = version;
    this.data_license = data_license;
    this.name = name;
    this.spdx_id = spdx_id;
    this.ext_document_references = [];
    this.comment = comment;
    this.namespace = namespace;
    this.creation_info = new creationinfojs.CreationInfo();
    this.package_ = package_;
    this.extracted_licenses = [];
    this.reviews = [];
    this.annotations = [];
  }

  _createClass(Document, [{
    key: 'add_review',
    value: function add_review(review) {
      this.reviews.push(review);
    }
  }, {
    key: 'add_annotation',
    value: function add_annotation(annotation) {
      this.annotations.push(annotation);
    }
  }, {
    key: 'add_extr_lic',
    value: function add_extr_lic(lic) {
      this.extracted_licenses.push(lic);
    }
  }, {
    key: 'add_ext_document_reference',
    value: function add_ext_document_reference(ext_doc_ref) {
      this.ext_document_references.push(ext_doc_ref);
    }
  }, {
    key: 'get_files',
    value: function get_files() {
      return this.package_.files;
    }
  }, {
    key: 'set_files',
    value: function set_files(value) {
      this.package_.files = value;
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
      Validate all fields of the document and update the
      messages list with user friendly error messages for display.
      */
      messages = this.validate_version(messages);
      messages = this.validate_data_lics(messages);
      messages = this.validate_name(messages);
      messages = this.validate_spdx_id(messages);
      messages = this.validate_namespace(messages);
      messages = this.validate_ext_document_references(messages);
      messages = this.validate_creation_info(messages);
      messages = this.validate_package(messages);
      messages = this.validate_extracted_licenses(messages);
      messages = this.validate_reviews(messages);

      return messages;
    }
  }, {
    key: 'validate_version',
    value: function validate_version(messages) {
      if (!this.version) {
        messages = messages + ' [\'Document has no version.\']';
      }
      return messages;
    }
  }, {
    key: 'validate_data_lics',
    value: function validate_data_lics(messages) {
      if (!this.data_license) {
        messages = messages + ' [\'Document has no data license.\']';
      }
      return messages;
    }
  }, {
    key: 'validate_name',
    value: function validate_name(messages) {
      if (!this.name) {
        messages = messages + ' [\'Document has no name.\']';
      }
      return messages;
    }
  }, {
    key: 'validate_namespace',
    value: function validate_namespace(messages) {
      if (!this.namespace) {
        messages = messages + ' [\'Document has no namespace.\']';
      }
      return messages;
    }
  }, {
    key: 'validate_spdx_id',
    value: function validate_spdx_id(messages) {
      if (!this.spdx_id) {
        messages = messages + ' [\'Document has no SPDX identifier.\']';
      } else {
        if (!this.spdx_id.endsWith('SPDXRef-DOCUMENT')) {
          messages = messages + ' [\'Invalid document SPDX identifier value.\']';
        }
      }
      return messages;
    }
  }, {
    key: 'validate_ext_document_references',
    value: function validate_ext_document_references(messages) {
      for (var i = 0; i < this.ext_document_references.length; i++) {
        var doc = this.ext_document_references[i];
        if (doc instanceof ExternalDocumentRef) {
          messages = doc.validate(messages);
        } else {
          messages = messages + ' [\'External document references must be of the type spdx.document.ExternalDocumentRef and not ' + (typeof doc === 'undefined' ? 'undefined' : _typeof(doc)) + '\']';
        }
      }
      return messages;
    }
  }, {
    key: 'validate_reviews',
    value: function validate_reviews(messages) {
      for (var i = 0; i < this.reviews.length; i++) {
        var review = this.reviews[i];
        messages = review.validate(messages);
      }
      return messages;
    }
  }, {
    key: 'validate_annotations',
    value: function validate_annotations(messages) {
      for (var i = 0; i < this.annotations.length; i++) {
        var annotation = this.annotations[i];
        messages = annotation.validate(messages);
      }
      return messages;
    }
  }, {
    key: 'validate_creation_info',
    value: function validate_creation_info(messages) {
      if (this.creation_info) {
        messages = this.creation_info.validate(messages);
      } else {
        messages = messages + ' [\'Document has no creation information.\']';
      }
    }
  }, {
    key: 'validate_package',
    value: function validate_package(messages) {
      if (this.package_) {
        messages = this.package_.validate(messages);
      } else {
        messages = messages + ' [\'Document has no package.\']';
      }
    }
  }, {
    key: 'validate_extracted_licenses',
    value: function validate_extracted_licenses(messages) {
      for (var i = 0; i < this.extracted_licenses.length; i++) {
        var lic = this.extracted_licenses[i];
        if (lic instanceof ExtractedLicense) {
          messages = lic.validate(messages);
        } else {
          messages = messages + ' [\'Document extracted licenses must be of type spdx.document.ExtractedLicense and not ' + (typeof lic === 'undefined' ? 'undefined' : _typeof(lic)) + '\']';
        }
      }
      return messages;
    }
  }]);

  return Document;
}();

module.exports = {
  ExternalDocumentRef: ExternalDocumentRef,
  License: License,
  LicenseConjunction: LicenseConjunction,
  LicenseDisjunction: LicenseDisjunction,
  ExtractedLicense: ExtractedLicense,
  Document: Document
};