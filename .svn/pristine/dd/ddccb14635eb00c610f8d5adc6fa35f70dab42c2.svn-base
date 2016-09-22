(function () {
    var addquestion = {
        init: function () {
            this.checkLogin();
            this.initNode();
            this.addEvent();
        },
        initNode: function () {	// 初始化节点
            this.$subject = $('#j-subject');
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
        checkLogin: function () {//判断用户是否登录
            var user = readCookie("userinfo");
            if (!user) {
                alert('请登录之后再提交问题');
                japp.helper.gotoPage('/patients/login');
                return;
            }
            this.userinfo = user;
        },
        validate: function () {
            this.$errorMsg.addClass('hide');
            var that = this,
                    subject = $.trim(this.$subject.val()),
                    errorMsg = '';
            var nickname = that.userinfo.nickname;
            var uid = that.userinfo.uid;
            var token = that.userinfo.token;

            if (subject.length === 0) {
                errorMsg = '问题不能为空';
            } else if (subject.length < 10) {
                errorMsg = '问题不少于10个字，否则医生无法准确解答';
            } else if (subject.length > 120) {
                errorMsg = '问题字数请控制在120个字以内';
            } else {
                this.$submit.html('提交问题中...').attr('disabled', 'disabled');
                this.doSave(subject, nickname, uid, token);
                this.$submit.html('提交问题').removeAttr('disabled');
            }
            this.$errorMsg.html(errorMsg).removeClass('hide');  // 显示错误信息
            return false;
        },
        doSave: function (subject, nickname, uid, token) {
            var that = this;
            var params = {
                'sender_name': nickname,
                'sender_uid': uid,
                'sender_token': token,
                'subject': subject
            };
            japp.ajax.call('user.addQuestion', {
                data: params,
                contentType: 'application/x-www-form-urlencoded',
                success: function (ret) {
                    if (ret.code === 200) {
                        alert("问题提交成功，请等待医生回答");
                        that.$subject.val('');
                        japp.helper.gotoPage('/patients/views/profile/index');
                    } else {
                        that.$errorMsg.html(ret.message).removeClass('hide');
                        that.$submit.html('提交问题').removeAttr('disabled');
                    }
                },
                error: function () {
                    that.$errorMsg.html('请求失败，请重试');
                }
            });
        }
    };
    addquestion.init();
}());
