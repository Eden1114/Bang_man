cc.Class({
    extends: cc.Component,

    properties: {
        hp: 100,    //当前剩余的血量
        realPlayer: false,
        hurtValue: 5,   //受伤害时，扣除的hp量
        _hpLabel: {
            get: function () {
                return this.node.getChildByName('hp-tips').getComponent(cc.Label);
            }
        },  //用于放置血量的label

        _sceneLoading: false,
        hurtDurationOfEnemyTouch: 0.5,  //just use in enemy
        _hurtTimeStamp: null,
        _enemyRemoving: false,
        _gridControl: null,
    },

    onLoad: function () {

        this._gridControl = require('grid-control');
        this._hurtTimeStamp = Date.now();

        this._hpLabel.string = this.hp; //设置hp

        this.node.on('hurt-by-power', this.onHurt, this);   //收到伤害时执行的函数

        //获取碰撞检测系统
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //FOR DEGUB
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    },

    /**
     * 当碰撞保持的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function (other, self) {
        if (this.realPlayer && other.node.group == 'player') {
            //[add] check the grid
            if (this.checkGridTouch(other.node, self.node)) {
                if (this._hurtTimeStamp + this.hurtDurationOfEnemyTouch * 1000 <= Date.now()) {
                    this.onHurt();
                    this._hurtTimeStamp = Date.now();
                }
            }
        }
    },

    //判断两个spirte是否在一个格子内
    checkGridTouch: function (otherNode, selfNode) {
        let otherGrid = this._gridControl.getGrid(otherNode.position);
        let selfGrid = this._gridControl.getGrid(selfNode.position);

        if (otherGrid.x == selfGrid.x && otherGrid.y == selfGrid.y) {
            return true;
        } else {
            return false;
        }
    },


    // 受到伤害时
    onHurt: function () {
        this.hp -= this.hurtValue;
        if (this.hp <= 0) {
            if (this.realPlayer) {
                //game over
                if (!this._sceneLoading) {
                    this._sceneLoading = true;
                    cc.director.loadScene('game-over-scene');
                }
            } else {
                //enemy removed
                if (!this._enemyRemoving) {
                    this._enemyRemoving = true;
                    window.enemyNum--;
                    window.yourgrade+=100;
                    this.node.removeFromParent();
                }
            }
        } else {
            this._hpLabel.string = this.hp;
        }

    }

});
