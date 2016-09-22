//(function () {
//    
//}());

var online = {
    init: function () {
        this.get_symptom_info();
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
        
        //医生列表
        var doc_htmlstr = this.get_doctors(info);
        $('ul[view-doctor="leftdoctor"]').html(doc_htmlstr);
        
        //问答列表
        var ask_htmlstr = this.get_questions(info);
        $('ul[view-questions="questions"]').html(ask_htmlstr);
//        console.log(ask_htmlstr);return false;
    },
    
    //医生列表
    get_doctors: function(info){
        var doctors = info.leftDoctor;
        //js渲染模板
        var tpl = 
          '{{each doctors as value i}}'
        + '                    <li>'
        + '                        <img src="http://home.9939.com//upload/pic{{value.pic}}" alt="">'
        + '                        <h3>{{value.nickname}}</h3>'
        + '                        <p><span></span><span></span></p>'
        + '                        <p class="goda">擅长：{{value.best_dis}}</p>'
        + '                        <a href="http://ask.9939.com/Asking/?uid={{value.uid}}">立即咨询</a>'
        + '                    </li>'
        + '{{/each}}';
        //编译模板
	var render = template.compile(tpl);
        //绑定数据
        var html = render({doctors: doctors});
        return html;
    },
    
    //问答列表
    get_questions: function(info){
        var symptom_name = info.name;
        var questions = info.questions;
        
        //注册一个外部函数
        template.helper('formatTitle', function(title, words) {
            var reg = new RegExp(words,'ig');
            html = title.replace(reg,"<span>"+words+"</span>");
            return html;
        });
        
        //js渲染模板
        var tpl = 
          '{{each questions as value i}}'
        + '<li>'
        + '    <h3>'
        + '        <q>{{value.ask.title | formatTitle: "'+symptom_name+'"}}</q>'
        + '    </h3>'
        + '    <div class="spabs">'
        + '        <h4><img src="images/doc.jpg" alt=""><b>{{value.answer.userid}}</b><span>主任医师</span></h4>'
        + '        <p>{{value.answer.content}}</p>'
        + '        <a href="{{value.answer.userid}}" class="ask">向TA提问</a>'
        + '    </div>'
        + '</li>'
        + '{{/each}}';
        //编译模板
	var render = template.compile(tpl);
        //绑定数据
        var html = render({questions: questions});
        return html;
    },
    
    //相关疾病列表
    get_rel_disease_html: function(info){
        var html = '';
        var rel_diseases = info.disease;
        var htmlstr = '';
        var rel_disease_obj = rel_diseases['relDisease'];
        
        for(var i=0;i<rel_disease_obj.length;i++){
            var disease = rel_disease_obj[i];
            var disease_pinyin = disease['pinyin_initial'];
            var disease_name = disease['name'];
            var disease_rel_symptoms = rel_diseases['relSymptom'][disease_pinyin];
//            console.log(disease_rel_symptoms);
            var symptom_name,symptom_pinyin,symptom_url;
            var str = '';
            for(var n=0;n<disease_rel_symptoms.length;n++){
                
                if(n<6){
                    symptom_name = disease_rel_symptoms[n]['name'];
                    symptom_pinyin = disease_rel_symptoms[n]['pinyin_initial'];
                    symptom_url = '/patients/views/symptom/index.html?pinyin='+symptom_pinyin;
//                    str += '<a href="'+symptom_url+'">'+symptom_name+'</a>';
                    str += symptom_name+' ';
                }
            }
            
            htmlstr += '<a href="/patients/views/disease/index.html?pinyin='+disease_pinyin+'"><h3>'+disease_name+'</h3><p>伴随症状：'+str+'</p></a>';
        }
        return htmlstr;
    },
    
    //渲染列表
    render_list:function(articles_data, list_tpl){
//        var articles = [];
//        
//        for(var m=0; m<articles_data.length; m++){
//            var tmp2 = [];
//            for(var n in params){
//                if(typeof(params[n])!='function' && typeof(params[n])!='object'){
//                    var key = params[n];
//                    var value = articles_data[m][key];
//                    tmp2[key] = value;
//                }
//            }
//            articles[m] = tmp2;
//        }
//        
//        console.log(articles);
////        return false;
//        var htmlstr=list_tpl;
        
        var html_tmp='',html='',art_title='',art_url='';
        for(var i=0; i<articles_data.length; i++){
            var art = articles_data[i];
            var reg1 = new RegExp("<%url%>",'ig');
            html = list_tpl.replace(reg1, art['url']);
            
            var reg2 = new RegExp("<%title%>",'ig');
            html = html.replace(reg2, art['title']);
            html_tmp = html_tmp + html;
        }
        return html_tmp;
    },
    
    get_symptom_info: function () {
        var pinyin = japp.helper.getQueryParam('pinyin');
        var that = this,symptominfo,formdata = {'pinyin_initial': pinyin, 'fileds': 'cause,relieve,examine,goodfood', relinfo: 'doctorInfos,relask'},
        errorMsg = '';
        japp.ajax.call('symptom.getsymptom', {
            'data': formdata,
            'success': function (ret) {
                if (ret.code == 200) {
                    var symptominfo = ret.data;
                    that.changepage(symptominfo);
                } else {
                    alert('数据异常');
                    return false;
                }
            },
            error: function () {
                console.log('请求失败，请重试');
            }
        });
    },
    
    
};
online.init();
