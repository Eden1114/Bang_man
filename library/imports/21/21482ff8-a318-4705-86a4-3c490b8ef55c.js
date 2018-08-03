"use strict";
cc._RF.push(module, '21482/4oxhHBYakPEkLjvVc', 'labelControl_2');
// script/labelControl_2.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        _grade: {
            get: function get() {
                return this.node.getComponent(cc.Label);
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._grade.string = 'Your Grades: ' + window.yourgrade;
        console.log(this._grade.string);
    },
    start: function start() {},
    update: function update(dt) {
        this._grade.string = 'Your Grades: ' + window.yourgrade;
        console.log(this._grade.string);
    }
});

cc._RF.pop();