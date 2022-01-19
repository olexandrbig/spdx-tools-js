'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreationInfo = exports.Tool = exports.Person = exports.Organization = exports.Creator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // SPDX-License-Identifier: MIT

var _config = require('./config');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utilsjs = require('./utils');

var Creator = exports.Creator = function () {
  /*
  Creator enity.
    Fields:
    - name: creator's name/identifier
  */
  function Creator(name) {
    _classCallCheck(this, Creator);

    this.name = name;
  }

  _createClass(Creator, [{
    key: '__eq__',
    value: function __eq__(other) {
      return other instanceof Creator && this.name === other.name;
    }
  }, {
    key: '__lt__',
    value: function __lt__(other) {
      return other instanceof Creator && this.name < other.name;
    }
  }]);

  return Creator;
}();

var Organization = exports.Organization = function (_Creator) {
  _inherits(Organization, _Creator);

  /*
  Organization entity.
    Fields:
    - name: Org's name/identifier. Mandatory. Type: str.
    - email: Org's email address. Optional. Type: str.
  */
  function Organization(name, email) {
    _classCallCheck(this, Organization);

    var _this = _possibleConstructorReturn(this, (Organization.__proto__ || Object.getPrototypeOf(Organization)).call(this, name));

    _this.email = email;
    return _this;
  }

  _createClass(Organization, [{
    key: '__eq__',
    value: function __eq__(other) {
      return other instanceof Organization && this.name === other.name && this.email === other.email;
    }
  }, {
    key: '__lt__',
    value: function __lt__(other) {
      return other instanceof Organization && this.name < other.name && this.email < other.email;
    }
  }, {
    key: 'to_value',
    value: function to_value() {
      if (this.email) {
        return 'Organization: ' + this.name + ' (' + this.email + ')';
      }
      return 'Organization: ' + this.name;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.to_value();
    }
  }]);

  return Organization;
}(Creator);

var Person = exports.Person = function (_Creator2) {
  _inherits(Person, _Creator2);

  /*
  Person entity.
    Fields:
    - name: person's name/identifier. Mandatory. Type: str.
    - email: person's email address. Optional. Type: str.
  */
  function Person(name, email) {
    _classCallCheck(this, Person);

    var _this2 = _possibleConstructorReturn(this, (Person.__proto__ || Object.getPrototypeOf(Person)).call(this, name));

    _this2.email = email;
    return _this2;
  }

  _createClass(Person, [{
    key: '__eq__',
    value: function __eq__(other) {
      return other instanceof Person && this.name === other.name && this.email === other.email;
    }
  }, {
    key: '__lt__',
    value: function __lt__(other) {
      return other instanceof Person && this.name < other.name && this.email < other.email;
    }
  }, {
    key: 'to_value',
    value: function to_value() {
      if (this.email) {
        return 'Person: ' + this.name + ' (' + this.email + ')';
      }
      return 'Person: ' + this.name;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.to_value();
    }
  }]);

  return Person;
}(Creator);

var Tool = exports.Tool = function (_Creator3) {
  _inherits(Tool, _Creator3);

  /*
  Tool entity.
    Fields:
    - name: tool identifier, with version. Type: str.
  */
  function Tool(name) {
    _classCallCheck(this, Tool);

    return _possibleConstructorReturn(this, (Tool.__proto__ || Object.getPrototypeOf(Tool)).call(this, name));
  }

  _createClass(Tool, [{
    key: 'to_value',
    value: function to_value() {
      return 'Tool: ' + this.name;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.to_value();
    }
  }]);

  return Tool;
}(Creator);

var CreationInfo = exports.CreationInfo = function (_Creator4) {
  _inherits(CreationInfo, _Creator4);

  /*
  Represent a document creation info.
    Fields:
    - creators: List of creators. At least one required.
        Type: Creator.
    - comment: Creation comment, optional. Type: str.
    - license_list_version: version of SPDX license used in creation of SPDX
        document. One, optional. Type: spdx.version.Version
    - created: Creation date. Mandatory one. Type: datetime.
  */
  function CreationInfo(created, comment, license_list_version) {
    _classCallCheck(this, CreationInfo);

    var _this4 = _possibleConstructorReturn(this, (CreationInfo.__proto__ || Object.getPrototypeOf(CreationInfo)).call(this));

    _this4.creators = [];
    _this4.created = created;
    _this4.comment = comment;
    _this4.license_list_version = license_list_version ? license_list_version : _config.LICENSE_LIST_VERSION;
    return _this4;
  }

  _createClass(CreationInfo, [{
    key: 'add_creator',
    value: function add_creator(creator) {
      this.creators.push(creator);
    }
  }, {
    key: 'remove_creator',
    value: function remove_creator(creator) {
      var index = this.creators.indexOf(creator);
      if (index !== -1) this.creators.splice(index, 1);
    }
  }, {
    key: 'set_created_now',
    value: function set_created_now() {
      return _moment2.default.utc().format();;
    }
  }, {
    key: 'created_iso_format',
    value: function created_iso_format() {
      return utilsjs.datetime_iso_format(this.created);
    }
  }, {
    key: 'has_comment',
    value: function has_comment() {
      return this.comment ? true : false;
    }
  }, {
    key: 'validate',
    value: function validate(messages) {
      messages = this.validate_creators(messages);
      messages = this.validate_created(messages);
      return messages;
    }
  }, {
    key: 'validate_creators',
    value: function validate_creators(messages) {
      if (this.creators.length === 0) {
        messages = messages + ' [\'No creators defined, must have at least one.\']';
      }
      return messages;
    }
  }, {
    key: 'validate_created',
    value: function validate_created(messages) {
      if (!this.created) {
        messages = messages + ' [\'Creation info missing created date.\']';
      }
      return messages;
    }
  }]);

  return CreationInfo;
}(Creator);

module.exports = {
  Creator: Creator,
  Organization: Organization,
  Person: Person,
  Tool: Tool,
  CreationInfo: CreationInfo
};