/**重启游戏脚本 */
cc.Class({
    extends: cc.Component,

    properties: {
        _sceneLoading: false,
    },

    // use this for initialization
    onLoad: function () {
        this.node.on('touchstart', function () {
            if (!this._sceneLoading) {
                this._sceneLoading = true;
                cc.director.loadScene('main-scene');
            }
        }, this);
    },

});
