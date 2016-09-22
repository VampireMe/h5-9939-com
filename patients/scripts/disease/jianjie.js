/**
 * Created by gaoqing on 2016/9/14.
 * 简介部分
 */

var disease_jianjie = {
    datas: null,
    name: {
        name: null
    },
    jianjie: {
        description: null
    },
    init: function () {
        this.name.name = this.datas.data.name;
        this.jianjie.description = this.datas.data.description;

        this.render_name();
        this.render_jianjie();
    },
    render_name: function () {
        $('[portion="name"]').render(this.name);
    },
    render_jianjie: function () {
        $('[portion="jianjie"]').render(this.jianjie);
    }
};