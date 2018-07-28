cc.Class({
    extends: cc.Component,

    properties: {
        _left: false,
        _right: false,
        _up: false,
        _down: false,

        moveSpeed: 0,

        _leftBlock : 0,
        _rightBlock : 0,
        _upBlock : 0,
        _downBlock : 0,

        realPlayer: false,
        _player: null,
    },

    onLoad: function () {
        if(this.realPlayer){
        //移动很简单  首先开启按键的监听↓
            cc.systemEvent.on('keydown',this.onKeyDown,this);
            cc.systemEvent.on('keyup',this.onKeyUp,this);
        }else{
            this._player = this.node.parent.getChildByName('player');
        }
        //碰撞也很简单 首先开始碰撞回调↓
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'static-wall' || other.node.group == 'boom'){
            //如果碰撞的分组是墙壁 调用↓
            this.onTouchWall(other,self);
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'static-wall' || other.node.group == 'boom'){
            //离开墙壁的时候，记得解除碰撞的标志位↓
            this.onLeaveWall(other,self);
        }
    },

    onTouchWall: function(other,self){
        //check the preAabb and aabb
        
        let blockArray = [];
        //aabb是碰撞发生后嵌入墙壁的包围盒↓
        let selfAabb = self.world.aabb;
        let otherAabb = other.world.aabb;
        //preAabb是碰撞发生前一帧，未碰撞 还在墙壁外的包围盒↓
        let selfPreAabb = self.world.preAabb;
        let otherPreAabb = other.world.preAabb;

        //preAabb not touch by aabb touch => the edge blockArray

        //check left block
        //判断碰撞确实发生的思路是： preAabb的时候某边未嵌入墙壁 但是aabb的时候这个边已经嵌入了墙壁
        //就说明 这preAabb到aabb这个切换过程中，这个边确实碰到了墙壁
        //上下左右四个边都判断一次
        if(selfPreAabb.xMin >= otherAabb.xMax && selfAabb.xMin <= otherAabb.xMax){
            //left block
            let distance = Math.abs(otherAabb.xMax - selfPreAabb.xMin);
            //然后就保存碰撞的边
            blockArray.push({distance: distance, direction: 'left'});
        }
        //check right block
        if(selfPreAabb.xMax <= otherAabb.xMin && selfAabb.xMax >= otherAabb.xMin){
            //right block
            let distance = Math.abs(otherAabb.xMin - selfPreAabb.xMax);
            blockArray.push({distance: distance, direction: 'right'});
        }
        //check up block
        if(selfPreAabb.yMax <= otherAabb.yMin && selfAabb.yMax >= otherAabb.yMin){
            //up block
            let distance = Math.abs(otherAabb.yMin - selfPreAabb.yMax);
            blockArray.push({distance: distance, direction: 'up'});
        }
        //check down block
        if(selfPreAabb.yMin >= otherAabb.yMax && selfAabb.yMin <= otherAabb.yMax){
            //down block
            let distance = Math.abs(otherAabb.yMax - selfPreAabb.yMin);
            blockArray.push({distance: distance, direction: 'down'});
        }
        //让墙壁帮我们保存碰撞的数组
        if(other.blockArray == undefined){other.blockArray = {};}
        other.blockArray[self.node.name] = blockArray;

        //遍历碰撞的数组 设置碰撞的标志位
        for(let item of blockArray){
            let blockName = '_' + item.direction + "Block";
            this[blockName] += 1;
        }
    },

    onLeaveWall: function(other,self){
        //和touchWall部分同理
        if(other.blockArray !== undefined && other.blockArray[self.node.name] !== undefined){
            for(let item of other.blockArray[self.node.name]){
                let blockName = '_' + item.direction + 'Block';
                //不过这次是解除
                this[blockName] -= 1;
            }
            //然后清空碰撞数组
            other.blockArray[self.node.name] = [];
        }
    },

    onKeyDown: function(e){
        //在按下的时候设置方向标志位↓
        switch(e.keyCode){
            case cc.KEY.up: {this._up = true;break}
            case cc.KEY.down: {this._down = true;break}
            case cc.KEY.left: {this._left = true;this.node.scaleX = -1;this.node.children[0].scaleX = -1;break}
            case cc.KEY.right: {this._right = true;this.node.scaleX = 1;this.node.children[0].scaleX = 1;break}
        }
    },

    onKeyUp: function(e){
        //在弹起的时候解除方向标志位↓
        switch(e.keyCode){
            case cc.KEY.up: {this._up = false;break}
            case cc.KEY.down: {this._down = false;break}
            case cc.KEY.left: {this._left = false;break}
            case cc.KEY.right: {this._right = false;break}
        }    
    },

    update: function(dt){
        //然后根据标志位移动玩家
        //能够移动的判断标准是  想往某个方向移动并且那个方向畅通无阻 才能移动
        if(!this.realPlayer){
            //计算玩家位置并不断追逐
            let targetVector = cc.pSub(this._player.position,this.node.position);
            let moveStep = cc.pMult(cc.pNormalize(targetVector),this.moveSpeed);
            if(moveStep.x > 0 && !!this._rightBlock){moveStep.x = 0;}
            if(moveStep.x < 0 && !!this._leftBlock){moveStep.x = 0;}
            if(moveStep.y > 0 && !!this._upBlock){moveStep.y = 0;}
            if(moveStep.y < 0 && !!this._downBlock){moveStep.y = 0;}
            if(moveStep.x > 0){this.node.scaleX = 1;this.node.children[0].scaleX = 1;}
            if(moveStep.x < 0){this.node.scaleX = -1;this.node.children[0].scaleX = -1;}
            this.node.position = cc.pAdd(this.node.position,moveStep);
        }else{

            if(this._left && !this._leftBlock){this.node.x -= this.moveSpeed}
            if(this._right && !this._rightBlock){this.node.x += this.moveSpeed}
            if(this._up && !this._upBlock){this.node.y += this.moveSpeed}
            if(this._down && !this._downBlock){this.node.y -= this.moveSpeed}
        }
    }
});
