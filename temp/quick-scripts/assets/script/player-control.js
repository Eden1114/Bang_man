(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/player-control.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a2a3ex3TD1Cr7IOqbgRqb5+', 'player-control', __filename);
// script/player-control.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        hp: 100, //当前剩余的血量
        realPlayer: false,
        hurtValue: 5, //受伤害时，扣除的hp量
        _hpLabel: {
            get: function get() {
                return this.node.getChildByName('hp-tips').getComponent(cc.Label);
            }
        }, //用于放置血量的label
        _sceneLoading: false,
        hurtDurationOfEnemyTouch: 0.5, //just use in enemy
        _hurtTimeStamp: null,
        _enemyRemoving: false,
        _gridControl: null
    },

    onLoad: function onLoad() {

        this._gridControl = require('grid-control');
        this._hurtTimeStamp = Date.now();

        this._hpLabel.string = this.hp; //设置hp
        this.node.on('hurt-by-power', this.onHurt, this); //收到伤害时执行的函数

        //获取碰撞检测系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //FOR DEGUB
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    },

    /**
     * 当碰撞保持的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function onCollisionStay(other, self) {
        if (this.realPlayer && other.node.group == 'player') {
            //[add] check the grid
            if (this.checkGridTouch(other.node, self.node)) {
                if (this._hurtTimeStamp + this.hurtDurationOfEnemyTouch * 1000 <= Date.now()) {
                    this.onHurt();
                    this._hurtTimeStamp = Date.now();
                }
            }
        }
    },

    //判断两个spirte是否在一个格子内
    checkGridTouch: function checkGridTouch(otherNode, selfNode) {
        var otherGrid = this._gridControl.getGrid(otherNode.position);
        var selfGrid = this._gridControl.getGrid(selfNode.position);

        if (otherGrid.x == selfGrid.x && otherGrid.y == selfGrid.y) {
            return true;
        } else {
            return false;
        }
    },

    // 受到伤害时
    onHurt: function onHurt() {
        this.hp -= this.hurtValue;
        if (this.hp <= 0) {
            if (this.realPlayer) {
                //game over
                if (!this._sceneLoading) {
                    this._sceneLoading = true;
                    cc.director.loadScene('game-over-scene');
                }
            } else {
                //enemy removed
                if (!this._enemyRemoving) {
                    this._enemyRemoving = true;
                    window.enemyNum--;
                    this.node.removeFromParent();
                }
            }
        } else {
            this._hpLabel.string = this.hp;
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
        //# sourceMappingURL=player-control.js.map
        