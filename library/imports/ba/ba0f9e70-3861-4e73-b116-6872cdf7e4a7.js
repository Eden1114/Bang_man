"use strict";
cc._RF.push(module, 'ba0f95wOGFOc7EWaHLN9+Sn', 'grid-control');
// script/grid-control.js

"use strict";

//界面的网格系统

var gridWidth = 50; //格子的宽度

/**计算出当前spirte所在格子*/
var getGrid = function getGrid(position) {
    //[fix] anchor should included # use round instead of floor
    return cc.v2(Math.round(position.x / gridWidth), Math.round(position.y / gridWidth));
};

/**通过格子坐标计算像素坐标 */
var getGridPosition = function getGridPosition(position) {
    return cc.pMult(getGrid(position), gridWidth);
};

module.exports = {
    getGrid: getGrid,
    getGridPosition: getGridPosition
};

cc._RF.pop();