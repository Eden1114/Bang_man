(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/boom-map.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '12283UI1mNENIOYuouLTmCG', 'boom-map', __filename);
// script/boom-map.js

'use strict';

var boomMap = [];
module.exports = {
    isBoomSet: function isBoomSet(grid) {
        var key = grid.x + '#' + grid.y;
        if (boomMap[key] == undefined) {
            return false;
        } else {
            return true;
        }
    },
    unsetBoom: function unsetBoom(grid) {
        var key = grid.x + '#' + grid.y;
        boomMap[key] = undefined;
    },
    setBoom: function setBoom(grid) {
        var key = grid.x + '#' + grid.y;
        boomMap[key] = 'set';
    }
};

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
        //# sourceMappingURL=boom-map.js.map
        