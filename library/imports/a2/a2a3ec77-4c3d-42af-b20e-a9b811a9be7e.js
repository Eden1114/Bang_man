"use strict";
cc._RF.push(module, 'a2a3ex3TD1Cr7IOqbgRqb5+', 'player-control');
// script/player-control.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        hp: 100,
        realPlayer: false,
        hurtValue: 5,
        _hpLabel: {
            get: function get() {
                return this.node.getChildByName('hp-tips').getComponent(cc.Label);
            }
        },
        _sceneLoading: false,
        hurtDurationOfEnemyTouch: 0.5, //just use in enemy
        _hurtTimeStamp: null,
        _enemyRemoving: false,
        _gridControl: null
    },

    onLoad: function onLoad() {
        this._gridControl = require('grid-control');
        this._hurtTimeStamp = Date.now();

        this._hpLabel.string = this.hp;
        this.node.on('hurt-by-power', this.onHurt, this);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    // onCollisionEnter: function(other,self){
    //     console.log('enter',other.node.name);
    //     //console.log(self.node.name);
    // },

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

    checkGridTouch: function checkGridTouch(otherNode, selfNode) {
        var otherGrid = this._gridControl.getGrid(otherNode.position);
        var selfGrid = this._gridControl.getGrid(selfNode.position);
        if (otherGrid.x == selfGrid.x && otherGrid.y == selfGrid.y) {
            return true;
        } else {
            return false;
        }
    },

    // onCollisionExit: function(other,self){
    //     console.log('exit',other.node.name);
    //     //console.log(self.node.name);
    // },

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