//界面的网格系统

let gridWidth = 50; //格子的宽度

/**计算出当前spirte所在格子*/
let getGrid = function (position) {
    //[fix] anchor should included # use round instead of floor
    return cc.v2(Math.round(position.x / gridWidth), Math.round(position.y / gridWidth))
};

/**通过格子坐标计算像素坐标 */
let getGridPosition = function (position) {
    return cc.pMult(getGrid(position), gridWidth);
}

module.exports = {
    getGrid,
    getGridPosition
}

