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
