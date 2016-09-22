/**
 * Created by gaoqing on 2016/9/18.
 * 病因
 */

var disease_treat = {
    datas: null,
    name: {
        name: null
    },
    treat: {
        treat: null,
        mtreat: null
    },
    init: function () {
        this.name.name = this.datas.data.name;
        this.treat.treat = this.datas.data.treat;
        this.treat.mtreat = this.datas.data.treat_method;

        this.render_name();
        this.render_treat();
    },
    render_name: function () {
        $('[portion="name"]').render(this.name);
    },
    render_treat: function () {
        $('[portion="treat"]').render(this.treat);
        disease_tool.foreach($("[fportion='mtreat']"), '<a>{args}</a>', this.treat.mtreat, 5);
    }
};
