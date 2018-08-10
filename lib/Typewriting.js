"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Tick;
(function (Tick) {
    Tick[Tick["INIT"] = 0] = "INIT";
    Tick[Tick["WRITE"] = 1] = "WRITE";
    Tick[Tick["DELETE"] = 2] = "DELETE";
    Tick[Tick["START_DELETE"] = 3] = "START_DELETE";
})(Tick || (Tick = {}));
var Defaults;
(function (Defaults) {
    Defaults[Defaults["WRITE_SPEED_MS"] = 100] = "WRITE_SPEED_MS";
    Defaults[Defaults["DELETE_SPEED_MS"] = 60] = "DELETE_SPEED_MS";
    Defaults[Defaults["WAIT_BEFORE_DELETE_MS"] = 9000] = "WAIT_BEFORE_DELETE_MS";
})(Defaults || (Defaults = {}));
var randomizeTimeout = function (ms) { return Array.isArray(ms) ? (
// random value inside the specified min and max thresholds
ms[0] + (Math.random() * (ms[1] - ms[0]))) : (
// randomize the value - with a minimum threshold
Math.max(Math.random() * ms, 30)); };
var Typewriting = /** @class */ (function (_super) {
    __extends(Typewriting, _super);
    function Typewriting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tickTimeout = null;
        _this.state = {
            currentStringIdx: 0,
            currentCharPos: 0,
            isDeleting: false,
        };
        return _this;
    }
    Typewriting.prototype.componentDidMount = function () {
        this.queueTick(Tick.INIT);
    };
    Typewriting.prototype.componentWillUnmount = function () {
        if (this.tickTimeout != null) {
            clearTimeout(this.tickTimeout);
        }
    };
    Typewriting.prototype.queueTick = function (tickType) {
        var _this = this;
        var _a = this.props, writeSpeedMs = _a.writeSpeedMs, deleteSpeedMs = _a.deleteSpeedMs, waitBeforeDeleteMs = _a.waitBeforeDeleteMs;
        var timeout = tickType === Tick.INIT ? 0 :
            tickType === Tick.WRITE ? randomizeTimeout(writeSpeedMs != null ? writeSpeedMs : Defaults.WRITE_SPEED_MS) :
                tickType === Tick.DELETE ? randomizeTimeout(deleteSpeedMs != null ? deleteSpeedMs : Defaults.DELETE_SPEED_MS) :
                    tickType === Tick.START_DELETE ? waitBeforeDeleteMs != null ? waitBeforeDeleteMs : Defaults.WAIT_BEFORE_DELETE_MS :
                        0; // ¯\_(ツ)_/¯
        this.tickTimeout = setTimeout(function () { return _this.tick(); }, timeout);
    };
    Typewriting.prototype.moveToNextText = function () {
        var strings = this.props.strings;
        var currentStringIdx = this.state.currentStringIdx;
        var nextTextIdx = currentStringIdx + 1;
        this.setState({
            isDeleting: false,
            currentStringIdx: nextTextIdx < strings.length ? nextTextIdx : 0,
            currentCharPos: 0,
        });
    };
    Typewriting.prototype.tick = function () {
        var strings = this.props.strings;
        var _a = this.state, currentStringIdx = _a.currentStringIdx, currentCharPos = _a.currentCharPos, isDeleting = _a.isDeleting;
        var currentText = strings[currentStringIdx];
        var nextCharPos = isDeleting
            ? currentCharPos - 1
            : currentCharPos + 1;
        if (isDeleting) {
            if (nextCharPos < 0) {
                this.moveToNextText();
            }
            else {
                this.setState({
                    currentCharPos: nextCharPos,
                });
            }
            this.queueTick(Tick.DELETE);
        }
        else {
            if (nextCharPos > currentText.length) {
                this.setState({
                    isDeleting: true,
                });
                this.queueTick(Tick.START_DELETE);
            }
            else {
                this.setState({
                    currentCharPos: nextCharPos,
                });
                this.queueTick(Tick.WRITE);
            }
        }
    };
    Typewriting.prototype.render = function () {
        var strings = this.props.strings;
        var _a = this.state, currentStringIdx = _a.currentStringIdx, currentCharPos = _a.currentCharPos;
        var currentString = strings[currentStringIdx];
        var currentText = currentString.slice(0, currentCharPos);
        return React.createElement(React.Fragment, null, this.props.children({ currentText: currentText }));
    };
    return Typewriting;
}(React.PureComponent));
exports.default = Typewriting;
