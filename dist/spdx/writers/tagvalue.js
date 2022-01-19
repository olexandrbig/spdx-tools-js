'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// SPDX-License-Identifier: MIT

var documentjs = require('../document');
var filejs = require('../file');
var fs = require('fs');

var InvalidDocumentError = exports.InvalidDocumentError = function InvalidDocumentError() {
  _classCallCheck(this, InvalidDocumentError);
};

var write_separators = exports.write_separators = function write_separators(out) {
  var seperator = '\n\n';
  fs.appendFile(out, seperator, function (err) {
    if (err) console.log(err);
    console.log("Successfully Written seperator");
  });
};

var format_verif_code = exports.format_verif_code = function format_verif_code(package_) {
  if (package_.verif_exc_files.length === 0) {
    return package_.verif_code;
  } else {
    return package_.verif_code + ' (' + package_.verif_exc_files.join() + ')';
  }
};

var write_value = exports.write_value = function write_value(tag, value, out) {
  var data = tag + ': ' + value + ' \n';
  fs.appendFile(out, data, function (err) {
    if (err) console.log(err);
    console.log("Successfully Written value");
  });
};

var write_text_value = exports.write_text_value = function write_text_value(tag, value, out) {
  var data = tag + ': <text>' + value + '</text> \n';
  fs.appendFile(out, data, function (err) {
    if (err) console.log(err);
    console.log("Successfully Written text value");
  });
};

var write_creation_info = exports.write_creation_info = function write_creation_info(creation_info, out) {
  // Write the creation info to out.
  var data = '# Creation Info \n\n';
  fs.appendFile(out, data, function (err) {
    if (err) console.log(err);
    console.log("Successfully Written creation info");
  });
  // Write sorted creators
  for (var i = 0; i < creation_info.creators.length; i++) {
    write_value('Creator', creation_info.creators[i], out);
  }
  // write created
  write_value('Created', creation_info.created_iso_format(), out);
  // possible comment
  if (creation_info.has_comment) {
    write_text_value('CreatorComment', creation_info.comment, out);
  }
};

var write_review = exports.write_review = function write_review(review, out) {
  // Write the fields of a single review to out.
  var data = '# Review \n\n';
  fs.appendFile(out, data, function (err) {
    if (err) console.log(err);
    console.log("Successfully Written review");
  });
  write_value('Reviewer', review.reviewer, out);
  write_value('ReviewDate', review.review_date_iso_format, out);
  if (review.has_comment) {
    write_text_value('ReviewComment', review.comment, out);
  }
};

var write_annotation = exports.write_annotation = function write_annotation(annotation, out) {
  // Write the fields of a single annotation to out.
  var data = '# Annotation \n\n';
  fs.appendFile(out, data, function (err) {
    if (err) console.log(err);
    console.log("Successfully Written annotation");
  });
  write_value('Annotator', annotation.annotator, out);
  write_value('AnnotationDate', annotation.annotation_date_iso_format, out);
  if (annotation.has_comment) {
    write_text_value('AnnotationComment', annotation.comment, out);
  }
  write_value('AnnotationType', annotation.annotation_type, out);
  write_value('SPDXREF', annotation.spdx_id, out);
};

var write_file_type = exports.write_file_type = function write_file_type(ftype, out) {
  var _VALUES;

  var spdx_file_type = new filejs.SpdxFileType()();
  var VALUES = (_VALUES = {}, _defineProperty(_VALUES, spdx_file_type.SOURCE, 'SOURCE'), _defineProperty(_VALUES, spdx_file_type.OTHER, 'OTHER'), _defineProperty(_VALUES, spdx_file_type.BINARY, 'BINARY'), _defineProperty(_VALUES, spdx_file_type.ARCHIVE, 'ARCHIVE'), _VALUES);
  write_value('FileType', VALUES[ftype], out);
};

var write_file = exports.write_file = function write_file(spdx_file, out) {
  // Write a file fields to out.
  var data = '# File \n\n';
  fs.appendFile(out, data, function (err) {
    if (err) console.log(err);
    console.log("Successfully Written file");
  });
  write_value('FileName', spdx_file.name, out);
  write_value('SPDXID', spdx_file.spdx_id, out);
  if (spdx_file.has_optional_field('type')) {
    write_file_type(spdx_file.type, out);
  }
  write_value('FileChecksum', spdx_file.chk_sum.to_tv(), out);
  if (spdx_file.conc_lics instanceof documentjs.LicenseConjunction || spdx_file.conc_lics instanceof documentjs.LicenseDisjunction) {
    write_value('LicenseConcluded', '(' + spdx_file.conc_lics + ')', out);
  } else {
    write_value('LicenseConcluded', spdx_file.conc_lics, out);
  }
  // write sorted list
  for (var i = 0; i < spdx_file.licenses_in_file.length; i++) {
    write_value('LicenseInfoInFile', spdx_file.licenses_in_file[i], out);
  }

  if (spdx_file.copyright instanceof String) {
    write_text_value('FileCopyrightText', spdx_file.copyright, out);
  } else {
    write_value('FileCopyrightText', spdx_file.copyright, out);
  }

  if (spdx_file.has_optional_field('license_comment')) {
    write_text_value('LicenseComments', spdx_file.license_comment, out);
  }

  if (spdx_file.has_optional_field('comment')) {
    write_text_value('FileComment', spdx_file.comment, out);
  }

  if (spdx_file.has_optional_field('notice')) {
    write_text_value('FileNotice', spdx_file.notice, out);
  }

  for (var _i = 0; _i < spdx_file.contributors.length; _i++) {
    write_value('FileContributor', spdx_file.contributors[_i], out);
  }

  for (var _i2 = 0; _i2 < spdx_file.dependencies.length; _i2++) {
    write_value('FileDependency', spdx_file.dependencies[_i2], out);
  }

  var names = spdx_file.artifact_of_project_name;
  var homepages = spdx_file.artifact_of_project_home;
  var uris = spdx_file.artifact_of_project_uri;

  // for name, homepage, uri in sorted(zip_longest(names, homepages, uris)):
  //       write_value('ArtifactOfProjectName', name, out)
  //       if homepage is not None:
  //           write_value('ArtifactOfProjectHomePage', homepage, out)
  //       if uri is not None:
  //           write_value('ArtifactOfProjectURI', uri, out)
};

var write_package = exports.write_package = function write_package(package_, out) {
  // Write a package fields to out.
  var data = '# Package \n\n';
  fs.appendFile(out, data, function (err) {
    if (err) console.log(err);
    console.log("Successfully Written creation info");
  });
  write_value('PackageName', package_.name, out);
  if (package_.has_optional_field('version')) {
    write_value('PackageVersion', package_.version, out);
  }
  write_value('PackageDownloadLocation', package_.download_location, out);

  if (package_.has_optional_field('summary')) {
    write_text_value('PackageSummary', package_.summary, out);
  }

  if (package_.has_optional_field('source_info')) {
    write_text_value('PackageSourceInfo', package_.source_info, out);
  }

  if (package_.has_optional_field('file_name')) {
    write_value('PackageFileName', package_.file_name, out);
  }

  if (package_.has_optional_field('supplier')) {
    write_value('PackageSupplier', package_.supplier, out);
  }

  if (package_.has_optional_field('originator')) {
    write_value('PackageOriginator', package_.originator, out);
  }

  if (package_.has_optional_field('check_sum')) {
    write_value('PackageChecksum', package_.check_sum.to_tv(), out);
  }

  write_value('PackageVerificationCode', format_verif_code(package_), out);

  if (package_.has_optional_field('description')) {
    write_text_value('PackageDescription', package_.description, out);
  }

  if (package_.license_declared instanceof documentjs.LicenseConjunction || package_.license_declared instanceof documentjs.LicenseDisjunction) {
    write_value('PackageLicenseDeclared', '(' + package_.license_declared + ')', out);
  } else {
    write_value('PackageLicenseDeclared', package_.license_declared, out);
  }

  if (package_.conc_lics instanceof documentjs.LicenseConjunction || package_.conc_lics instanceof documentjs.LicenseDisjunction) {
    write_value('PackageLicenseConcluded', '(' + package_.conc_lics + ')', out);
  } else {
    write_value('PackageLicenseConcluded', package_.conc_lics, out);
  }

  // Write sorted list of licenses.
  for (var i = 0; i < package_.licenses_from_files.length; i++) {
    write_value('PackageLicenseInfoFromFiles', package_.licenses_from_files[i], out);
  }

  if (package_.has_optional_field('license_comment')) {
    write_text_value('PackageLicenseComments', package_.license_comment, out);
  }

  if (package_.cr_text instanceof String) {
    write_value('PackageCopyrightText', '(' + package_.cr_text + ')', out);
  } else {
    write_value('PackageCopyrightText', package_.cr_text, out);
  }

  if (package_.has_optional_field('homepage')) {
    write_value('PackageHomePage', package_.homepage, out);
  }

  for (var _i3 = 0; _i3 < package_.files.length; _i3++) {
    write_separators(out);
    write_file(package_.files[_i3], out);
  }
};

var write_extracted_licenses = exports.write_extracted_licenses = function write_extracted_licenses(lics, out) {
  // Write extracted licenses fields to out.
  write_value('LicenseID', lics.identifier, out);
  if (lics.full_name) {
    write_value('LicenseName', lics.full_name, out);
  }

  if (lics.comment) {
    write_text_value('LicenseComment', lics.comment, out);
  }

  if (lics.cross_ref) {
    for (var i = 0; i < lics.cross_ref.length; i++) {
      write_value('LicenseCrossReference', lics.cross_ref[i], out);
    }
  }

  write_text_value('ExtractedText', lics.text, out);
};

var write_document = exports.write_document = function write_document(document, out, validate) {
  /*
  Write an SPDX tag value document.
    - document - spdx.document instance.
    - out - file like object that will be written to.
    Optionally `validate` the document before writing and raise
    InvalidDocumentError if document.validate returns False.
  */
  var messages = [];
  messages = document.validate(messages);
  // if(validate and messages) raise InvalidDocumentError(messages)

  // Write out document information
  var data = '# Document Information \n\n';
  console.log(out);
  fs.writeFile(out, data, function (err) {
    if (err) console.log(err);
    console.log("Successfully Written document information");
  });
  write_value('SPDXVersion', document.version.to_str(), out);
  write_value('DataLicense', document.data_license.identifier(), out);
  write_value('DocumentName', document.name, out);
  write_value('SPDXID', 'SPDXRef-DOCUMENT', out);
  write_value('DocumentNamespace', document.namespace, out);
  if (document.has_comment) {
    write_text_value('DocumentComment', document.comment, out);
  }
  for (var i = 0; i < document.ext_document_references.length; i++) {
    var doc_ref = document.ext_document_references[i];
    var doc_ref_str = [doc_ref.external_document_id, doc_ref.spdx_document_uri, doc_ref.check_sum.identifier + ':' + doc_ref.check_sum.value].join();
    write_value('ExternalDocumentRef', doc_ref_str, out);
  }
  write_separators(out);
  // Write out creation info
  write_creation_info(document.creation_info, out);
  write_separators(out);

  // Writesorted reviews
  for (var _i4 = 0; _i4 < document.reviews.length; _i4++) {
    var review = document.reviews[_i4];
    write_review(review, out);
    write_separators(out);
  }

  // Write sorted annotations
  for (var _i5 = 0; _i5 < document.annotations.length; _i5++) {
    var annotation = document.annotations[_i5];
    write_annotation(annotation, out);
    write_separators(out);
  }

  // Write out package info
  write_package(document.package, out);
  write_separators(out);

  var data2 = '# Extracted Licenses \n\n';
  fs.appendFile(out, data2, function (err) {
    if (err) console.log(err);
    console.log("Successfully Written extracted licenses");
  });
  for (var _i6 = 0; _i6 < document.extracted_licenses.length; _i6++) {
    var lic = document.extracted_licenses[_i6];
    write_extracted_licenses(lic, out);
    write_separators(out);
  }
};