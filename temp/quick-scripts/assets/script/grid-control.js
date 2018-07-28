(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/grid-control.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ba0f95wOGFOc7EWaHLN9+Sn', 'grid-control', __filename);
// script/grid-control.js

"use strict";

var gridWidth = 50;
var getGrid = function getGrid(position) {
    //[fix] anchor should included # use round instead of floor
    return cc.v2(Math.round(position.x / gridWidth), Math.round(position.y / gridWidth));
};
var getGridPosition = function getGridPosition(position) {
    return cc.pMult(getGrid(position), gridWidth);
};

module.exports = {
    getGrid: getGrid,
    getGridPosition: getGridPosition
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
        //# sourceMappingURL=grid-control.js.map
        