"use strict";
cc._RF.push(module, '12283UI1mNENIOYuouLTmCG', 'boom-map');
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