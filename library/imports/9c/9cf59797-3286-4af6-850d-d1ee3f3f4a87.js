"use strict";
cc._RF.push(module, '9cf59eXMoZK9oUN0e4/P0qH', 'JoystickCommon');
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