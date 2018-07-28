cc.Class({
    extends: cc.Component,

    properties: {
       //enemyPrefab: cc.Prefab,
       enemyPrefabArray: [cc.Prefab],
       time: 10,
       num: 1,
       _currentTime: 1,
       ground: cc.Node,
       _sceneLoading: false,
    },

    onLoad: function () {
        window.enemyNum = 0;
        //this.generator();
        this.schedule(this.generator.bind(this),1);
    },

    generator: function(){
        if(window.enemyNum == 0){
            if(this._currentTime == this.time){
                if(!this._sceneLoading){
                    this._sceneLoading = true;
                    cc.director.loadScene('win-scene');
                    return ;
                }
            }  
            let enemyNum = this.num * this._currentTime;
            for(let i = 0; i < enemyNum; i++){
                let enemyIdx = Math.floor(Math.random() * this.enemyPrefabArray.length);
                let enemy = cc.instantiate(this.enemyPrefabArray[enemyIdx]);
                let randomPosition = null;
                if(Math.random() > 0.5){
                    randomPosition = cc.v2(Math.round(cc.random0To1() * 960),cc.random0To1() * 640);
                }else{
                    randomPosition = cc.v2(cc.random0To1() * 960,Math.round(cc.random0To1()) * 640);
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
