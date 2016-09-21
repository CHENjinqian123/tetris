/**
 * Created by Administrator on 2016/7/25.
 */
function Cell(r,c,src){
  this.r=r;
  this.c=c;
  this.src=src;
}//����ͼ����һ����ʽ��ͳһ����
function State(r0,c0,r1,c1,r2,c2,r3,c3){//����һ��ͼ���ĳ����ת״̬
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
}//����ͼ�εĹ���������
Shape.prototype.IMGS={
    T:'img/T.png',
    O:'img/O.png',
    I:'img/I.png',
    S:'img/S.png',
    Z:'img/Z.png',
    L:'img/L.png',
    J:'img/J.png'
};//����ͼ�ε�ĳ��״̬����
Shape.prototype.moveDown=function(){
    for(var i=0;i<this.cells.length;i++){
        this.cells[i].r+=1;
    }
};//����ƶ�����
Shape.prototype.moveLeft=function(){
    for(var i=0;i<this.cells.length;i++){
        this.cells[i].c-=1;
    }
};//����ƶ�����
Shape.prototype.moveRight=function(){
    for(var i=0;i<this.cells.length;i++){
        this.cells[i].c+=1;
    }
};//����ƶ�����
Shape.prototype.rotateR=function(){
this.statei++;
if(this.statei==this.states.length){this.statei=0;}
this.rotate();
}//���˳��ת����
Shape.prototype.rotateL=function(){
    this.statei--;
    if(this.statei==-1){this.statei=this.states.length-1;}
    this.rotate();
}//�������ת����
Shape.prototype.rotate=function(){
    var state=this.states[this.statei];
    var orgCell=this.cells[this.orgi];
    console.log(orgCell);
    for(var i=0;i<this.cells.length;i++){
      this.cells[i].r=orgCell.r+state['r'+i];
      this.cells[i].c=orgCell.c+state['c'+i];
    }
}//��ת�Ĺ�������
//����Tͼ��
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
Object.setPrototypeOf(T.prototype,Shape.prototype);// �̳й���������
//����Oͼ��
function O(){
  Shape.call(this,
      [new Cell(0,4),new Cell(0,5),new Cell(1,4),new Cell(1,5)],
      this.IMGS.O,
      [new State(0,-1,0,0,1,-1,1,0)],1)
}
Object.setPrototypeOf(O.prototype,Shape.prototype);// �̳й���������
//����Iͼ��
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
Object.setPrototypeOf(I.prototype,Shape.prototype);// �̳й���������

//���캯��Z
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
Object.setPrototypeOf(Z.prototype,Shape.prototype);// �̳й���������
////���캯��S(){}
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
Object.setPrototypeOf(S.prototype,Shape.prototype);// �̳й���������
////���캯��L(){}
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
Object.setPrototypeOf(L.prototype,Shape.prototype);// �̳й���������
//���캯��J(){}
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
Object.setPrototypeOf(J.prototype,Shape.prototype);// �̳й���������
//var t=new T();
//var o=new O();
//var i=new I();
//console.dir(t)
//console.dir(o)
//console.dir(i)