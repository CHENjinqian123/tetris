/**
 * Created by Administrator on 2016/7/26.
 */
function Task(div,tstep,lstep){
    this.div=div;
    this.tstep=tstep;
    this.lstep=lstep;
}

var animatioin={
DURATION:1000,//��ʱ��
STEPS:200,//�ܲ���
interval:0,//ʱ����
timer:null,//��ʱ�����
moved:0,//�Ѿ��ƶ��Ĳ���
tasks:[],//���������ƶ����������
    init:function(){
        this.interval
    },
addTask:function(startr,startc,endr,endc){//��tasks���������
    var div=document.getElementById('c'+startr+startc);
    var tDIST=(endr-startr)*game.CSIZE+game.MARGIN;
    var tStep=tDIST
}
};