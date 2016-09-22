/**
 * Created by gaoqing on 2016/9/18.
 * 病因
 */

var disease_neopathy = {
    datas: null,
    name: {
        name: null
    },
    neopathy: {
        neopathy: null
    },
    init: function () {
        this.name.name = this.datas.data.name;
        this.neopathy.neopathy = this.datas.data.neopathy;

        this.render_name();
        this.render_neopathy();
    },
    render_name: function () {
        $('[portion="name"]').render(this.name);
    },
    render_neopathy: function () {
        $('[portion="neopathy"]').render(this.neopathy);
    }
};
