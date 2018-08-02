(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/JoystickCommon.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9cf59eXMoZK9oUN0e4/P0qH', 'JoystickCommon', __filename);
// script/JoystickCommon.js

"use strict";

module.exports = {

    TouchType: cc.Enum({
        DEFAULT: 0,
        FOLLOW: 1
    }),

    //摇杆控制的方向维度：4个方向，8个方向，全部方向
    DirectionType: cc.Enum({
        FOUR: 4,
        EIGHT: 8,
        ALL: 0
    })

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
        //# sourceMappingURL=JoystickCommon.js.map
        