/**
 * Created by Administrator on 2016/7/25.
 */
var tetris={
    OFFSET:15,//定义格子区域相对于背景图片的偏移量
    CSIZE:26,//每个格子的大小
    shape:null,//保存主角图性对象
    nextShape:null,//保存备胎图像
    pg:null,//保存游戏主界面div
    interval:500,//下落速度
    timer:null,//保存定时器
    RN:20,//总行数
    CN:10,//总列数
    wall:[],//方块墙：保存所有停止下落的方块
    score:0,//当前游戏得分
    lines:0,//删除的总行数
    SCORES:[0,10,30,70,150],//保存分数的数组
    state:1,//游戏状态
    RUNNING:1,//开始
    GAMEOVER:0,//结束
    PAUSE:2,//停止
    level:1,//游戏的等级
    start:function(){//游戏开始
        this.level=1;
        this.state=this.RUNNING;
        this.score=0;
        this.lines=0;
        this.wall=[];
        for(var r=0;r<this.RN;r++){
            this.wall[r]=new Array(this.CN);
        }
        this.pg=document.querySelector('.playground');
        this.shape=this.randomShape();
        this.nextShape=this.randomShape();
        this.paint();
        //console.log(this.shape);
        this.timer=setInterval(this.moveDown.bind(this),this.interval);
        document.onkeydown=function(e){
            switch (e.keyCode){
                case 37:this.state==this.RUNNING&&this.moveLeft();
                    break;
                case 39:this.state==this.RUNNING&&this.moveRight();
                    break;
                case 40:this.state==this.RUNNING&&this.moveDown();
                    break;
                case 32:this.state==this.RUNNING&&this.hardDrop();
                    break;
                case 38:this.state==this.RUNNING&&this.rotateR();
                    break;
                case 90:this.state==this.RUNNING&&this.rotateL();
                    break;
                case 83:this.state==this.GAMEOVER&&this.start();
                    break;
                case 80:this.state==this.RUNNING&&this.pause();
                  break;
                case 67:this.state==this.PAUSE&&this.myContinue();
                    break;
            }
        }.bind(this)
    },//启动游戏
    isGameOver:function(){
        for(var i=0;i<this.nextShape.cells.length;i++){
            var cell=this.nextShape.cells[i];
            if(this.wall[cell.r][cell.c]){
                return true
            }
        }
        return false;
    },//游戏结束
    pause:function(){
        this.state=this.PAUSE;
        this.paint();
    },//游戏暂停
    myContinue:function(){
        this.state=this.RUNNING;
        this.paint();
    },//继续游戏
    randomShape:function(){
        var r=parseInt(Math.random()*7);
        console.log(r);
        switch (r){
            case 0: return new O();
                break;
            case 1: return new I();
                break;
            case 2: return new T();
                break ;
            case 3: return new S();
              break;
            case 4: return new Z();
                break;
            case 5: return new L();
                break;
            case 6: return new J();
                break;
        }

    },//随机生成图片方法
    paintState:function(){
        if(this.state==this.GAMEOVER){
            var img=new Image();
            img.src='img/game-over.png';
            this.pg.appendChild(img);
        }else if(this.state==this.PAUSE){
            var img=new Image();
             img.src='img/pause.png';
            this.pg.appendChild(img);
        }

    },//根据游戏的状态绘制图片
    paint:function(){//重绘一切
        this.pg.innerHTML=this.pg.innerHTML.replace(/<img[^>]+>/g,'');
        this.paintShape();
        this.paintWall();
        this.paintScore();
        this.paintNext();
        this.paintState();
    },//重绘一切
    paintScore:function(){
        this.pg.querySelector('p:first-child>span').innerHTML=this.score;
        this.pg.querySelector('p:nth-child(2)>span').innerHTML=this.lines;
        this.pg.querySelector('p:nth-child(3)>span').innerHTML=this.level;
    },//绘制分数
    paintShape:function(){//负责绘制主角图片
        var frag=document.createDocumentFragment();
        for(var i=0;i<this.shape.cells.length;i++){
            var cell=this.shape.cells[i];
            //console.log(cell);
            //var img=new Image();
            //console.log(cell.src);
            //img.src=cell.src;
            //img.style.top=cell.r*this.CSIZE+this.OFFSET+'px';
            //img.style.left=cell.c*this.CSIZE+this.OFFSET+'px';
            ////debugger;
            //frag.appendChild(img);
            this. paintCell(cell,frag);
        }
        this.pg.appendChild(frag);
    },//负责绘制主角图片
    paintNext:function(){
        var frag=document.createDocumentFragment();
        for(var i=0;i<this.nextShape.cells.length;i++){
            var cell=this.nextShape.cells[i];
            //console.log(cell);
            var img=new Image();
            img.src=cell.src;
            img.style.top=(cell.r+1)*this.CSIZE+this.OFFSET+'px';
            img.style.left=(cell.c+10)*this.CSIZE+this.OFFSET+'px';
            frag.appendChild(img);
            //console.log(img);
        }
        this.pg.appendChild(frag);
        //debugger;
    },//绘制备胎图像
    paintCell:function(cell,frag){
        var img=new Image();
        //console.log(cell.src);
        img.src=cell.src;
        img.style.top=cell.r*this.CSIZE+this.OFFSET+'px';
        img.style.left=cell.c*this.CSIZE+this.OFFSET+'px';
        //debugger;
        frag.appendChild(img);
    },//重构主角图片方法
    paintWall:function(){
        var frag=document.createDocumentFragment();
        for(var r=this.RN-1;r>=0;r--) {
            if (this.wall[r].join('')=='') {
                break;
            }else {
                for (var c =this.CN-1; c>=0;c--) {
                    var cell=this.wall[r][c];
                    if(this.wall[r][c]){
                        this. paintCell(cell,frag);
                    }
                }
            }
        }
        this.pg.appendChild(frag);
    },//负责绘制主角图片留在墙里
    landIntoWall:function(){
        for(var i=0;i<this.shape.cells.length;i++){
            var cell=this.shape.cells[i];
            this.wall[cell.r][cell.c]=cell;
        }
    },//将停止下落的主角图形，放入墙中相同位置
    deleteRows:function(){
       for(var r=this.RN- 1,ln=0;r>=0;r--){
           if(this.wall[r].join('')==''){break;}
           if(this.isFull(r)){
             this.deleteRow(r);
              r++;
              ln+=1;
              if(ln==4){break;}
           }
       }
        return ln
    },//遍历伤处所有的满格行
    deleteRow:function(r){
        for(var i=r;i>=0;i--) {
            this.wall[i] = this.wall[i-1];
            for (var c=0;c<this.CN;c++) {
                if (this.wall[i][c]) {
                    this.wall[i][c].r++;
                }
            }
            this.wall[i-1] = new Array(this.CN);
            if (this.wall[i-2].join('')=='') {
                break;
            }
        }
    },//删除第r行
    isFull:function(r){
      return !/^,|,,|,$/.test(String(this.wall[r]));

    },//判断R行是否满格
    hardDrop:function(){
        while(this.canDown()){
            this.moveDown();
        }
    },//直接下落到最底层
    canLeft:function(){
        for(var i=0;i<this.shape.cells.length;i++){
            var cell=this.shape.cells[i];
            if(cell.c==0||this.wall[cell.r][cell.c-1]){
                return false;
            }
        }
        return true;
    },//判断是否左移
    moveLeft:function(){
        if(this.canLeft()){
           this.shape.moveLeft();
            this.paint();
        }
    },//左移方法
    canRight:function(){
        for(var i=0;i<this.shape.cells.length;i++){
            var cell=this.shape.cells[i];
            //console.log(cell);
            if(cell.c==this.CN-1||this.wall[cell.r][cell.c+1]){
                return false;
            }
        }
        return true;
    },//判断是否右移
    moveRight:function(){
        if(this.canRight()){
            this.shape.moveRight();
            this.paint();
        }
    },//右移方法
    canDown:function(){
      for(var i=0;i<this.shape.cells.length;i++){
          var cell=this.shape.cells[i];
          if(cell.r==this.RN-1||this.wall[cell.r+1][cell.c]){
              return false;
          }
      }
        return true;
    },//判断是否可以下落
    moveDown:function() {
        if(this.state==this.RUNNING) {
            if (this.canDown()) {
                this.shape.moveDown();
            } else {
                this.landIntoWall();
                var ln = this.deleteRows();
                this.lines += ln;
                this.score += this.SCORES[ln];
                var l=parseInt(this.lines / 10) + 1;
                if(l>this.level) {
                    this.level = 1;
                    if (this.interval > 100) {
                        this.interval -= (this.level - 1) * 100;
                        clearInterval(this.timer);
                        this.timer = setInterval(this.moveDown.bind(this), this.interval);
                    }
                }
                if (!this.isGameOver()) {
                    this.shape = this.nextShape;
                    this.nextShape = this.randomShape();
                } else {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.state = this.GAMEOVER;
                }
            }
            this.paint();
        }
        //debugger;
    },//下落方法
    canRotate:function(){
        for(var i=0;i<this.shape.cells.length;i++){
            var cell=this.shape.cells[i];
            if(cell.r<0||cell.r>=this.RN||cell.c<0||cell.c>=this.CN||this.wall[cell.r][cell.c]){
                return false;
            }
        }
        return true;
    },//判断是否会越界
    rotateR:function(){
        this.shape.rotateR();
        if(!this.canRotate()){
            this.rotateL()
        }
        this.paint();
    },//顺时针旋转
    rotateL:function(){
        this.shape.rotateL();
        if(!this.canRotate()){
            this.rotateR()
        }
        this.paint();
    }//逆时针旋转
};
tetris.start();//调用start()方法