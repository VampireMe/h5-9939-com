/**
 * Created by gaoqing on 2016/9/18.
 * 病因
 */

var disease_cause = {
    datas: null,
    name: {
        name: null
    },
    cause: {
        cause: null
    },
    init: function () {
        this.name.name = this.datas.data.name;
        this.cause.cause = this.datas.data.cause;

        this.render_name();
        this.render_cause();
    },
    render_name: function () {
        $('[portion="name"]').render(this.name);
    },
    render_cause: function () {
        $('[portion="cause"]').render(this.cause);
    }
};
