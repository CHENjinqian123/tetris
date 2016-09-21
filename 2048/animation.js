/**
 * Created by Administrator on 2016/7/26.
 */
function Task(div,tstep,lstep){
    this.div=div;
    this.tstep=tstep;
    this.lstep=lstep;
}

var animatioin={
DURATION:1000,//总时间
STEPS:200,//总步数
interval:0,//时间间隔
timer:null,//定时器序号
moved:0,//已经移动的步数
tasks:[],//保存所有移动的任务对象
    init:function(){
        this.interval
    },
addTask:function(startr,startc,endr,endc){//向tasks中添加任务
    var div=document.getElementById('c'+startr+startc);
    var tDIST=(endr-startr)*game.CSIZE+game.MARGIN;
    var tStep=tDIST
}
};