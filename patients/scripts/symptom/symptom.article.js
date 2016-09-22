//(function () {
//    
//}());

var article = {
    init: function () {
        this.get_symptom_info(1, 0);
    },
    
    changepage: function (info) {
        this.render_page(info);
        $(".loading").hide();
        $(".maincontent").show();
    },
    
    //设置标题
    render_page: function (info) {
//        console.log(info);
        $('*[view-pinyin="pinyin_initial"]').render(info);//链接添加拼音
        $('*[view-title="name"]').render(info);//大标题
        $(".inde").render(info);
        
        //相关文章列表
        var art_htmlstr = this.get_articles(info);
        $('article[view-list="article"]').html(art_htmlstr);
    },
    
    //文章列表
    get_articles: function(info){
        var symptom_name = info.name;
        var articles = info.articles;
        
        //注册一个外部函数
        template.helper('formatTitle', function(title, words) {
            var reg = new RegExp(words,'ig');
            html = title.replace(reg,"<span>"+words+"</span>");
            return html;
        });
        
        //js渲染模板
        var tpl = 
          '{{each articles as value i}}'
        + '<a href="/patients/views/symptom/index.html?pinyin={{value.title}}">'
        + '     <h3>{{value.title}}</h3>'
        + '     <p>{{value.description}}</p>'
        + '</a>'
        + '{{/each}}';
        //编译模板
	var render = template.compile(tpl);
        //绑定数据
        var html = render({articles: articles});
        return html;
    },
    
    /**
     * 获取页面信息
     * @param {type} page 页码
     * @param {type} showmore 是否是加载更多
     * @returns {undefined}
     */
    get_symptom_info: function (page, showmore) {
        var pinyin = japp.helper.getQueryParam('pinyin');
        var that = this,symptominfo,formdata = {'pinyin_initial': pinyin, 'fileds': 'cause,relieve,examine,goodfood', page:page},
        errorMsg = '';
        japp.ajax.call('symptom.getarticle', {
            'data': formdata,
            'beforeSend':function(){
                if(showmore){//是否是加载更多
                    $('.agmor').html('数据加载中...');
                }
            },
            'success': function (ret) {
                if (ret.code == 200) {
                    var symptominfo = ret.data;
                    if(showmore){//是否是加载更多
                        //相关文章列表
                        var art_htmlstr = that.get_articles(symptominfo);
                        $('article[view-list="article"]').append(art_htmlstr);
                    }else{
                        that.changepage(symptominfo);
                    }
                }else if(ret.code == 201){
                    $('.agmor').html('对不起，我是有底线的。');
                    alert(ret.message);
                    return false;
                } else {
                    alert('数据异常');
                    return false;
                }
                ismore_load = 0;
            },
            error: function () {
                console.log('请求失败，请重试');
            }
        });
    },
    
};
article.init();

var cur_page = 1;
var ismore_load = 0;
$(window).scroll(function(){
    if(japp.helper.checkIsScrollToBottom() && ismore_load==0){
        cur_page++;
        if(cur_page <= 10){
            ismore_load = 1;
            console.log(cur_page);
            article.get_symptom_info(cur_page+1, 1);
        }
    }
});