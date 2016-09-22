/**
 * Created by gaoqing on 2016/9/18.
 * 病因
 */

var disease_prevent = {
    datas: null,
    name: {
        name: null
    },
    prevent: {
        prevent: null
    },
    init: function () {
        this.name.name = this.datas.data.name;
        this.prevent.prevent = this.datas.data.prevent;

        this.render_name();
        this.render_prevent();
    },
    render_name: function () {
        $('[portion="name"]').render(this.name);
    },
    render_prevent: function () {
        $('[portion="prevent"]').render(this.prevent);
    }
};
