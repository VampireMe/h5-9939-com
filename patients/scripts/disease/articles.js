/**
 * Created by gaoqing on 2016/9/18.
 * 疾病文章
 */

var disease_articles = {
    datas: null,
    init: function () {
        this.render_articles();
    },
    render_articles: function () {
        var harticles = '';
        if (this.datas != null && this.datas.data.length > 0){
            var curr = {};
            for (var i = 0; i < this.datas.data.length; i++){
                curr = this.datas.data[i];
                harticles += '<a href="">\
                                <h3>'+ curr['title'] +'</h3>\
                                <p>'+ curr['description'] +'</p>\
                            </a>';
            }
        }
        $('[portion="articles"]').html(harticles);
    }

}