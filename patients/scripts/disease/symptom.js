/**
 * Created by gaoqing on 2016/9/14.
 * 症状部分
 */

var disease_symptom = {
    datas: null,
    name: {
        name: null
    },
    symptom: {
        tsymptom: null,
        symptom: null
    },
    init: function () {
        this.name.name = this.datas.data.name;
        this.symptom.tsymptom = this.datas.data.tsymptom;
        this.symptom.symptom = this.datas.data.symptom;

        this.render_name();
        this.render_symptom();
    },
    render_name: function () {
        $('[portion="name"]').render(this.name);
    },
    render_symptom: function () {
        $('[portion="symptom"]').render(this.symptom);
        disease_tool.foreach($("[fportion='tsymptom']"), '<a>{args}</a>', this.symptom.tsymptom, 5, 'name');
    }
};
