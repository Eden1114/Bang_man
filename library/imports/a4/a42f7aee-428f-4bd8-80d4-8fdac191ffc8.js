"use strict";
cc._RF.push(module, 'a42f7ruQo9L2IDUj9rBkf/I', 'enemy-generator');
// script/enemy-generator.js

'use strict';

/**生成敌人的脚本 */
cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefabArray: [cc.Prefab],
        time: 10,
        num: 1,
        _currentTime: 1,
        ground: cc.Node,
        _sceneLoading: false
    },

    onLoad: function onLoad() {
        window.enemyNum = 0;
        window.yourgrade = 0;
        console.log(window.yourgrade);
        this.schedule(this.generator.bind(this), 1);
    },

    generator: function generator() {
        if (window.enemyNum == 0) {

            //结束所有轮游戏，进入胜利界面
            if (this._currentTime == this.time) {
                if (!this._sceneLoading) {
                    this._sceneLoading = true;
                    cc.director.loadScene('win-scene');
                    return;
                }
            }

            //进入下一轮，添加敌人
            else {
                    var enemyNum = this.num * this._currentTime + 3;

                    for (var i = 0; i < enemyNum; i++) {
                        var enemyIdx = Math.floor(Math.random() * this.enemyPrefabArray.length);
                        var enemy = cc.instantiate(this.enemyPrefabArray[enemyIdx]);
                        var randomPosition = null;

                        //enemy的生成位置
                        if (Math.random() > 0.5) {
                            randomPosition = cc.v2(Math.round(cc.random0To1() * 950), cc.random0To1() * 500);
                        } else {
                            randomPosition = cc.v2(cc.random0To1() * 950, Math.round(cc.random0To1()) * 500);
                        }

                        this.ground.addChild(enemy);
                        enemy.name = 'enemy' + Date.now();
                        enemy.position = randomPosition;
                        window.enemyNum++;
                    }

                    this._currentTime++;
                }
        }
    }
});

cc._RF.pop();