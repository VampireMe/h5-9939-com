/**
 * Created by gaoqing on 2016/9/12.
 * 工具对象
 */

var disease_tool = {

    /**
     * 循环绑定元素
     * @param obj 当前要循环的元素对象
     * @param sed 循环的 html （example: '<a>{args}</a>'）
     * @param datas 数据集
     * @param limit 限制数量
     * @param key 对象属性（如果数据集中的每个元素是 object 时，需要指定）
     */
    foreach: function (obj, sed, datas, limit, key) {
        key = key || '';
        limit = limit || 0;

        var html = '';
        if ((typeof datas == 'object') && (datas instanceof Array) && datas.length > 0){
            var reg = /\{args\}/ig;
            for (var i = 0; i < datas.length; i++){
                if (limit > 0 && i == limit){
                    break;
                }
                var curr = datas[i];

                //type of Object
                if (curr != null && curr != undefined && (typeof curr == 'object')){
                    html += sed.replace(reg, curr[key]);
                }
                //type of string
                if (typeof curr == 'string'){
                    html += sed.replace(reg, curr);
                }
            }
            $(obj).html(html);
        }
    }


};