/**
 * Created by Administrator on 2016/7/25.
 */
function Cell(r,c,src){
  this.r=r;
  this.c=c;
  this.src=src;
}//描述图形中一个格式的统一类型
function State(r0,c0,r1,c1,r2,c2,r3,c3){//描述一种图像的某个旋转状态
  for(var i=0;i<4;i++){
      this['r'+i]=arguments[i*2];
      this['c'+i]=arguments[i*2+1];
  }
}//
function Shape(cells,src,states,orgi){
    this.cells=cells;
    for(var i=0;i<this.cells.length;i++){
      this.cells[i].src=src;
        //console.dir(this.cells[i].src);
    }
    this.states=states;
    this.orgi=orgi;
    this.statei=0;
}//所有图形的公共父类型
Shape.prototype.IMGS={
    T:'img/T.png',
    O:'img/O.png',
    I:'img/I.png',
    S:'img/S.png',
    Z:'img/Z.png',
    L:'img/L.png',
    J:'img/J.png'
};//定义图形的某种状态对象
Shape.prototype.moveDown=function(){
    for(var i=0;i<this.cells.length;i++){
        this.cells[i].r+=1;
    }
};//添加移动方法
Shape.prototype.moveLeft=function(){
    for(var i=0;i<this.cells.length;i++){
        this.cells[i].c-=1;
    }
};//添加移动方法
Shape.prototype.moveRight=function(){
    for(var i=0;i<this.cells.length;i++){
        this.cells[i].c+=1;
    }
};//添加移动方法
Shape.prototype.rotateR=function(){
this.statei++;
if(this.statei==this.states.length){this.statei=0;}
this.rotate();
}//添加顺旋转方法
Shape.prototype.rotateL=function(){
    this.statei--;
    if(this.statei==-1){this.statei=this.states.length-1;}
    this.rotate();
}//添加逆旋转方法
Shape.prototype.rotate=function(){
    var state=this.states[this.statei];
    var orgCell=this.cells[this.orgi];
    console.log(orgCell);
    for(var i=0;i<this.cells.length;i++){
      this.cells[i].r=orgCell.r+state['r'+i];
      this.cells[i].c=orgCell.c+state['c'+i];
    }
}//旋转的公共方法
//构造T图像
function T(){
  Shape.call(this,
      [
          new Cell(0,3),
          new Cell(0,4),
          new Cell(0,5),
          new Cell(1,4)
      ],
      this.IMGS.T,
      [
          new State(0,-1,0,0,0,1,1,0),
          new State(-1,0,0,0,1,0,0,-1),
          new State(0,1,0,0,0,-1,-1,0),
          new State(1,0,0,0,-1,0,0,1)
      ],1
  )
}
Object.setPrototypeOf(T.prototype,Shape.prototype);// 继承公共父类型
//构造O图像
function O(){
  Shape.call(this,
      [new Cell(0,4),new Cell(0,5),new Cell(1,4),new Cell(1,5)],
      this.IMGS.O,
      [new State(0,-1,0,0,1,-1,1,0)],1)
}
Object.setPrototypeOf(O.prototype,Shape.prototype);// 继承公共父类型
//构造I图像
function I(){
    Shape.call(this,
        [new Cell(0,3),new Cell(0,4),new Cell(0,5),new Cell(0,6)],
        this.IMGS.I,
        [
            new State(0,-1,0,0,0,1,0,2),
            new State(-1,0,0,0,1,0,2,0)
        ],1
    )
}
Object.setPrototypeOf(I.prototype,Shape.prototype);// 继承公共父类型

//构造函数Z
function Z(){
    Shape.call(this,
        [new Cell(0,3),new Cell(0,4),new Cell(1,4),new Cell(1,5)],
        this.IMGS.Z,
        [
            new State(-1,-1,-1,0,0,0,0,1),
            new State(-1,1,0,1,0,0,1,0)
        ],
        2
    )
}
Object.setPrototypeOf(Z.prototype,Shape.prototype);// 继承公共父类型
////构造函数S(){}
function S(){
    Shape.call(this,
        [new Cell(0,4),new Cell(0,5),new Cell(1,3),new Cell(1,4)],
        this.IMGS.S,
        [
            new State(-1,0,-1,1,0,-1,0,0),
            new State(0,1,1,1,-1,0,0,0)
        ],
        3
    )
}
Object.setPrototypeOf(S.prototype,Shape.prototype);// 继承公共父类型
////构造函数L(){}
function L(){
    Shape.call(this,
        [new Cell(0,3),new Cell(0,4),new Cell(0,5),new Cell(1,3)],
         this.IMGS.L,
        [
            new State(0,-1,0,0,0,1,1,-1),
            new State(-1,0,0,0,1,0,-1,-1),
            new State(0,1,0,0,0,-1,-1,1),
            new State(1,0,0,0,-1,0,1,1)
        ],1
    )
}
Object.setPrototypeOf(L.prototype,Shape.prototype);// 继承公共父类型
//构造函数J(){}
function J(){
    Shape.call(this,
        [new Cell(0,3),new Cell(0,4),new Cell(0,5),new Cell(1,5)],
        this.IMGS.J,
        [
            new State(0,-1,0,0,0,1,1,1),
            new State(-1,0,0,0,1,0,1,-1),
            new State(0,1,0,0,0,-1,-1,-1),
            new State(1,0,0,0,-1,0,-1,1)
        ],
        1
    )
}
Object.setPrototypeOf(J.prototype,Shape.prototype);// 继承公共父类型
//var t=new T();
//var o=new O();
//var i=new I();
//console.dir(t)
//console.dir(o)
//console.dir(i)