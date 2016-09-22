var register = {
    init: function () {
        this.initNode();
        this.addEvent();
    },
    initNode: function () {	// 初始化节点
        this.$username = $('#username');
        this.$nickname = $('#nickname');
        this.$email = $('#email');
        this.$pwd = $('#password');
        this.$password1 = $('#password1');
        this.$dis = $("input[name='dis[]']:checked");
        this.$utype = $('#utype');
        this.$source = $('#source');
        this.$truename = $('#truename');
        this.$hospital = $('#hospital');
        this.$qh = $('#qh');
        this.$dwdh = $('#dwdh');
        this.$phone = $('#phone');
        this.$errorMsg = $('#errorMsg');
        this.$submit = $('#submit');
    },
    addEvent: function () {	// 绑定事件
        var that = this;
        this.$submit.on('click', this.validate.bind(this));
        $(document).on('keydown', function (e) {
            var ev = e || window.event;
            if (ev.keyCode === 13) {
                that.validate();
            }
        });
    },
    validate: function () {
        this.$errorMsg.addClass('hide');
        var that = this,
                username = $.trim(this.$username.val()),
                nickname = $.trim(this.$nickname.val()),
                email = $.trim(this.$email.val()),
                pwd = this.$pwd.val(),
                pwd2 = $.trim(this.$password1.val()),
                utype = $.trim(this.$utype.val()),
                source = $.trim(this.$source.val()),
                truename = $.trim(this.$truename.val()),
                hospital = $.trim(this.$hospital.val()),
                qh = $.trim(this.$qh.val()),
                dwdh = $.trim(this.$dwdh.val()),
                phone = $.trim(this.$phone.val()),
                errorMsg = '';
        
        if (username.length === 0) {
            errorMsg = '帐号不能为空';
        } else if (nickname.length === 0) {
            errorMsg = '昵称不能为空';
        } else if (!pwd || pwd.length < 6) {
            errorMsg = '密码为6~20位字母或者数字';
        } else if (!pwd || pwd.length < 6 || pwd !== pwd2) {
            errorMsg = '两次输入密码不一致，请确认';
        } else if (truename.length === 0) {
            errorMsg = '真实姓名不能为空';
        } else if (hospital.length === 0) {
            errorMsg = '就职医院不能为空';
        } else if (qh.length === 0) {
            errorMsg = '单位电话区号不能为空';
        } else if (dwdh.length === 0) {
            errorMsg = '单位电话号码不能为空';
        } else if (phone.length === 0) {
            errorMsg = '手机不能为空';
        } else {
            this.$submit.html('注册中...').attr('disabled', 'disabled');
            this.doRegister(username, nickname, email, pwd, pwd2, utype, source, truename, hospital, qh, dwdh, phone);
            return;
            this.$submit.html('注册').removeAttr('disabled');
        }
        this.$errorMsg.html(errorMsg).removeClass('hide');  // 显示错误信息
        return false;
    },
    doRegister: function (username, nickname, email, pwd, pwd1, utype, source, truename, hospital, qh, dwdh, phone) {
        var that = this;
        var params = {
            'username': username,
            'nickname': nickname,
            'email': email,
            'password': pwd,
            'password1': pwd1,
            'utype': utype,
            'source': source,
            'truename': truename,
            'doc_hos': hospital,
            'qh': qh,
            'dwdh': dwdh,
            'phone': phone,
        };
        japp.ajax.call('user.create',{
            data:params,
            contentType: 'application/x-www-form-urlencoded',
            success: function (ret) {
//                console.log(ret.code);
                if (ret.code === 200) { 
                    alert("注册成功");
                    japp.helper.gotoPage('/index');
                } else {
                    that.$errorMsg.html(ret.message).removeClass('hide');
                    that.$submit.html('注册').removeAttr('disabled');
                }
            },
            error: function () {
                that.$errorMsg.html('请求失败，请重试');
            }
        });
    },
    /**
     * 获取浏览器的名称和版本号信息
     */
    getBrowser: function () {
        var browser = {
            msie: false,
            firefox: false,
            opera: false,
            safari: false,
            chrome: false,
            netscape: false,
            appname: 'unknown',
            version: 0
        }, ua = window.navigator.userAgent.toLowerCase();
        if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(ua)) {
            browser[RegExp.$1] = true;
            browser.appname = RegExp.$1;
            browser.version = RegExp.$2;
        } else if (/version\D+(\d[\d.]*).*safari/.test(ua)) { // safari
            browser.safari = true;
            browser.appname = 'safari';
            browser.version = RegExp.$2;
        }
        return browser.appname + ' ' + browser.version;
    }
};
register.init();