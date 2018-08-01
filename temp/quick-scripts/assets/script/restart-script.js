(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/restart-script.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd528582PatONZWwDgBdwAse', 'restart-script', __filename);
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
        //# sourceMappingURL=restart-script.js.map
        