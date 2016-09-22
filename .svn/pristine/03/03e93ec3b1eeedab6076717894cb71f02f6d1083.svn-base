/**
 * Created by gaoqing on 2016/9/18.
 * 病因
 */

var disease_inspect = {
    datas: null,
    name: {
        name: null
    },
    inspect: {
        inspect: null
    },
    init: function () {
        this.name.name = this.datas.data.name;
        this.inspect.inspect = this.datas.data.inspect;

        this.render_name();
        this.render_inspect();
    },
    render_name: function () {
        $('[portion="name"]').render(this.name);
    },
    render_inspect: function () {
        $('[portion="inspect"]').render(this.inspect);
    }
};
