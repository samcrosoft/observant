/**
 * observant - Lightweight event observer for node
 * @version v1.0.0
 * @link https://github.com/samcrosoft/observant
 * @license MIT
 */
/**
 * Created by Adebola on 08/02/2016.
 */
"use strict";

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Observant = (function () {
    function Observant() {
        _classCallCheck(this, Observant);

        this.observers = {};
    }

    _createClass(Observant, [{
        key: 'observe',
        value: function observe(event, observer) {
            if (!this.observers['event']) {
                this.observers['event'] = [];
            }
            this.observers[event].push(observer);
            return this;
        }
    }, {
        key: 'ignore',
        value: function ignore(event, observer) {
            var index = -1;
            if (1 == arguments.length) {
                delete this.observers[event];
                return this;
            }

            if (this.observers[event]) {
                index = this.observers[event].indexOf(observer);
                if (-1 != index) {
                    this.observers[event][index] = null;
                }
            }

            return this;
        }
    }, {
        key: 'notify',
        value: function notify(event, data) {
            var observers = this.observers[event];
            if (!observers) {
                return this;
            }
            var i = 0;
            while (i < observers.length) {
                if (null != observers[i]) {
                    // make the call to the observer here
                    observers[i](data);
                }
                ++i;
            }

            i = 0;
            while (i < observers.length) {
                if (null == observers[i]) {
                    observers.splice(i, 1);
                }
                ++i;
            }
            // clear out the observers at this stage
            if (observers.length < 1) {
                delete this.observers[event];
            }
        }
    }]);

    return Observant;
})();

exports['default'] = Observant;
module.exports = exports['default'];