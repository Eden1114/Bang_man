"use strict";
cc._RF.push(module, 'd528582PatONZWwDgBdwAse', 'restart-script');
// script/restart-script.js

'use strict';

/**重启游戏脚本 */
cc.Class({
    extends: cc.Component,

    properties: {
        _sceneLoading: false
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on('touchstart', function () {
            if (!this._sceneLoading) {
                this._sceneLoading = true;
                cc.director.loadScene('main-scene');
            }
        }, this);
    }

});

cc._RF.pop();