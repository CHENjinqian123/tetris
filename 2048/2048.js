var game={
    data:null,//��ά���飬������Ϸ������
    RN:4, // ��Ϸ��������
    CN:4, //��Ϸ��������
    score:0,//���浱ǰ�÷�
    state:1,//������Ϸ��״̬ 0��ʾ���� 1����
    RUNNING:1,
    GAMEOVER:0,
    CSIZE:100,//������ӵĴ�С
    MARGIN:16,//������߾�Ĵ�С
    top:0,
    init:function(){//�������и���div��heml����

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
    start:function(){//������Ϸ
        if(document.cookie.trim()!=""){ //��ȡcookie�е���߷�
            this.top=parseInt(document.cookie.slice(4));
        }
        this.init();//��ʼ�����ӵķ���
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
    //��λ�������������һ�������
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
    //��data�е����ݸ��µ�ҳ���div��
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
        //�����Ϸ��״̬��Gameover
        //score.innerHTML=this.score;
        document.getElementById('top').innerHTML=this.top;
        document.getElementById('fscore').innerHTML=this.score;
        // �ҵ�idΪgameover��Ԫ�� ��������ʾ
        var gameover=document.getElementById('gameOver');
        if(this.state==this.GAMEOVER){
            gameover.style.display='block';
        }else{
            gameover.style.display='none';
        }
    },
    //��Ϸ����״̬
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
    //�����ƶ�
    moveLeft:function() {//����������
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
            //�����Ϸ����
            if(this.isGameOver()){
                //���޸���Ϸ��״̬
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
    moveLeftInRow:function(r){//���Ƶ� r��
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
    //�����ƶ�
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
                //���޸���Ϸ��״̬
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
    //�����ƶ�
    moveUp:function(){
        var before=String(this.data);
        for(var c=0;c<this.data.length;c++){
            this.moveUpInCol(c);
        }
        var after=String(this.data);
        if(before!=after){
            this.randomNum();
            if(this.isGameOver()){
                //���޸���Ϸ��״̬
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
    //�����ƶ�
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
                //���޸���Ϸ��״̬
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
//��ҳ����غ��Զ�����game�е�start����
window.onload=function(){
    game.start();
};