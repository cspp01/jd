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
