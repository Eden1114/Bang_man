"use strict";
cc._RF.push(module, 'ba0f95wOGFOc7EWaHLN9+Sn', 'grid-control');
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