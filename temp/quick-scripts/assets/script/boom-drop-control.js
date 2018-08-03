(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/boom-drop-control.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c40e18bGMpD0ZiZhp9KmDi6', 'boom-drop-control', __filename);
// script/boom-drop-control.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        //boomPrefab: cc.Prefab,
        boomPrefabArray: [cc.Prefab],
        groundPanel: cc.Node,
        _gridControl: null,
        _boomMap: null,
        dropAudio: {
            default: null,
            url: cc.AudioClip
        },
        _button: cc.Node
    },

    onLoad: function onLoad() {
        cc.systemEvent.on('keydown', this.onKeyDown, this), this._gridControl = require('grid-control');
        this._boomMap = require('boom-map');
    },

    onKeyDown: function onKeyDown(e) {
        if (e.keyCode == cc.KEY.space) {
            cc.audioEngine.playEffect(this.dropAudio, false);
            this.dropBoom();
        }
    },
    //[fix] design the way the cal the grid position and drop the boom in the center of grid
    dropBoom: function dropBoom() {
        var grid = this._gridControl.getGrid(this.node.position);
        if (this._boomMap.isBoomSet(grid)) {
            return;
        }
        this._boomMap.setBoom(grid);
        var boomIdx = Math.floor(Math.random() * this.boomPrefabArray.length);
        var boom = cc.instantiate(this.boomPrefabArray[boomIdx]);
        this.groundPanel.addChild(boom);
        //[add] set grid position of boom
        //boom.position = this.node.position;
        boom.position = this._gridControl.getGridPosition(this.node.position);
        boom.getComponent('boom-control').init();
        boom.zIndex = this.node.zIndex - 1;
    },

    dropBoomByButton: function dropBoomByButton() {
        cc.audioEngine.playEffect(this.dropAudio, false);
        this.dropBoom();
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
        //# sourceMappingURL=boom-drop-control.js.map
        