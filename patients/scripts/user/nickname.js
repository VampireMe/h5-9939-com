var nickname = {
    init: function () {
        this.user_render();
        this.addEvent();
    },
    dom: {
        formst: $('.formst'),
        head:$('.head'),
        loading: $('.loading'),
        maincontent: $('.maincontent')
    },
    userInfo: {
        uid: japp.store.get('uid'),
        nickname: japp.store.get('nickname'),
    },
    links:{
      backLink:'/patients/views/user/personal.html',
   },
    user_render: function () {
        this.dom.head.render(this.links);
        this.dom.formst.render(this.userInfo);
        this.boadLoading();
    },
    addEvent: function () {
        $('.subs').on('click', this.verify.bind(this));
    },
    verify: function () {
        //获取修改数据、验证数据合法性，提交数据
        var new_nickname = $('.nickname').val();
        if (new_nickname == this.userInfo.nickname) {
            alert('昵称没有修改，无需提交');
        } else {
            var data = {'userid':this.userInfo.uid,'nickname':new_nickname};
            this.uajax(data);
        }
    },
    uajax: function (data) {
        japp.ajax.call(
            'userp.nickname',
            {
                'data': data,
                'beforeSend': function () {
                    alert('beforeSend');
                },
                'success': function (meg) {
                    if (meg.code == 200) {
                      japp.store.set('nickname',data.nickname,10000);
                      alert('设置成功！');
                    }
                },
                'error': function () {
                    alert('设置失败！');
                }
            }
        );
    },
    boadLoading: function () {
        this.dom.loading.hide();
        this.dom.maincontent.show();
    }
}
nickname.init();
