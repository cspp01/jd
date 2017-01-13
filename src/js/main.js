/**
 * Created by Administrator on 2017/1/11/011.
 */
$(function(){
    var wh=function(){
            this.streenWidth=$(window).width();//屏幕宽度
            this.streenHeight=$(window).height();//屏幕高度
        };
    wh.prototype.aw=function(ele,navw){
        $(ele).css({
            width:this.streenWidth-navw
        });
    };
    wh.prototype.awanimate=function(ele,navw){
        $(ele).animate({
            width:this.streenWidth-navw
        });
    };
    wh.prototype.ah=function(ele,navh){
        $(ele).css({
            height:this.streenHeight-navh
        });
    };
    var aw=new wh();
    aw.aw('article',120);
    aw.ah('article',230);
    aw.ah('nav',200);
    aw.ah('.nav-menu',200);

    for(var i=0;i<$('.menu-men').length;i++){
        (function(i){
            var j=i+1;
            $('.menu-men:eq('+i+')').on('click',function(){
                $('nav>ul>li>a').removeClass('active');
                $('.menu-men>a:eq('+i+')').addClass('active');
                    $('.nav-menu').hide().css({
                        width:0
                    });
                aw.aw('article',120);
                    $('.menu-men-'+j).show().animate({
                       width:'120px'
                    });
               aw.awanimate('article',240);
            });
        })(i)
    }
    $('.bak').on('click',function(){
        $('.nav-menu').animate({
            width:0
        }).hide(300);
        aw.awanimate('article',120);
        return false;
    });

    $('.menu-enu>a').click(function(){
        $('nav>ul>li>a').removeClass('active');
        $(this).addClass('active');
        var navName=$(this).attr('name');
        //console.log(navName);
        $.ajax({
            url:'../html/'+navName+'.html',
            type:'get',
            dataType:'html',
            success:function(data){
                $('article').html(data);
            }
        });
        $('.nav-menu').animate({
            width:0
        }).hide(100);
        aw.awanimate('article',120);
    })
});