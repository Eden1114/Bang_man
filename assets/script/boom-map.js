let boomMap = [];
module.exports = {
    isBoomSet: function(grid){
        let key = grid.x + '#' + grid.y;
        if(boomMap[key] == undefined){
            return false;
        }else{
            return true;
        }
    },
    unsetBoom: function(grid){
        let key = grid.x + '#' + grid.y;
        boomMap[key] = undefined;
    },
    setBoom: function(grid){
        let key = grid.x + '#' + grid.y;
        boomMap[key] = 'set';
    }
}
