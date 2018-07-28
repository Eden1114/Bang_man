cc.Class({
    extends: cc.Component,

    properties: {
        _dropTimeStamp:null,
        restDuration: 3,
        _booming: false,
        _powerHandler: {
            get: function(){
                return this.node.getChildByName('power-handler');
            }
        },
        boomDuration: 0.2,
        power: 3,
        //power-init state
        //time-stamp-init state
        _state: null,
        _boomMap: null,
        _gridControl: null,
    },
    
    //design the way to get the grid position of player
    init: function () {
        this._boomMap = require('boom-map');
        this._gridControl = require('grid-control');
        this.node.on('time-stamp-sync',this.onTimeStampSync,this);

        //初始化威力scale
        for(let item of this._powerHandler.children){
            item.scaleX = this.power + 0.4;
        }

        //炮弹被放下后 会马上记录当前的时间戳
        this._dropTimeStamp = Date.now();
        //炮弹距离初始化状态
        this._state = 'power-init';
        //开启碰撞检测 修正炮弹威力
        this._powerHandler.active = true;
        this.scheduleOnce(function(){
            //重置碰撞
            this._powerHandler.active = false;
            this.scheduleOnce(function(){
                //炮弹时间初始化状态
                this._state = 'time-stamp-init';
                //[error]重新开启碰撞 同步炮弹爆炸时间
                this._powerHandler.active = true;
            }.bind(this),0)
        }.bind(this),0);
    }, 

    onTimeStampSync: function(e){
        let currentTimeStamp = this._dropTimeStamp;
        let innerTimeStamp = e.detail;
        if(innerTimeStamp < currentTimeStamp){
            this._dropTimeStamp = innerTimeStamp;
            this.node.emit('time-stamp-sync',innerTimeStamp);
        }
        
    },

    boom: function(){
        //渲染炮弹威力
        this._state = 'booming';
        this.node.emit('boom');
        this.scheduleOnce(function(){
                        //指定时间后 炮弹自动销毁↓
                        this._boomMap.unsetBoom(this._gridControl.getGrid(this.node.position));
                        this.node.removeFromParent();
        }.bind(this),this.boomDuration);
    },
    update: function(){
        //然后在update判断是否到达了要爆炸的时间
        if((this._dropTimeStamp + this.restDuration * 1000) <= Date.now()){
            //boom
            if(!this._booming){
                this._booming = true;
                this.boom();
            }
        }
    }

    

});
