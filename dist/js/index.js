/**
 * Created by Administrator on 2017/1/13/013.
 */
function homeload() {
    //公司排名数据获取
    $.ajax({
        url: '../json/home.json',
        type: 'get',
        data: '{}',
        dataType: 'json',
        success: function (result) {
            var th='<table class="col-lg-12"><tr><th>排名</th><th>公司名</th><th>本月数据量</th><th>星级</th></tr>';
            var comPM='<tr><td>'+th;
            var p=0;
            $.each(result.comPM,function(i, field){
                p++;
                if(p<4){
                    comPM+='<tr><td><span class="pmIdTop">'+p+'</span></td>';
                }else{
                    comPM+='<tr><td><span class="pmId">'+p+'</span></td>';
                }
                $.each(field,function(j,pp){
                    if(j=='dj'){
                        var dj=parseInt(pp);
                        comPM+='<td class="dj">';
                        for(var ii=0;ii<dj;ii++) comPM+='<span class="djnum"></span>';
                        for(var jj=0;jj<5-dj;jj++) comPM+='<span class="djk"></span>';
                        comPM+='</td>';
                    }else{
                        comPM+='<td>'+pp+'</td>';
                    }

                });
                comPM+='</tr>';
                if(p==5){
                    comPM+='</table></td><td>'+th;
                }
            });
            comPM+='</table></td></tr>';
            //console.log(comPM);
            $('#maincont section:nth-child(2) table').append(comPM);
        },
        error: function () {
            alert('请求失败，请检查网络');
        }
    });
}

/**
 * Created by Administrator on 2017/1/17/017.
 */
function kdgsglload() {
    $.ajax({
        url:'../json/kdgsgl.json',
        type:'get',
        data:{},
        dataType:'json',
        success:function(result){
            var sjHtml='';
            var i=1;
            $.each(result,function(key,value){
                sjHtml+='<tr><td>'+i+'</td>';
                $.each(value,function(key1,value1){
                    sjHtml+='<td>'+value1+'</td>';
                });
                sjHtml+='<td></td></tr>';
                i++;
            });
            $('table.kdgsgl').append(sjHtml);
        }
    });
}

/**
 * Created by Administrator on 2017/1/11/011.
 */
//获取菜单栏和内容区域宽高
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
    aw.ah('article',200);
    aw.ah('nav',200);
    aw.ah('.nav-menu',200);

//给拥有下级菜单的按钮添加点击事件
    for(var i=0;i<$('.menu-men').length;i++){
        (function(i){
            var j=i+1;
            $('.menu-men:eq('+i+')').on('click',function(){
                $('nav>ul>li>a').removeClass('active');
                $('.menu-men>a').find('.after').show();
                $('.menu-men>a:eq('+i+')').addClass('active').find('.after').hide();
                    $('.nav-menu').not('.menu-men-'+j).hide().css({
                        width:0
                    });
                aw.aw('article',120);
                    $('.menu-men-'+j).show().animate({
                       width:'120px'
                    });
               aw.awanimate('article',240);
            });
        })(i);
    }
    //下级菜单收缩
    $('.bak').on('click',function(){
        $('.nav-menu').animate({
            width:0
        }).hide(300);
        aw.awanimate('article',120);
        return false;
    });

//加载首页
    (function(){
        /*数据滚动*/

                //初始化
                var zhsjsjNum = 153432,
                    bysjsjNum = 53432,
                    byyxsjNum = 13432,
                    bywscgsNum = 1534;
                $("#sj .zhsjsj").numberAnimate({num:zhsjsjNum, speed:2000, symbol:","}).resetData(zhsjsjNum);
        $("#sj .bysjsj").numberAnimate({num:bysjsjNum, speed:2000, symbol:","}).resetData(bysjsjNum);
        $("#sj .byyxsj").numberAnimate({num:byyxsjNum, speed:2000, symbol:","}).resetData(byyxsjNum);
        $("#sj .bywscgs").numberAnimate({num:bywscgsNum, speed:2000, symbol:","}).resetData(bywscgsNum);


        if(!sessionStorage.getItem('ymzt')) sessionStorage.setItem('ymzt', 'home');//当前页面状态(包含文件夹)
        if(!sessionStorage.getItem('ifWjj')) sessionStorage.setItem('ifWjj', 'false');//是否拥有下级菜单状态
        //console.log(sessionStorage);

        var ymzt=sessionStorage.getItem('ymzt');//获取当前页面名字(如果拥有文件夹也包含)
        var ymme=ymzt;//一级菜单名字

        if(sessionStorage.getItem('ifWjj')=='true') ymme=ymzt.split('/')[0];//截取当前页面状态来获取拥有下级菜单的一级菜单名字

        $('nav>ul>li>a').removeClass('active');
        $('nav >ul>li>a[name="'+ymme+'"]').addClass('active').click();

        $.ajax({
            url:'../html/'+ ymzt+'.html',
            type:'get',
            dataType:'html',
            success:function(data){
                $('article').html(data);
            }
        });

        if(ymzt=='home')homeload();
        else if(ymzt=='sjzs') sjzsload();
        else if(ymzt=='kdgsgl') kdgsglload();
        else if(ymzt=='sjypdb/sjdb') sjdbload();

//菜单添加点击事件获取相应页面
    $('.menu-enu>a').click(function(){
        $('nav>ul>li>a').removeClass('active');
        $(this).addClass('active');
        $('.menu-men>a').find('.after').show();
        var navName=$(this).attr('name');
        //console.log(navName);
        $.ajax({
            url:'../html/'+navName+'.html',
            type:'get',
            dataType:'html',
            success:function(data){
                $('article').html(data);
                if(navName=='home'){
                    homeload();
                }else if(navName=='sjzs'){
                    sjzsload();
                }else if(navName=='kdgsgl'){
                    kdgsglload();
                }
                sessionStorage.setItem('ymzt', navName);
                sessionStorage.setItem('ifWjj', 'false');
            }
        });
        $('.nav-menu').animate({
            width:0
        }).hide(100);
        aw.awanimate('article',120);
        /*else if(navName='sjzs') sjzsload();*/

    });

    $('.nav-menu li>a').on('click',function(){
        var navName=$(this).attr('name');
        var navPName=$(this).parents('.nav-menu').prev().attr('name');
        $.ajax({
            url:'../html/'+navPName+'/'+navName+'.html',
            type:'get',
            dateType:'html',
            success:function(data){
                $('article').html(data);
                if(navName=='sjdb') {
                    sjdbload();
                }
                sessionStorage.setItem('ymzt', navPName+'/'+navName);
                sessionStorage.setItem('ifWjj', 'true');
            }
        });
    });
        $('#admin').on('click',function(){
            var navName=$(this).attr('name');
            $.ajax({
                url:'../html/admin.html',
                type:'get',
                dataType:'html',
                success:function(data){
                    $('article').html(data);
                    sessionStorage.setItem('ymzt', navName);
                    sessionStorage.setItem('ifWjj', 'false');
                }
            })
        })
})();
});
/**
 * Created by Administrator on 2017/1/17/017.
 */
function sjzsload() {
    $.ajax({
        url:'../json/sjzs.json',
        type:'get',
        data:{},
        dataType:'json',
        success:function(result){
            var sjHtml='';
            var i=1;
            $.each(result,function(key,value){
                sjHtml+='<tr><td>'+i+'</td>';
                $.each(value,function(key1,value1){
                    sjHtml+='<td>'+value1+'</td>';
                });
                sjHtml+='</tr>';
                i++;
            });
            $('table.sjzs').append(sjHtml);
        }
    });
}

/**
 * Created by Administrator on 2017/1/17/017.
 */
function sjdbload() {
    $.ajax({
        url:'../json/sjypdb/sjdb.json',
        type:'get',
        data:{},
        dataType:'json',
        success:function(result){
            var sjHtml='';
            var i=1;
            $.each(result,function(key,value){
                sjHtml+='<tr><td>' +
                                '<label><input type="checkbox" value=""></label>' +
                            '</td>' +
                            '<td>'+i+'</td>';
                $.each(value,function(key1,value1){
                    sjHtml+='<td>'+value1+'</td>';
                });
                sjHtml+='<td><ul class="metro">';
                    sjHtml+='<li data-toggle="tooltip" title="通知民警"><span class="glyphicon glyphicon-phone-alt"></span></li>';
                    sjHtml+='<li data-toggle="tooltip"title="通知快递公司"><span class="glyphicon glyphicon-phone-alt"></span></li>';
                    sjHtml+='<li data-toggle="tooltip" title="忽略"><span class="glyphicon glyphicon-ban-circle"></span></li>';
                    sjHtml+='</ul></td></tr>';
                i++;
            });
            $('table.sjdb').append(sjHtml);
                var $box = $('.box');
            var num=1;
            var num1='<h3>通知民警</h3><form role="form">'+
                                            '<div class="form-group col-sm-10 col-lg-offset-1">'+
                                                '<input type="text" class="form-control" placeholder="请输入通知单位">'+
                                            '</div>'+
                                            '<div class="form-group col-sm-10 col-lg-offset-1">'+
                                                    '<textarea class="form-control" rows="5" placeholder="请输入通知"></textarea>'+
                                            '</div>'+
                                             '<div class="form-group col-sm-12">'+
                                                    '<button type="submit" class="btn btn-default">确定</button>&nbsp;'+
                                                    '<button type="button" class="btn btn-default">取消</button>'+
                                            '</div>'+
                                        '</form>';
            var num2='<h3>通知快递公司</h3><form role="form">'+
                '<div class="form-group col-sm-10 col-lg-offset-1">'+
                '<input type="text" class="form-control" placeholder="请输入要通知的快递公司">'+
                '</div>'+
                '<div class="form-group col-sm-10 col-lg-offset-1">'+
                '<textarea class="form-control" rows="5" placeholder="请输入通知"></textarea>'+
                '</div>'+
                '<div class="form-group col-sm-12">'+
                '<button type="submit" class="btn btn-default">确定</button>&nbsp;'+
                '<button type="button" class="btn btn-default">取消</button>'+
                '</div>'+
                '</form>';
            var num3='<h3>忽略</h3><form role="form">'+
                '<div class="form-group col-sm-10 col-lg-offset-1">'+
                '您确认要忽略该条预警数据吗？'+
                '</div>'+
                '<div class="form-group col-sm-12">'+
                '<button type="submit" class="btn btn-default">确定</button>&nbsp;'+
                '<button type="button" class="btn btn-default">取消</button>'+
                '</div>'+
                '</form>';
                $('.metro li').each(function () {
                    var color = $(this).css('backgroundColor');
                    var content;
                    if(num==1) content = num1;
                    else if(num==2) content = num2;
                    else if(num==3) content = num3;

                    $(this).click(function () {
                        $('.boxp').addClass('op');
                        $box.css('backgroundColor', color);
                        $box.addClass('open');
                        $box.find('p').html(content);
                    });
                    $('.close').click(function () {
                        $box.removeClass('open');
                        $('.boxp').removeClass('op');
                        $box.css('backgroundColor', 'transparent');
                    });
                    num++;
                });
        }
    });
}
