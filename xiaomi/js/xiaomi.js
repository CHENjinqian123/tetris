/**
 * Created by Administrator on 2016/9/1.
 */
$('.shopping_cart').mousemove(function(){
    $($(this)).css("background",'#fff');
    $('#shopping_cart').css('display','block');
});
$('.shopping_cart').mouseout(function(){
    $($(this)).css("background",'#424242');
    $('#shopping_cart').css('display','none');
});
var imgs=[
    ["img/maxdingbu!160x110.jpg","img/mi5!160x110.jpg"],
    ["img/hongmipro-320!160x110.jpg","img/hongminote4!160x110.jpg","img/note3!160x110.jpg","img/hongmi3s!160x110.jpg","img/hongmi3!160x110.jpg"],
    ["img/mipad2-16!160x110.jpg","img/mipad2-64!160x110.jpg","img/mipad2-64-win!160x110.jpg","img/bijiben32012.5!160x110.jpg","img/bijiben320!160x110.jpg"],
    ["img/mitv3s-43!160x110.jpg","img/mitv3s48!160x110.jpg","img/mitv355!160x110.jpg","img/mitv3-60!160x110.jpg","img/mitv3s-65!160x110.jpg"],
    ["img/hezimini.png","img/hezi3.png","img/hezi3s!160x110.jpg","img/zhuji!160x110.jpg","img/putonban!160x110.jpg"],
    ["img/miwifi!160x110.jpg","img/miwifi-3!160x110.jpg","img/miwifimini!160x110.jpg","img/miwifilite!160x110.jpg","img/wifiExtension!160x110.jpg",'img/wifiExtension!160x110.jpg'],
    ["img/scooter!160x110.jpg","img/water2!160x110.jpg","img/dianfanbao!160x110.jpg","img/air2!160x110.jpg","img/xiaobaishexiangji!160x110.jpg","img/zhinengyingjian!160x110.jpg"]
];
var phoneName=[
    ["小米Max","小米手机5"],
    ["红米Pro","红米NOTE4","红米NOTE3","红米手机3s","红米手机3","红米手机3x"],
    ["小米平板2 16G","小米平板2 64G","小米平板2 64G windows版","小米笔记本Ari 12.5","小米笔记本Ari 13"],
    ["小米电视3s 43英寸","小米电视3s 48英寸","小米电视3s 55英寸","小米电视3s 60英寸","小米电视3s 65英寸 曲面","小米电视3 70英寸"],
    ["小米盒子mini版","小米盒子3","小米盒子3 增强版","小米电视主机","小米家庭音响 金属版","小米家庭音响 标准版"],
    ["全新小米路由器","小米路由器3","小米路由器mini","小米路由器3c","小米路由器 青春版","小米WIFI放大器"],
    ["九号平衡车",'小米净水器',"米加压力IH电饭煲",'小米空气进化器2','只能摄像头','查看全部<br/>智能硬件']
];
var price=[
    ["1499元起",'1799元起'],
    ["1499元起",'899元起','899元起','699元起','699元起','799元起'],
    ['999元','1299元','1299元','3499元','4999元'],
    ["1799元",'1999元','3999元起','4999元','8999元','9999元'],
    ["199元",'299元','399元','999元','899元','699元'],
    ["699元",'149元','129元','99元','79元','39元'],
    ["1999元",'1299元','999元','699元','149元',' ']
];
$("#recommend").on('mouseover','li a:lt(7)',function(e){
    e.preventDefault();
    $('#product').css("display",'block');
    $("#product div ul").html('');
    var idx=$(this).index('#recommend li a');
    for(var i=0;i<imgs[idx].length;i++){
        var src=""+imgs[idx][i];
        $("#product div ul").append(`
    <li class="lt">
        <img src=${src}>
        <br/><a href="">${phoneName[idx][i]}</a>
            <p>${price[idx][i]}</p>
    </li>

    `);
     }
});
$("section ").mouseover(function(){
    $('#product').css("display",'none');
});
//轮播
 var lunbo={
     timer:null,
     idx:0,
     count:-1,
     m:5000,
     me:this,
     lunboimgs:["img/lunbo1.jpg","img/lunbo2.jpg",'img/lunbo3.jpg',"img/lunbo4.jpg","img/lunbo5.jpg"],
     into:function(){
        this.paint();
        this.stop();
        $('.Small_label').on("click","li a",this.small_click);
        $(".shuffling").on("click",".btnrt",this.mover.bind(this));
        $(".shuffling").on("click",".btnlt",this.moverrt.bind(this));
        this.timer=setInterval(this.mover.bind(this),this.m);

    },
     paint:function(){
             for(var i=0;i<this.lunboimgs.length;i++){
                 $(".shuffling-start").append(`
             <li>
                 <a href="">
                 <img src=${this.lunboimgs[i]} alt=""/>
                 </a>
                 </li>
            `)
             }
     },
     mover:function() {
         this.count++;
          if( this.count==5){
              this.count=0;
          }

        $(".shuffling-start li").eq(this.count).fadeIn(600).siblings().fadeOut();
        $(".Small_label a").eq(this.count).addClass('active').parent().siblings().children('a').removeClass('active');


    },
     moverrt:function() {
         this.count--;
          if( this.count==-1){
              this.count=4;
          }
        $(".shuffling-start li").eq(this.count).fadeIn(600).siblings().fadeOut();
         $(".Small_label a").eq(this.count).addClass('active').parent().siblings().children('a').removeClass('active');


    },
     stop:function() {
        var me = this;
        $(".shuffling").mouseover(function(){
            clearInterval(me.timer);
        });
        $(".shuffling").mouseout(function(){
           me.timer=setInterval(function(){
               me.count++;
               if( me.count==5){
                   me.count=0;
               }

               $(".shuffling-start li").eq(me.count).fadeIn(600).siblings().fadeOut();
               $(".Small_label a").eq(me.count).addClass('active').parent().siblings().children('a').removeClass('active');

           },me.m)
        })
    },
     small_click:function(e){
         e.preventDefault();
         this.idx=$(".Small_label li a").index($(this));
         console.log(this.idx);
         $(this).css("background",'none').parent("li").siblings().children().css('background',"#918F89");
         $(".shuffling-start li").eq(this.idx).fadeIn().siblings('li').fadeOut();

     }
};
lunbo.into();
//左右切换
setInterval(function(){
    if(getComputedStyle($(".xm-carousel-wrapper")[0]).marginLeft=="0px") {
        $(".xm-carousel-wrapper").animate({
            marginLeft: -1240
        }, 600);
        $(".xiaomistar a:last-child").css("color","#B0B0B2").siblings().css("color","#E0E0E1")
    }
    if(getComputedStyle($(".xm-carousel-wrapper")[0]).marginLeft=="-1240px"){
        $(".xm-carousel-wrapper").animate({
            marginLeft: 0
        },600);
        $(".xiaomistar a:first-child").css("color","#B0B0B2").siblings().css("color","#E0E0E1")
    }
    //debugger;
},5000);
$(".xiaomistar").on("click",'a',function(e) {
    e.preventDefault();
    if ($(this).html()=="&gt;") {
        $(this).siblings().css("color","#B0B0B2");
        $(this).css("color","#E0E0E1");
    $(".xm-carousel-wrapper").animate({
        marginLeft: -1240
    },600)
   }else {
        $(this).siblings().css("color","#B0B0B2");
        $(this).css("color","#E0E0E1");
    $(".xm-carousel-wrapper").animate({
        marginLeft: 0
    },600)
}
});
$(".recommend").on("click",'a',function(e) {
    e.preventDefault();
    console.log(this);
    if ($(this).html()=="&gt;") {
        $(this).siblings().css("color","#B0B0B2");
        $(this).css("color","#E0E0E1");
    $(".recommend-content-ul").animate({
        marginLeft: -1240
    },600)
   }else {
        $(this).siblings().css("color","#B0B0B2");
        $(this).css("color","#E0E0E1");
    $(".recommend-content-ul").animate({
        marginLeft: 0
    },600)
}
});
//搭配
var match={
   imgs:{
       ermen:[
           ["img/xiaomiyidondianyua1.jpg",'小米活塞耳机 基础版','29元','1.5万人评价'],
           ["img/xiaomiyidondianyua2.jpg",'小米圈铁耳机','99元','1.5万人评价'],
           ["img/xiaomiddianyuan3.jpg",'小米胶囊耳机','69元','1.3万人评价'],
           ["img/xiaomiyxian2.jpg",'小米蓝牙耳机','79元','9万人评价'],
           ["img/xiaomiyxian.jpg",'小米小钢炮蓝牙音箱2','129元','1.3万人评价'],
           ["img/xiaomilanya.jpg",'小米随身蓝牙音箱','69元','8979人评价'],
           ["img/shuishenyxian.jpg",'小米蓝牙音箱','199元','1.9万人评价'],
           ["img/xiaomixiaoganpao.jpg",'小米小钢炮..','99元','']

       ],
       wejiyxian:[
           ["img/fenhonerji.jpg",'小米活塞耳机 基础版','29元','1.5万人评价'],
           ["img/xiaomierjiyi.jpg",'小米圈铁耳机','99元','1.5万人评价'],
           ["img/heiseerji.jpg",'小米胶囊耳机','69元','1.3万人评价'],
           ["img/xiaomilanya.jpg",'小米蓝牙耳机','79元','9万人评价'],
           ["img/honseyxian.jpg",'小米小钢炮蓝牙音箱2','129元','1.3万人评价'],
           ["img/shuishenyxian.jpg",'小米随身蓝牙音箱','69元','8979人评价'],
           ["img/xiaomierjiyi.jpg",'小米蓝牙音箱','199元','1.9万人评价'],
           ["img/xiaomixiaoganpao.jpg",'小米小钢炮..','99元','']

       ],
       dianyuan:[
           ["img/fenhonerji.jpg",'%￥%@%','29元','1.5万人评价'],
           ["img/xiaomierjiyi.jpg",'5432%￥','99元','1.5万人评价'],
           ["img/heiseerji.jpg",'@￥%','69元','1.3万人评价'],
           ["img/xiaomilanya.jpg",'%#￥','79元','9万人评价'],
           ["img/honseyxian.jpg",'%……%￥……','129元','1.3万人评价'],
           ["img/shuishenyxian.jpg",'@#！@','69元','8979人评价'],
           ["img/xiaomierjiyi.jpg",'！@#@！','199元','1.9万人评价'],
           ["img/xiaomixiaoganpao.jpg",'3213..','99元','']

       ],
       dianccunchuka:[
           ["img/fenhonerji.jpg",'@#！@','2#@！','1.5万人评价'],
           ["img/xiaomierjiyi.jpg",'@#!@3','#！@#','1.5万人评价'],
           ["img/heiseerji.jpg",'!@#!@#','@#!@#','1.3万人评价'],
           ["img/xiaomilanya.jpg",'@#!','@!3@#','9万人评价'],
           ["img/honseyxian.jpg",'!!@!@','@#@#','1.3万人评价'],
           ["img/shuishenyxian.jpg",'asdasd','@@@','8979人评价'],
           ["img/xiaomierjiyi.jpg",'!!','??','1.9万人评价'],
           ["img/xiaomixiaoganpao.jpg",'- -..','(~ ~)','']

       ]
      },
    into:function(){
      $(".match ul").on("mouseover",'li',this.dianji.bind(this));
    },
    dianji:function(e) {
        //console.log(e.target);
        //console.log(this.imgs);
        $('.match_content_right ul').html("");
        var id=e.target.dataset.name;
        console.log(id);
        $(e.target).addClass('borhuanse').siblings("li").removeClass('borhuanse');
        //console.log(this.imgs[id]);
        for(var i=0 ;i<this.imgs[id].length-1;i++){
          $('.match_content_right ul').append(`
             <li>
                <img src="${this.imgs[id][i][0]}">
                <h3>
                    <a>${this.imgs[id][i][1]}</a>
                    <p class="huanse">${this.imgs[id][i][2]}</p>
                    <p>${this.imgs[id][i][3]}</p>
                </h3>
             </li>
        `)
         }
        $('.match_content_right ul').append (`
        <li class="xiaoli">
        <div class="xiaoganpao">
        <p>${this.imgs[id][i][1]}</p>
        <p class="huanse">${this.imgs[id][i][2]}</p>
        </div><img src="${this.imgs[id][i][0]}" alt=""/></li>
        <li class="xiaoli" >浏览更多....</li>
             `)
     }
};
match.into();
//内容
 var shuji={
     mrl:0,
     poor:296,
     maxl:-888,
     quanquan:0,
    into:function(){
        $("#shuji").on("click",'a',this.shuji.bind(this));
    },
   shuji:function(e){
       e.preventDefault();
       if($(e.target).html()=="&gt;"){
           if(this.mrl==this.maxl){
               this.mrl=this.maxl;
           }else{
               this.mrl=this.mrl-this.poor;
           }
           $(e.target).parent().children('div').children("ul").animate({
                 marginLeft:this.mrl
             },300);
           this.quanquan++;
           if(this.quanquan>=3){
               this.quanquan=3
           }
           $(e.target).parent().children('ul').children("li").children('span').eq(this.quanquan).addClass('jihuanquan').parent().siblings().children().removeClass('jihuanquan');
       }else if($(e.target).html()=="&lt;"){
           if(this.mrl==0){
               this.mrl=0;
           }else{
               this.mrl=this.mrl+this.poor;
           }
           $(e.target).parent().children('div').children("ul").animate({
               marginLeft:this.mrl
           },300);
           this.quanquan--;
           if(this.quanquan<=0){
               this.quanquan=0;
           }
           $(e.target).parent().children('ul').children("li").children('span').eq(this.quanquan).addClass('jihuanquan').parent().siblings().children().removeClass('jihuanquan');
       }
   },

};
 var miui={
     mrl:0,
     poor:296,
     maxl:-888,
     quanquan:0,
    into:function(){
        $("#zhuti").on("click",'a',this.shuji.bind(this));

    },
   shuji:function(e){
       e.preventDefault();
       if($(e.target).html()=="&gt;"){
           if(this.mrl==this.maxl){
               this.mrl=this.maxl;
           }else{
               this.mrl=this.mrl-this.poor;
           }
           $(e.target).parent().children('div').children("ul").animate({
                 marginLeft:this.mrl
             },300);
           this.quanquan++;
           if(this.quanquan>=3){
               this.quanquan=3
           }
           $(e.target).parent().children('ul').children("li").children('span').eq(this.quanquan).addClass('jihuanquan').parent().siblings().children().removeClass('jihuanquan');
       }else if($(e.target).html()=="&lt;"){
           if(this.mrl==0){
               this.mrl=0;
           }else{
               this.mrl=this.mrl+this.poor;
           }
           $(e.target).parent().children('div').children("ul").animate({
               marginLeft:this.mrl
           },300);
           this.quanquan--;
           if(this.quanquan<=0){
               this.quanquan=0;
           }
           $(e.target).parent().children('ul').children("li").children('span').eq(this.quanquan).addClass('jihuanquan').parent().siblings().children().removeClass('jihuanquan');
       }
   }
};
 var youxi={
     mrl:0,
     poor:296,
     maxl:-888,
     quanquan:0,
    into:function(){
        $("#youxi").on("click",'a',this.shuji.bind(this));

    },
   shuji:function(e){
       e.preventDefault();
       if($(e.target).html()=="&gt;"){
           if(this.mrl==this.maxl){
               this.mrl=this.maxl;
           }else{
               this.mrl=this.mrl-this.poor;
           }
           $(e.target).parent().children('div').children("ul").animate({
                 marginLeft:this.mrl
             },300);
           this.quanquan++;
           if(this.quanquan>=3){
               this.quanquan=3
           }
           $(e.target).parent().children('ul').children("li").children('span').eq(this.quanquan).addClass('jihuanquan').parent().siblings().children().removeClass('jihuanquan');
       }else if($(e.target).html()=="&lt;"){
           if(this.mrl==0){
               this.mrl=0;
           }else{
               this.mrl=this.mrl+this.poor;
           }
           $(e.target).parent().children('div').children("ul").animate({
               marginLeft:this.mrl
           },300);
           this.quanquan--;
           if(this.quanquan<=0){
               this.quanquan=0;
           }
           $(e.target).parent().children('ul').children("li").children('span').eq(this.quanquan).addClass('jihuanquan').parent().siblings().children().removeClass('jihuanquan');
       }
   }
};
 var yyon={
     mrl:0,
     poor:296,
     maxl:-888,
     quanquan:0,
    into:function(){
        $("#yyon").on("click",'a',this.shuji.bind(this));

    },
   shuji:function(e){
       e.preventDefault();
       if($(e.target).html()=="&gt;"){
           if(this.mrl==this.maxl){
               this.mrl=this.maxl;
           }else{
               this.mrl=this.mrl-this.poor;
           }
           $(e.target).parent().children('div').children("ul").animate({
                 marginLeft:this.mrl
             },300);
           this.quanquan++;
           if(this.quanquan>=3){
               this.quanquan=3
           }
           $(e.target).parent().children('ul').children("li").children('span').eq(this.quanquan).addClass('jihuanquan').parent().siblings().children().removeClass('jihuanquan');
       }else if($(e.target).html()=="&lt;"){
           if(this.mrl==0){
               this.mrl=0;
           }else{
               this.mrl=this.mrl+this.poor;
           }
           $(e.target).parent().children('div').children("ul").animate({
               marginLeft:this.mrl
           },300);
           this.quanquan--;
           if(this.quanquan<=0){
               this.quanquan=0;
           }
           $(e.target).parent().children('ul').children("li").children('span').eq(this.quanquan).addClass('jihuanquan').parent().siblings().children().removeClass('jihuanquan');
       }
   }
};
shuji.into();
miui.into();
youxi.into();
yyon.into();





















