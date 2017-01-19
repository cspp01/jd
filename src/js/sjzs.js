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
