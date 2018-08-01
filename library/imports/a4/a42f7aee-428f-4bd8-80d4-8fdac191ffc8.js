"use strict";
cc._RF.push(module, 'a42f7ruQo9L2IDUj9rBkf/I', 'enemy-generator');
// script/enemy-generator.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        //enemyPrefab: cc.Prefab,
        enemyPrefabArray: [cc.Prefab],
        time: 10,
        num: 1,
        _currentTime: 1,
        ground: cc.Node,
        _sceneLoading: false
    },

    onLoad: function onLoad() {
        window.enemyNum = 0;
        //this.generator();
        this.schedule(this.generator.bind(this), 1);
    },

    generator: function generator() {
        if (window.enemyNum == 0) {
            if (this._currentTime == this.time) {
                if (!this._sceneLoading) {
                    this._sceneLoading = true;
                    cc.director.loadScene('win-scene');
                    return;
                }
            }
            var enemyNum = this.num * this._currentTime;
            for (var i = 0; i < enemyNum; i++) {
                var enemyIdx = Math.floor(Math.random() * this.enemyPrefabArray.length);
                var enemy = cc.instantiate(this.enemyPrefabArray[enemyIdx]);
                var randomPosition = null;
                if (Math.random() > 0.5) {
                    randomPosition = cc.v2(Math.round(cc.random0To1() * 950), cc.random0To1() * 530);
                } else {
                    randomPosition = cc.v2(cc.random0To1() * 950, Math.round(cc.random0To1()) * 530);
                }
                this.ground.addChild(enemy);
                enemy.name = 'enemy' + Date.now();
                enemy.position = randomPosition;
                window.enemyNum++;
            }
            this._currentTime++;
        }
    }

});

cc._RF.pop();