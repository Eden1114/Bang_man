// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        _grade:{
            get: function () {
                return this.node.getComponent(cc.Label);
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._grade.string='Your Grades: '+window.yourgrade;
        console.log(this._grade.string);
    },

    start () {

    },

    update (dt) {
        this._grade.string='Your Grades: '+window.yourgrade;
        console.log(this._grade.string);
    },
});
