var game={
    data:null,//二维数组，保存游戏的数据
    RN:4, // 游戏的总行数
    CN:4, //游戏的总列数
    score:0,//保存当前得分
    state:1,//保存游戏的状态 0表示结束 1运行
    RUNNING:1,
    GAMEOVER:0,
    CSIZE:100,//保存格子的大小
    MARGIN:16,//保存外边距的大小
    top:0,
    init:function(){//生成所有各种div的heml代码

        for(var r=0,arr=[];r<this.RN;r++){
            for(var c=0;c<this.CN;c++){
                arr.push(''+r+c);
            }
        }
        gridPanel.innerHTML='<div id="g'+
        arr.join('" class="grid"></div><div id="g')+
        '" class="grid"></div>';
        gridPanel.innerHTML+='<div id="c'+
        arr.join('" class="cell"></div><div id="c')+
        '" class="cell"></div>';
        gridPanel.style.width=this.CN*(this.CSIZE+this.MARGIN)+this.MARGIN+'px';
        gridPanel.style.height=this.RN*(this.CSIZE+this.MARGIN)+this.MARGIN+'px';
    },
    start:function(){//启动游戏
        if(document.cookie.trim()!=""){ //读取cookie中的最高分
            this.top=parseInt(document.cookie.slice(4));
        }
        this.init();//初始化格子的方法
        this.score=0;
        this.state=this.RUNNING;
        this.data=[];
        for(var r=0;r<this.RN;r++){
            this.data[r]=[];
            for(var c=0;c<this.CN;c++){
               this.data[r][c]=0;
            }
        }
        this.randomNum();
        //this.updateView();
        this.randomNum();
        //this.randomNum();
        //this.randomNum();
        this.updateView();
        //debugger;
        //console.log(this.data.join("\n"));
       document.onkeydown=function(e){
           //console.log(e.keyCode);
           //console.log(this.moveRight());
          switch (e.keyCode){
              case 37:this.moveLeft();
                  break;
              case 38:this.moveUp();
                break;
              case 39:this.moveRight();
                  break;
              case 40:this.moveDown();
                 break;
          }
       }.bind(this);
    },
    //空位置上面随机生成一个随机数
    randomNum:function(){
        for(;;){
        var r=Math.floor(Math.random()*this.RN);
            //console.log(r);
        var c=Math.floor(Math.random()*this.CN);
            //console.log(c);
            if(this.data[r][c]===0) {
                //console.log(parseFloat(Math.random()));
                this.data[r][c] =Math.random()<0.5?2:4;
                break;
             }
       }
    },
    //将data中的数据更新到页面的div中
    updateView:function(){
        for(var r=0;r<this.RN;r++ ) {
            for (var c=0;c<this.CN;c++) {
            var div = document.getElementById('c'+ r + c);
                if(this.data[r][c]!=0){
                    div.innerHTML=this.data[r][c];
                    div.className='cell n'+this.data[r][c];
                }else{
                    div.innerHTML='';
                    div.className='cell';
                }
           }
        }
        document.getElementById('score').innerHTML=this.score;
        //如果游戏的状态是Gameover
        //score.innerHTML=this.score;
        document.getElementById('top').innerHTML=this.top;
        document.getElementById('fscore').innerHTML=this.score;
        // 找到id为gameover的元素 设置器显示
        var gameover=document.getElementById('gameOver');
        if(this.state==this.GAMEOVER){
            gameover.style.display='block';
        }else{
            gameover.style.display='none';
        }
    },
    //游戏结束状态
    isGameOver:function(){
        for(var r=0;r<this.RN;r++){
            for(var c=0;c<this.CN;c++){
                if(this.data[r][c]==0){return false;}
                else if(c<this.CN-1 &&this.data[r][c]==this.data[r][c+1]){
                    return false;
                }else if(r<this.RN-1 &&this.data[r][c]==this.data[r+1][c]){
                    return false;
                }
            }
        }
        return true;
    },
    //向左移动
    moveLeft:function() {//左移所有行
        var before = String(this.data);
        //console.log(before);
        for (var r = 0; r < this.RN; r++) {
            this.moveLeftInRow(r);
        }
        var after = String(this.data);
        //console.log(after);
        if (before!= after) {
            this.randomNum();
            console.log(this.isGameOver());
            //如果游戏结束
            if(this.isGameOver()){
                //就修改游戏的状态
                this.state=this.GAMEOVER;
                if(this.score>this.top){
                    var date=new Date("2020/01/01");
                    document.cookie="top="+this.score
                    +";expires="+date.toGMTString();
                }
            }
            this.updateView();
        }
    },
    moveLeftInRow:function(r){//左移第 r行
        for(var c=0;c<this.CN-1;c++) {
            var nextc = this.getNextInRow(r, c);
            if (nextc == -1) {
                break;
            }
            else {
                if (this.data[r][c] == 0) {
                    this.data[r][c] = this.data[r][nextc];
                    this.data[r][nextc] = 0;
                    animatioin.addTask(r,c,r,nextc)
                    c--;
                } else if(this.data[r][c]==this.data[r][nextc]){
                   this.score+=(this.data[r][c] *= 2);
                    this.data[r][nextc] =0;
                }
            }
        }
    },
    getNextInRow:function(r,c){
      for(var nextc=c+1;nextc<this.CN;nextc++){
        if(this.data[r][nextc]!=0){
            return nextc;
        }
      }
        return -1;
    },
    //向右移动
    moveRight:function(){
        var before=String(this.data);
        //console.log(before);
        for(var r = 0;r<this.data.length;r++){
            this.moveRightInRow(r);
        }
        var after=String(this.data);
        //console.log(after);
        if(before!=after){
            this.randomNum();
            if(this.isGameOver()){
                //就修改游戏的状态
                this.state=this.GAMEOVER;
                if(this.score>this.top){
                    var date=new Date("2020/01/01");
                    document.cookie="top="+this.score
                    +";expires="+date.toGMTString();
                }
            }
            this.updateView();
        }
    },
    moveRightInRow:function(r){
        for(var c=this.CN;c>0;c--){
            var prev=this.getPrevInRow(r,c);
            if(prev==-1){break;}
            else{
                if(this.data[r][c]==0){
                    this.data[r][c]=this.data[r][prev];
                    this.data[r][prev]=0;
                    c++;
                }else if(this.data[r][c]==this.data[r][prev]){
                    this.score+=(this.data[r][c]*=2);
                    this.data[r][prev]=0;
                }
            }
        }
    },
    getPrevInRow:function(r,c){
        for(var prev=c-1;prev>=0;prev--){
            if(this.data[r][prev]!=0){
                return prev;
            }
        }
        return -1;
    },
    //向上移动
    moveUp:function(){
        var before=String(this.data);
        for(var c=0;c<this.data.length;c++){
            this.moveUpInCol(c);
        }
        var after=String(this.data);
        if(before!=after){
            this.randomNum();
            if(this.isGameOver()){
                //就修改游戏的状态
                this.state=this.GAMEOVER;
                if(this.score>this.top){
                    var date=new Date("2020/01/01");
                    document.cookie="top="+this.score
                    +";expires="+date.toGMTString();
                }
            }
            this.updateView();
        }
    },
    moveUpInCol:function(c){
        for(var r=0;r<this.RN-1;r++){
            var nextr=this.getNexrCol(r,c);
            if(nextr==-1){break;}
            else{
                if(this.data[r][c]==0){
                    this.data[r][c]=this.data[nextr][c];
                    this.data[nextr][c]=0;
                    r--;
                }else if(this.data[r][c]==this.data[nextr][c]){
                    this.score+=(this.data[r][c]*=2);
                    this.data[nextr][c]=0;
                }
            }
        }
    },
    getNexrCol:function(r,c){
        for(var nextr=r+1;nextr<this.RN;nextr++){
            if(this.data[nextr][c]!=0){
                return nextr;
            }
        }
         return -1;
    },
    //向下移动
    moveDown:function(){
        var before=String(this.data);
        for(var c=0;c<this.data.length;c++){
            //console.log(c);
            this.moveDownInCol(c);
        }
        var after=String(this.data);
        if(before!=after){
            this.randomNum();
            if(this.isGameOver()){
                //就修改游戏的状态
                this.state=this.GAMEOVER;
                if(this.score>this.top){
                    var date=new Date("2020/01/01");
                    document.cookie="top="+this.score
                    +";expires="+date.toGMTString();
                }
            }
            this.updateView();
        }
    },
    moveDownInCol:function(c){
        for(var r=this.RN-1;r>0;r--){
            var prevr=this.getPrevCol(r,c);
            if(prevr==-1){break;}
            else{
                if(this.data[r][c]==0){
                    this.data[r][c]=this.data[prevr][c];
                    this.data[prevr][c]=0;
                    r++;
                }else if(this.data[r][c]==this.data[prevr][c]){
                    this.score+=(this.data[r][c]*=2);
                    this.data[prevr][c]=0;
                }
            }
        }
    },
    getPrevCol:function(r,c){
        for(var prevr=r-1;prevr>=0;prevr--){
            if(this.data[prevr][c]!=0){
                return prevr;
            }
        }
        return -1;
    }
};
//当页面加载后自动调用game中的start方法
window.onload=function(){
    game.start();
};