let gridWidth = 50;
let getGrid = function(position){
        //[fix] anchor should included # use round instead of floor
        return cc.v2(Math.round(position.x / gridWidth), Math.round(position.y / gridWidth))
    };
let getGridPosition = function(position){
        return cc.pMult(getGrid(position),gridWidth);
    }

module.exports = { 
    getGrid,
    getGridPosition
}

