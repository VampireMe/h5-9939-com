/**
 * Created by gaoqing on 2016/9/18.
 * 病因
 */

var disease_food = {
    datas: null,
    name: {
        name: null
    },
    food: {
        food: null
    },
    init: function () {
        this.name.name = this.datas.data.name;
        this.food.food = this.datas.data.food;

        this.render_name();
        this.render_food();
    },
    render_name: function () {
        $('[portion="name"]').render(this.name);
    },
    render_food: function () {
        $('[portion="food"]').render(this.food);
    }
};
