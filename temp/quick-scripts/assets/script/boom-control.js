(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/boom-control.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '43291ejLNZBZa4lLl0tdTiw', 'boom-control', __filename);
// script/boom-control.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        _dropTimeStamp: null,
        restDuration: 3,
        _booming: false,
        _powerHandler: {
            get: function get() {
                return this.node.getChildByName('power-handler');
            }
        },
        boomDuration: 0.2,
        power: 3,
        //power-init state
        //time-stamp-init state
        _state: null,
        _boomMap: null,
        _gridControl: null
    },

    //design the way to get the grid position of player
    init: function init() {
        this._boomMap = require('boom-map');
        this._gridControl = require('grid-control');
        this.node.on('time-stamp-sync', this.onTimeStampSync, this);

        //初始化威力scale
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this._powerHandler.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                item.scaleX = this.power + 0.4;
            }

            //炮弹被放下后 会马上记录当前的时间戳
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this._dropTimeStamp = Date.now();
        //炮弹距离初始化状态
        this._state = 'power-init';
        //开启碰撞检测 修正炮弹威力
        this._powerHandler.active = true;
        this.scheduleOnce(function () {
            //重置碰撞
            this._powerHandler.active = false;
            this.scheduleOnce(function () {
                //炮弹时间初始化状态
                this._state = 'time-stamp-init';
                //[error]重新开启碰撞 同步炮弹爆炸时间
                this._powerHandler.active = true;
            }.bind(this), 0);
        }.bind(this), 0);
    },

    onTimeStampSync: function onTimeStampSync(e) {
        var currentTimeStamp = this._dropTimeStamp;
        var innerTimeStamp = e.detail;
        if (innerTimeStamp < currentTimeStamp) {
            this._dropTimeStamp = innerTimeStamp;
            this.node.emit('time-stamp-sync', innerTimeStamp);
        }
    },

    boom: function boom() {
        //渲染炮弹威力
        this._state = 'booming';
        this.node.emit('boom');
        this.scheduleOnce(function () {
            //指定时间后 炮弹自动销毁↓
            this._boomMap.unsetBoom(this._gridControl.getGrid(this.node.position));
            this.node.removeFromParent();
        }.bind(this), this.boomDuration);
    },

    update: function update() {
        //  然后在update判断是否到达了要爆炸的时间
        if (this._dropTimeStamp + this.restDuration * 1000 <= Date.now()) {
            //boom
            if (!this._booming) {
                this._booming = true;
                this.boom();
            }
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=boom-control.js.map
        