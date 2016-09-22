//(function () {
//    
//}());

var introduce = {
    init: function () {
        this.get_symptom_info();
    },
    
    changepage: function (info) {
        this.render_page(info);
        $(".loading").hide();
        $(".maincontent").show();
    },
    
    //设置标题
    render_page: function (info) {
        console.log(info);
        $('*[view-pinyin="pinyin_initial"]').render(info);//链接添加拼音
        $('*[view-title="name"]').render(info);//大标题
        $(".inde").render(info);
    },
    
    get_symptom_info: function () {
        var pinyin = japp.helper.getQueryParam('pinyin');
        var that = this,symptominfo,formdata = {'pinyin_initial': pinyin},
        errorMsg = '';
        japp.ajax.call('symptom.getsymptom', {
            'data': formdata,
            'success': function (ret) {
                if (ret.code == 200) {
                    var symptominfo = ret.data;
                    that.changepage(symptominfo);
                } else {
                    alert('数据异常');
                    return false;
                }
            },
            error: function () {
                console.log('请求失败，请重试');
            }
        });
    },
    
    
};
introduce.init();