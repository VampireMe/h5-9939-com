/**
 * Created by gaoqing on 2016/9/13.
 * 疾病首页
 */

$('title').html('疾病首页');

var disease_index = {
    name: {
        name: null
    },
    html: '',
    jianjie: disease_jianjie,
    symptom: disease_symptom,
    cause: disease_cause,
    prevent: disease_prevent,
    neopathy: disease_neopathy,
    inspect: disease_inspect,
    treat: disease_treat,
    food: disease_food,
    articles: disease_articles,
    articles_page: 1,
    aparams: {
        app_domain: document.config.app_domain,
        pinyin_initial: null
    },
    allreads: null,
    init: function () {
        japp.ajax.call('adisease.index&dname=tnb', {
            success: function (datas) {
                //1、设置基本名称
                disease_index.name.name = datas.data.disease.name;

                disease_index.back();

                //2、设置疾病的基本信息
                $('[portion="info"]').render(datas.data.disease);
                disease_tool.foreach($("[fportion='part']"), '<a>{args}</a>', datas.data.disease.part, 3, 'name');
                disease_tool.foreach($("[fportion='department']"), '<a>{args}</a>', datas.data.disease.department, 3, 'name');
                disease_tool.foreach($("[fportion='symptom']"), '<a>{args}</a>', datas.data.disease.tsymptom, 3, 'name');
                disease_tool.foreach($("[fportion='drug']"), '<a>{args}</a>', datas.data.disease.medicine, 3);

                //3、设置疾病的详细信息
                $('[portion="content"]').render(datas.data.disease.content_app);

                disease_index.allreads = datas.data.allReads;
                disease_index.aparams.pinyin_initial = datas.data.disease.pinyin_initial;

                disease_index.render_name();
                disease_index.bind_all_reads();

                disease_index.html = $("#content").html();

                disease_index.render_detail('jianjie', 'jianjie','jianjie', disease_index.jianjie, disease_index.aparams);
                disease_index.render_detail('symptom', 'symptom','symptom', disease_index.symptom, disease_index.aparams);
                disease_index.render_detail('cause', 'cause','cause', disease_index.cause, disease_index.aparams);
                disease_index.render_detail('prevent', 'prevent','prevent', disease_index.prevent, disease_index.aparams);
                disease_index.render_detail('inspect', 'inspect','inspect', disease_index.inspect, disease_index.aparams);
                disease_index.render_detail('treat', 'treat','treat', disease_index.treat, disease_index.aparams);
                disease_index.render_detail('food', 'food','food', disease_index.food, disease_index.aparams);
                disease_index.render_detail('neopathy', 'neopathy','neopathy', disease_index.neopathy, disease_index.aparams);

                $(".loading").hide();
                $(".maincontent").show();

                disease_index.render_articles();
                disease_index.tab_switch();
            }
        });
    },
    tab_switch: function () {
        $("#bread_index").on('click', function () {
            $("#content").html(disease_index.html);

            $("#bread a").removeClass('cup');
            $("#bread_index").addClass('cup');
        });
        $("#bread_knowledge").on('click', function () {
            disease_index.execute_detail('jianjie', disease_index.aparams, 'jianjie', disease_index.jianjie);
            $(".bottomcontent").show();
            $("#bread a").removeClass('cup');
            $("#bread_knowledge").addClass('cup');
        });
        $("#bread_article").on('click', function (click_event) {
            disease_index.execute_articles(click_event);
            $("#bread a").removeClass('cup');
            $("#bread_article").addClass('cup');
        });
    },
    back: function () {
        $("div").delegate("[data-value='2']", "click", function(){
            disease_index.articles_page = 1;
            $("#content").html(disease_index.html);
            $("#bread a").removeClass('cup');
            $("#bread_index").addClass('cup');
        });
        $("div").delegate("[data-value='1']", "click", function(){
            window.history.go(-1);
        });
    },
    render_name: function () {
        $('[portion="name"]').render(this.name);
    },
    bind_all_reads: function () {
        var html = '';
        if(this.allreads != null){
            for (title in this.allreads){
                var allread = this.allreads[title];

                //设置具体文章 li 部分
                var inner = '';
                if(allread != null && allread.length > 0){
                    for (var i = 0; i < allread.length; i++){
                        if (i == 2){
                            break;
                        }
                        inner += '<dd>\
                                        <a href="'+ allread[i].app_url +'">'+ allread[i].title +'</a>\
                                      </dd>';
                    }
                }
                //组装数据
                html += '<li>\
                                    <dl>\
                                        <dt>'+ title +'</dt>\
                                        '+inner+'\
                                    </dl>\
                                </li>';
            }
        }
        $("[portion='allreads']").html(html);
    },
    execute_detail: function (method, params, template, module) {
        japp.ajax.call('adisease.' + method + '&dname=' + params.pinyin_initial, {
            success: function (djianjie) {
                $.get(document.config.app_domain + '/patients/views/disease/' + template + '.html', function (hjianjie) {
                    //1、设置加载按钮
                    $(".loading").show();

                    //2、将原来的页面内容替换掉，并隐藏
                    $(".maincontent").hide();
                    $(".dynamiccontent").html(hjianjie);

                    //3、执行渲染页面的操作
                    module.datas = djianjie;
                    module.init();

                    $("#bread_index").removeClass('cup');
                    $("#bread_knowledge").addClass('cup');

                    $("[data-value='1']").attr('data-value', '2');

                    //4、渲染完成后，显示页面
                    $(".loading").hide();
                    $(".maincontent").show();
                    $(".share").show();
                });
            }
        });
    }, /**
     * 渲染详细信息部分（简介、症状、病因.....）
     * @param identify 操作对象的标识
     * @param method 后台 api 的方法名
     * @param template 渲染数据的 html 模板名称
     * @param module 当前操作的模块数据对象
     * @param params 附加的数据
     */
    render_detail: function (identify, method, template, module, params) {
        $("#content").delegate("." + identify, "click", function(){
            disease_index.execute_detail(method, params, template, module);
        });
    },
    execute_articles: function (click_target_id) {
        japp.ajax.call('adisease.articles&dname=' + disease_index.aparams.pinyin_initial + "&page=" + disease_index.articles_page, {
            success: function (articles) {
                if (articles.code == 200) {
                    $.get(document.config.app_domain + '/patients/views/disease/articles.html', function (harticles) {
                        if (click_target_id == 'articles_lists' || click_target_id == 'bread_article') {
                            disease_index.render_articles_start();
                        }
                        var beforeHTML = $(".dynamiccontent").html();
                        $(".dynamiccontent").html('');
                        $(".dynamiccontent").after('<div class = "tmpcontent" style="display:none;"></div>');
                        $(".tmpcontent").html(harticles);

                        //3、执行渲染操作：
                        disease_index.articles.datas = articles;
                        disease_index.articles.init();

                        $(".dynamiccontent").html(beforeHTML + $(".tmpcontent").html());
                        $(".tmpcontent").remove();
                        $('#articles_more').remove();
                        $('[portion="articles"]').last().append('<a href="javascript:;" class="agmor" id = "articles_more">点击查看更多</a>');

                        if (click_target_id == 'articles_lists' || click_target_id == 'bread_article') {
                            disease_index.render_articles_end();
                        }
                        disease_index.articles_page++;
                        $("[data-value='1']").attr('data-value', '2');
                    });
                }
            }
        });
    },
    render_articles: function () {
        $("#content").delegate('[id*="articles"]', "click", function(click_event){
            var click_target_id = click_event.target.id;
            if (click_target_id == 'articles_lists' || click_target_id == 'bread_article') {
                disease_index.articles_page = 1;
            }
            disease_index.execute_articles(click_target_id);
        });
    }, 
    render_articles_start: function () {
        //1、设置加载按钮
        $(".loading").show();

        //2、将原来的页面内容替换掉，并隐藏
        $(".maincontent").hide();
        $(".bottomcontent").hide();
        $(".dynamiccontent").html('');
    },
    render_articles_end: function () {
        $(".dynamiccontent").show();

        $("#bread_index").removeClass('cup');
        $("#bread_article").addClass('cup');

        //4、渲染完成后，显示页面
        $(".loading").hide();
        $(".maincontent").show();
    }
};
disease_index.init();



