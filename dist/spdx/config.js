'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LICENSE_LIST_VERSION = exports.LICENSE_MAP = exports._minor = exports._major = undefined;

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs'); // SPDX-License-Identifier: MIT

var path = require('path');

var load_license_list = function load_license_list(file_name) {
  /*
  Return the licenses list version tuple and a mapping of licenses
    name->id and id->name loaded from a JSON file
    from https://github.com/spdx/license-list-data
  */

  var licenses_map = {};
  var lics = fs.readFileSync(file_name, 'utf8');
  var licenses = JSON.parse(lics);
  var version = licenses['licenseListVersion'].split('.');
  for (var i = 0; i < licenses['licenses'].length; i++) {
    var lic = licenses['licenses'][i];
    if (lic['isDeprecatedLicenseId']) continue;
    var name = lic['name'];
    var identifier = lic['licenseId'];
    licenses_map[name] = identifier;
    licenses_map[identifier] = name;
  }
  return {
    "major": version[0],
    "minor": version[1],
    "license_map": licenses_map
  };
};

// get_licenses = () => {
//
// }

var _base_dir = __dirname;
var _licenses = path.join(_base_dir, 'licenses.json');
var _exceptions = path.join(_base_dir, 'exceptions.json');
var license_list = load_license_list(_licenses);

var _major = exports._major = license_list["major"];
var _minor = exports._minor = license_list["minor"];
var LICENSE_MAP = exports.LICENSE_MAP = license_list["license_map"];
var LICENSE_LIST_VERSION = exports.LICENSE_LIST_VERSION = new _version2.default(_major, _minor);