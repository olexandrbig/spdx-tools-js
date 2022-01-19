"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// SPDX-License-Identifier: MIT


var BuilderException = exports.BuilderException = function (_Error) {
  _inherits(BuilderException, _Error);

  // Builder exception base class.
  function BuilderException() {
    var _ref;

    _classCallCheck(this, BuilderException);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = BuilderException.__proto__ || Object.getPrototypeOf(BuilderException)).call.apply(_ref, [this].concat(args)));

    Error.captureStackTrace(_this, GoodError);
    return _this;
  }

  return BuilderException;
}(Error);

var CardinalityError = exports.CardinalityError = function (_BuilderException) {
  _inherits(CardinalityError, _BuilderException);

  function CardinalityError(msg) {
    _classCallCheck(this, CardinalityError);

    var _this2 = _possibleConstructorReturn(this, (CardinalityError.__proto__ || Object.getPrototypeOf(CardinalityError)).call(this));

    _this2.msg = msg;
    return _this2;
  }

  return CardinalityError;
}(BuilderException);

var SPDXValueError = exports.SPDXValueError = function (_BuilderException2) {
  _inherits(SPDXValueError, _BuilderException2);

  function SPDXValueError(msg) {
    _classCallCheck(this, SPDXValueError);

    var _this3 = _possibleConstructorReturn(this, (SPDXValueError.__proto__ || Object.getPrototypeOf(SPDXValueError)).call(this));

    _this3.msg = msg;
    return _this3;
  }

  return SPDXValueError;
}(BuilderException);

var OrderError = exports.OrderError = function (_BuilderException3) {
  _inherits(OrderError, _BuilderException3);

  function OrderError(msg) {
    _classCallCheck(this, OrderError);

    var _this4 = _possibleConstructorReturn(this, (OrderError.__proto__ || Object.getPrototypeOf(OrderError)).call(this));

    _this4.msg = msg;
    return _this4;
  }

  return OrderError;
}(BuilderException);