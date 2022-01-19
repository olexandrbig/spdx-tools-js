'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate_snip_lics_info = exports.validate_snip_file_spdxid = exports.validate_snip_lic_comment = exports.validate_snippet_copyright = exports.validate_snip_comment = exports.validate_snippet_spdx_id = exports.validate_extr_lic_name = exports.validate_extracted_lic_id = exports.validate_file_lics_in_file = exports.validate_lics_conc = exports.validate_file_notice = exports.validate_lics_from_file = exports.validate_file_copyright = exports.validate_file_lics_comment = exports.validate_file_comment = exports.validate_file_spdx_id = exports.validate_pkg_lics_comment = exports.validate_pkg_src_info = exports.validate_annotaion_type = exports.validate_annotation_comment = exports.validate_annotator = exports.validate_review_comment = exports.validate_reviewer = exports.validate_creation_comment = exports.validate_creator = exports.validate_doc_namespace = exports.validate_doc_spdx_id = exports.validate_doc_comment = exports.validate_pkg_desc = exports.validate_pkg_summary = exports.validate_pkg_cr_text = exports.validate_pkg_homepage = exports.validate_pkg_originator = exports.validate_pkg_supplier = exports.validate_doc_name = exports.validate_data_lics = exports.validate_org_name = exports.validate_person_name = exports.validate_tool_name = exports.validate_is_free_form_text = undefined;

var _creationinfo = require('../creationinfo');

var _creationinfo2 = _interopRequireDefault(_creationinfo);

var _document = require('../document');

var _document2 = _interopRequireDefault(_document);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate_is_free_form_text = exports.validate_is_free_form_text = function validate_is_free_form_text(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var regex = /'<text>(.|\n)*<\/text>'/;
  if (value === null) {
    return optional;
  } else {
    regex.exec(value) !== null;
  }
}; // SPDX-License-Identifier: MIT

var validate_tool_name = exports.validate_tool_name = function validate_tool_name(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var stripped_value = value.replace(/\s/g, '');
  if (optional) {
    if (stripped_value.length === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return !(stripped_value.length === 0);
  }
};

var validate_person_name = exports.validate_person_name = function validate_person_name(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_tool_name(value, optional);
};

var validate_org_name = exports.validate_org_name = function validate_org_name(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_tool_name(value, optional);
};

var validate_data_lics = exports.validate_data_lics = function validate_data_lics(value) {
  return value === 'CC0-1.0';
};

var validate_doc_name = exports.validate_doc_name = function validate_doc_name(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_tool_name(value, optional);
};

var validate_pkg_supplier = exports.validate_pkg_supplier = function validate_pkg_supplier(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (optional && value === null) {
    return true;
  } else if (value instanceof _utils2.default || value instanceof _creationinfo2.default || value instanceof _creationinfo2.default) {
    return true;
  } else {
    return false;
  }
};

var validate_pkg_originator = exports.validate_pkg_originator = function validate_pkg_originator(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_pkg_supplier(value, optional);
};

var validate_pkg_homepage = exports.validate_pkg_homepage = function validate_pkg_homepage(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value === null) {
    return optional;
  } else if (value instanceof _utils2.default || value instanceof _utils2.default) {
    //@TODO: Fix this
    return true;
  } else {
    return false;
  }
};

var validate_pkg_cr_text = exports.validate_pkg_cr_text = function validate_pkg_cr_text(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value instanceof _utils2.default || value instanceof _utils2.default) {
    return true;
  } else if (validate_is_free_form_text(value, optional)) {
    return true;
  } else if (value === null) {
    return optional;
  } else {
    return false;
  }
};

var validate_pkg_summary = exports.validate_pkg_summary = function validate_pkg_summary(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_pkg_desc = exports.validate_pkg_desc = function validate_pkg_desc(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_doc_comment = exports.validate_doc_comment = function validate_doc_comment(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_doc_spdx_id = exports.validate_doc_spdx_id = function validate_doc_spdx_id(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value === null) {
    return optional;
  } else if (value.endswith('#SPDXRef-DOCUMENT')) {
    return true;
  } else {
    return false;
  }
};

var validate_doc_namespace = exports.validate_doc_namespace = function validate_doc_namespace(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value === null) {
    return optional;
  } else if ((value.startswith('http://') || value.startswith('https://') || value.startswith('ftp://')) && !value.includes("#")) {
    return true;
  } else {
    return false;
  }
};

var validate_creator = exports.validate_creator = function validate_creator(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value === null) {
    return optional;
  } else {
    return value instanceof _creationinfo2.default;
  }
};

var validate_creation_comment = exports.validate_creation_comment = function validate_creation_comment(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_reviewer = exports.validate_reviewer = function validate_reviewer(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_creator(value, optional);
};

var validate_review_comment = exports.validate_review_comment = function validate_review_comment(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_annotator = exports.validate_annotator = function validate_annotator(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_creator(value, optional);
};

var validate_annotation_comment = exports.validate_annotation_comment = function validate_annotation_comment(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_annotaion_type = exports.validate_annotaion_type = function validate_annotaion_type(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var n_value = value.replace(/^\s+|\s+$/g, '');
  if (n_value === "REVIEW" || n_value === "OTHER") {
    return true;
  } else {
    return false;
  }
};

var validate_pkg_src_info = exports.validate_pkg_src_info = function validate_pkg_src_info(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_pkg_lics_comment = exports.validate_pkg_lics_comment = function validate_pkg_lics_comment(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_file_spdx_id = exports.validate_file_spdx_id = function validate_file_spdx_id(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var split_value = value.split('#');
  var n_value = split_value[split_value.length - 1];
  var regex = /'SPDXRef-([A-Za-z0-9.\-]+)'/;
  if (n_value === null) {
    return optional;
  } else {
    regex.exec(n_value) !== null;
  }
};

var validate_file_comment = exports.validate_file_comment = function validate_file_comment(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_file_lics_comment = exports.validate_file_lics_comment = function validate_file_lics_comment(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_file_copyright = exports.validate_file_copyright = function validate_file_copyright(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value instanceof _utils2.default || value instanceof _utils2.default) {
    return true;
  } else if (validate_is_free_form_text(value, optional)) {
    return true;
  } else {
    return false;
  }
};

var validate_lics_from_file = exports.validate_lics_from_file = function validate_lics_from_file(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value === null) {
    return optional;
  } else if (value instanceof _utils2.default || value instanceof _utils2.default || value instanceof _document2.default) {
    return true;
  } else {
    return false;
  }
};

var validate_file_notice = exports.validate_file_notice = function validate_file_notice(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_lics_conc = exports.validate_lics_conc = function validate_lics_conc(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value === null) {
    return optional;
  } else if (value instanceof _utils2.default || value instanceof _utils2.default || value instanceof _document2.default) {
    return true;
  } else {
    return false;
  }
};

var validate_file_lics_in_file = exports.validate_file_lics_in_file = function validate_file_lics_in_file(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value === null) {
    return optional;
  } else if (value instanceof _utils2.default || value instanceof _utils2.default || value instanceof _document2.default) {
    return true;
  } else {
    return false;
  }
};

var validate_extracted_lic_id = exports.validate_extracted_lic_id = function validate_extracted_lic_id(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value === null) {
    return optional;
  } else {
    return value.startsWith("LicenseRef");
  }
};

var validate_extr_lic_name = exports.validate_extr_lic_name = function validate_extr_lic_name(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value === null) {
    return optional;
  } else {
    // @TODO: Update this
    return value instanceof _utils2.default;
  }
};

var validate_snippet_spdx_id = exports.validate_snippet_spdx_id = function validate_snippet_spdx_id(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var regex = /'^SPDXRef[A-Za-z0-9.\-]+$'/;
  if (regex.exec(value) !== null) {
    return true;
  } else {
    return false;
  }
};

var validate_snip_comment = exports.validate_snip_comment = function validate_snip_comment(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_snippet_copyright = exports.validate_snippet_copyright = function validate_snippet_copyright(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (validate_is_free_form_text(value, optional)) {
    return true;
  } else if (value instanceof _utils2.default || value instanceof _utils2.default) {
    return true;
  } else if (value === null) {
    return optional;
  } else {
    return false;
  }
};

var validate_snip_lic_comment = exports.validate_snip_lic_comment = function validate_snip_lic_comment(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return validate_is_free_form_text(value, optional);
};

var validate_snip_file_spdxid = exports.validate_snip_file_spdxid = function validate_snip_file_spdxid(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var regex = /'(DocumentRef[A-Za-z0-9.\-]+:){0,1}SPDXRef[A-Za-z0-9.\-]+'/;
  if (regex.exec(value) !== null) {
    return true;
  } else {
    return false;
  }
};

var validate_snip_lics_info = exports.validate_snip_lics_info = function validate_snip_lics_info(value) {
  var optional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (value === null) {
    return optional;
  } else if (value instanceof _utils2.default || value instanceof _utils2.default || value instanceof _document2.default) {
    return true;
  } else {
    return false;
  }
};