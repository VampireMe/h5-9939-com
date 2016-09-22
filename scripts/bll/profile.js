(function () {

    var talks = function (opt) {
        this.gethtml = function () {
            var str_date = japp.helper.date('Y-m-d',opt.begintime);
            var html = '<a class="item_talks" data-talks_id="' + opt.id + '">';
            html += '<h3>' + opt.subject + '</h3>';
            html += '<p>'+str_date+'</p>';
            html += "</a>";
            return html;
        };
    };

    var profile = {
        cache_talklist: [],
        init: function () {
            this.buildproperty();
            this.initNode();
            this.initUI();
            this.addEvent();
        },
        initUI: function () {
            this.initprofile();
            this.loadtalks();
        },
        initNode: function () {
            this.$logout = $('#j-logout');
            this.$userPic = $('#j-userPic');
            this.$userName = $('#j-userName');

            this.$loadConversations = $('#j-loadConversations');//tab 消息中心
            this.$msgContainer = $('#c-msglist');//消息列表

            this.$loadContacts = $('#j-loadContacts');//tab 联系人
            this.$talkContainer = $('[data-container="c-talklist"]');//通话列表

            this.$switchPanel = $('#j-switchPanel');


            this.$nickName = $('#j-nickName');
            this.$logoutDialog = $('#j-logoutDialog');
            this.$closeDialog = $('#j-closeDialog');
            this.$cancelBtn = $('#j-cancelBtn');
            this.$okBtn = $('#j-okBtn');
            this.$mask = $('#j-mask');
            this.$friendList = $('.friends');

            //个人信息
            this.$myInfo = $("#myInfo");
            //修改头像
            this.$modifyAvatar = $("#modifyAvatar");
            //用户信息
            this.$personCard = $('#personCard');

            this.$addquestion = $("#j-addquestion");
        },
        addEvent: function () {
            var that = this;
            that.$talkContainer.delegate('.item_talks', 'click', function () {
                that.openchatdialog.apply(this, [that]);
            });
            that.$logout.on('click', that.showDialog.bind(that));
            that.$closeDialog.on('click', that.hideDialog.bind(that));
            that.$cancelBtn.on('click', that.hideDialog.bind(that));
            that.$okBtn.on('click', that.logout.bind(that));

        },
        //初始化变量
        buildproperty: function () {
            loginuser.reset();
            var user = loginuser.get();// readCookie("userinfo");// {'nickname': 'wangpuqiang', 'avatar': ''};
            if (!user) {
                japp.helper.gotoPage('/patients/login');
                return;
            }
            this.userinfo = user;
        },
        //----------------------------------------------
        //函数名：initprofile
        //说  明：初始化用户个人信息
        //----------------------------------------------
        initprofile: function () {
            this.$userName.text(this.userinfo.nickname);
            this.$userPic.attr('src', this.userinfo.avatar);
            this.loadbtns();
        },
        //加载未读信息
        loadbtns: function () {
            if (parseInt(this.userinfo.utype) == 1) {
                this.$addquestion.show();
            }
        },
        //加载通话信息
        loadtalks: function () {

            var that = this;
            var uid = that.userinfo.uid;
            var pageindex = 0;
            var pagesize = 10;
            var offset = pageindex * pagesize;
            var data = {
                'offset': offset,
                'size': pagesize
            };
            if (that.userinfo.utype == 2) {
//                data['receiver_uid'] = uid;
                data['state'] = [0, 1];
            } else {
                data['sender_uid'] = uid;
                data['state'] = [1, 2];
            }

            japp.ajax.call('ask.gettalks', {
                'data': data,
                'beforeSend': function () {
                    that.$talkContainer.html('<div class="comsize"><h3>正在获取数据...</div>');
                },
                'success': function (ret) {
                    if (ret.code == 200) {
                        //绑定会话问题
                        var lists = ret.data;
                        var len = lists.length;
                        that.$talkContainer.html('');
                        if (len > 0) {
                            for (var i = 0; i < len; i++) {
                                var row = lists[i];
                                var key_talk_id = 'talk-' + row.id;
                                that.cache_talklist[key_talk_id] = row;
                                var t = new talks(row);
                                that.$talkContainer.append(t.gethtml());
                            }
                        }
                    } else {
                        return false;
                    }
                },
                error: function () {
                    console.log('请求失败，请重试');
                }
            });
        },
        //开始IM聊天
        openchatdialog: function (that) {
            //点对点
            var talks_id = parseInt($(this).attr("data-talks_id"));
            var im = new IM(that, talks_id);
            im.open();
        },
        logout: function () {
            loginuser.logout();
            japp.helper.gotoPage('/index');
        },
        showDialog: function () {
            this.$logoutDialog.removeClass('hide');
            this.$mask.removeClass('hide');
        },
        hideDialog: function () {
            this.$logoutDialog.addClass('hide');
            this.$mask.addClass('hide');
        },
        update_talk_cache: function (talk_id, msg_info) {
            var key_talk_id = 'talk-' + talk_id;
//            var curr_talk_info = this.cache_talklist[key_talk_id];
            this.cache_talklist[key_talk_id].endtime = msg_info.im_msg_time;
        }
    };
    profile.init();
})();
