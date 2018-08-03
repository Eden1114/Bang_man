(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/move-control.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a8a55hRY49K4rNKDkt3X7Yq', 'move-control', __filename);
// script/move-control.js

'use strict';

/** 通过键盘↑↓←→和space控制移动和防止炸弹*/
cc.Class({
    extends: cc.Component,

    properties: {
        _left: false,
        _right: false,
        _up: false,
        _down: false,

        // _gradeLable:{
        //     get: function () {
        //         return this.node.getChildByName('grade').getComponent(cc.Label);
        //     }
        // },

        moveSpeed: 0,

        _leftBlock: 0,
        _rightBlock: 0,
        _upBlock: 0,
        _downBlock: 0,

        realPlayer: false,
        _player: null
    },

    onLoad: function onLoad() {
        // this._gradeLable.string='Grades:'+window.yourgrade;
        if (this.realPlayer) {
            //移动功能 开启按键的监听
            cc.systemEvent.on('keydown', this.onKeyDown, this);
            cc.systemEvent.on('keyup', this.onKeyUp, this);
        } else {
            this._player = this.node.parent.getChildByName('player');
        }
        //碰撞功能 先打开碰撞回调
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == 'static-wall' || other.node.group == 'boom') {
            //如果碰撞的分组是墙壁 调用↓
            this.onTouchWall(other, self);
        }
    },

    onCollisionExit: function onCollisionExit(other, self) {
        if (other.node.group == 'static-wall' || other.node.group == 'boom') {
            //离开墙壁的时候，记得解除碰撞的标志位
            this.onLeaveWall(other, self);
        }
    },

    onTouchWall: function onTouchWall(other, self) {
        //check the preAabb and aabb

        var blockArray = [];
        //aabb是碰撞发生后嵌入墙壁的包围盒↓
        var selfAabb = self.world.aabb;
        var otherAabb = other.world.aabb;
        //preAabb是碰撞发生前一帧，未碰撞 还在墙壁外的包围盒↓
        var selfPreAabb = self.world.preAabb;
        var otherPreAabb = other.world.preAabb;

        //preAabb not touch by aabb touch => the edge blockArray

        //check left block
        //判断碰撞确实发生的思路是： preAabb的时候某边未嵌入墙壁 但是aabb的时候这个边已经嵌入了墙壁
        //就说明 这preAabb到aabb这个切换过程中，这个边确实碰到了墙壁
        //上下左右四个边都判断一次
        if (selfPreAabb.xMin >= otherAabb.xMax && selfAabb.xMin <= otherAabb.xMax) {
            //left block
            var distance = Math.abs(otherAabb.xMax - selfPreAabb.xMin);
            //然后就保存碰撞的边
            blockArray.push({ distance: distance, direction: 'left' });
        }
        //check right block
        if (selfPreAabb.xMax <= otherAabb.xMin && selfAabb.xMax >= otherAabb.xMin) {
            //right block
            var _distance = Math.abs(otherAabb.xMin - selfPreAabb.xMax);
            blockArray.push({ distance: _distance, direction: 'right' });
        }
        //check up block
        if (selfPreAabb.yMax <= otherAabb.yMin && selfAabb.yMax >= otherAabb.yMin) {
            //up block
            var _distance2 = Math.abs(otherAabb.yMin - selfPreAabb.yMax);
            blockArray.push({ distance: _distance2, direction: 'up' });
        }
        //check down block
        if (selfPreAabb.yMin >= otherAabb.yMax && selfAabb.yMin <= otherAabb.yMax) {
            //down block
            var _distance3 = Math.abs(otherAabb.yMax - selfPreAabb.yMin);
            blockArray.push({ distance: _distance3, direction: 'down' });
        }
        //让墙壁帮我们保存碰撞的数组
        if (other.blockArray == undefined) {
            other.blockArray = {};
        }
        other.blockArray[self.node.name] = blockArray;

        //遍历碰撞的数组 设置碰撞的标志位
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = blockArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                var blockName = '_' + item.direction + "Block";
                this[blockName] += 1;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    },

    onLeaveWall: function onLeaveWall(other, self) {
        //和touchWall部分同理
        if (other.blockArray !== undefined && other.blockArray[self.node.name] !== undefined) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = other.blockArray[self.node.name][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    var blockName = '_' + item.direction + 'Block';
                    //不过这次是解除
                    this[blockName] -= 1;
                }
                //然后清空碰撞数组
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            other.blockArray[self.node.name] = [];
        }
    },

    onKeyDown: function onKeyDown(e) {
        //在按下的时候设置方向标志位
        switch (e.keyCode) {
            case cc.KEY.up:
                {
                    this._up = true;break;
                }
            case cc.KEY.down:
                {
                    this._down = true;break;
                }
            case cc.KEY.left:
                {
                    this._left = true;this.node.scaleX = -1;this.node.children[0].scaleX = -1;break;
                }
            case cc.KEY.right:
                {
                    this._right = true;this.node.scaleX = 1;this.node.children[0].scaleX = 1;break;
                }
        }
    },

    onKeyUp: function onKeyUp(e) {
        //在弹起的时候解除方向标志位
        switch (e.keyCode) {
            case cc.KEY.up:
                {
                    this._up = false;break;
                }
            case cc.KEY.down:
                {
                    this._down = false;break;
                }
            case cc.KEY.left:
                {
                    this._left = false;break;
                }
            case cc.KEY.right:
                {
                    this._right = false;break;
                }
        }
    },

    onDirectionMove: function onDirectionMove(touch_end, speed, angle) {
        // this._player.x += dx;
        // this._player.y += dy;
        //console.log(touch_end, speed, angle);
        // this.moveSpeed = speed;
        if (touch_end) {
            this._up = false;
            this._down = false;
            this._left = false;
            this._right = false;
        } else if (speed > 0) {
            // this.speed = speed;
            this._up = false;
            this._down = false;
            this._left = false;
            this._right = false;

            //右
            if (angle > -22.5 && angle <= 0 || angle > 0 && angle <= 22.5) {
                this._right = true;
                this.node.scaleX = 1;
                this.node.children[0].scaleX = 1;
            }

            //右上
            if (angle > 22.5 && angle <= 22.5 + 45) {
                this._up = true;
                this._right = true;
                this.node.scaleX = 1;
                this.node.children[0].scaleX = 1;
            }

            //上
            if (angle > 22.5 + 45 && angle <= 22.5 + 90) {
                this._up = true;
            }

            //左上
            if (angle > 22.5 + 90 && angle <= 22.5 + 135) {
                this._up = true;
                this._left = true;
                this.node.scaleX = -1;
                this.node.children[0].scaleX = -1;
            }

            //左
            if (angle > 22.5 + 135 && angle <= 180 || angle >= -180 && angle <= -180 + 22.5) {
                this._left = true;
                this.node.scaleX = -1;
                this.node.children[0].scaleX = -1;
            }

            //左下
            if (angle > -180 + 22.5 && angle <= -180 + 22.5 + 45) {
                this._down = true;
                this.node.scaleX = -1;
                this.node.children[0].scaleX = -1;
            }

            //下
            if (angle > -135 + 22.5 && angle <= -90 + 22.5) {
                this._down = true;
            }

            //右下
            if (angle > -90 + 22.5 && angle <= -22.5) {
                this._down = true;
                this._right = true;
                this.node.scaleX = 1;
                this.node.children[0].scaleX = 1;
            }
        }
    },

    update: function update(dt) {

        // this._gradeLable.string='Grades:'+window.yourgrade;
        //然后根据标志位移动玩家
        //能够移动的判断标准是  想往某个方向移动并且那个方向畅通无阻 才能移动
        if (!this.realPlayer) {
            //计算玩家位置并不断追逐
            var targetVector = cc.pSub(this._player.position, this.node.position);
            var moveStep = cc.pMult(cc.pNormalize(targetVector), this.moveSpeed);
            if (moveStep.x > 0 && !!this._rightBlock) {
                moveStep.x = 0;
            }
            if (moveStep.x < 0 && !!this._leftBlock) {
                moveStep.x = 0;
            }
            if (moveStep.y > 0 && !!this._upBlock) {
                moveStep.y = 0;
            }
            if (moveStep.y < 0 && !!this._downBlock) {
                moveStep.y = 0;
            }
            if (moveStep.x > 0) {
                this.node.scaleX = 1;this.node.children[0].scaleX = 1;
            }
            if (moveStep.x < 0) {
                this.node.scaleX = -1;this.node.children[0].scaleX = -1;
            }
            this.node.position = cc.pAdd(this.node.position, moveStep);
        } else {
            if (this._left && !this._leftBlock) {
                this.node.x -= this.moveSpeed;
            }
            if (this._right && !this._rightBlock) {
                this.node.x += this.moveSpeed;
            }
            if (this._up && !this._upBlock) {
                this.node.y += this.moveSpeed;
            }
            if (this._down && !this._downBlock) {
                this.node.y -= this.moveSpeed;
            }
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=move-control.js.map
        