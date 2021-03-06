(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './String'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../lib/String'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.String);
        global.Marker = mod.exports;
    }
})(this, function (exports, _react, _String) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Marker = undefined;

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var evtNames = ['click', 'mouseover', 'recenter'];

    var wrappedPromise = function wrappedPromise() {
        var wrappedPromise = {},
            promise = new Promise(function (resolve, reject) {
                wrappedPromise.resolve = resolve;
                wrappedPromise.reject = reject;
            });
        wrappedPromise.then = promise.then.bind(promise);
        wrappedPromise.catch = promise.catch.bind(promise);
        wrappedPromise.promise = promise;

        return wrappedPromise;
    };

    var Marker = exports.Marker = function (_React$Component) {
        _inherits(Marker, _React$Component);

        function Marker() {
            _classCallCheck(this, Marker);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Marker).apply(this, arguments));
        }

        _createClass(Marker, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.markerPromise = wrappedPromise();
                this.renderMarker();
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps) {
                if (this.props.map !== prevProps.map || this.props.position !== prevProps.position) {
                    if (this.marker) {
                        this.marker.setMap(null);
                    }
                    this.renderMarker();
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                if (this.marker) {
                    this.marker.setMap(null);
                }
            }
        }, {
            key: 'renderMarker',
            value: function renderMarker() {
                var _this2 = this;

                var _props = this.props;
                var map = _props.map;
                var google = _props.google;
                var position = _props.position;
                var mapCenter = _props.mapCenter;
                var url = _props.url;
                var sizeValueX= _props.sizeX;
                var sizeValueY = _props.sizeY;
                var animate = _props.animate
                if (!google) {
                    return null;
                }
                var animation = false
                if (animate == true){
                    animation = google.maps.Animation.DROP;
                }
                var pos = position || mapCenter;
                if (!(pos instanceof google.maps.LatLng)) {
                    position = new google.maps.LatLng(pos.lat, pos.lng);
                }
                //var temp = 28*sizeValue/100;
                var size = new google.maps.Size(sizeValueX,sizeValueY);

                var pref = {
                    map: map,
                    position: mapCenter,
                    icon:{
                        url: url,
                        scaledSize : size
                    },
                    draggable:true,
                    animation: animation,                   
                };
                this.marker = new google.maps.Marker(pref);

                evtNames.forEach(function (e) {
                    _this2.marker.addListener(e, _this2.handleEvent(e));
                });

                this.markerPromise.resolve(this.marker);
            }
        }, {
            key: 'getMarker',
            value: function getMarker() {
                return this.markerPromise;
            }
        }, {
            key: 'handleEvent',
            value: function handleEvent(evt) {
                var _this3 = this;

                return function (e) {
                    var evtName = 'on' + (0, _String.camelize)(evt);
                    if (_this3.props[evtName]) {
                        _this3.props[evtName](_this3.props, _this3.marker, e);
                    }
                };
            }
        }, {
            key: 'render',
            value: function render() {
                return null;
            }
        }]);

        return Marker;
    }(_react2.default.Component);

    Marker.propTypes = {
        position: _react.PropTypes.object,
        map: _react.PropTypes.object,
        url: _react.PropTypes.string,
        sizeX: _react.PropTypes.number,
        syzeY:_react.PropTypes.number,
        animate: _react.PropTypes.boolean,
    };

    evtNames.forEach(function (e) {
        return Marker.propTypes[e] = _react.PropTypes.func;
    });

    Marker.defaultProps = {
        name: 'Marker'
    };

    exports.default = Marker;
});