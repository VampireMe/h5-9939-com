var IM = function (parent, talk_id) {
    this.ctrl = parent;
    this.g_talk_id = talk_id;
    this.open = function () {
        if (this.validate()) {
            im_client.init(this.ctrl, this.g_talk_id);
        }
    };
    this.validate = function () {
        var key_talk_id = 'talk-' + this.g_talk_id;
        var curr_userid = this.ctrl.userinfo.uid;
        var curr_talk_info = this.ctrl.cache_talklist[key_talk_id];
        if (curr_userid == curr_talk_info.sender_uid && parseInt(curr_talk_info.receiver_uid) == 0) {
            alert('当前问题还没有人认领!');
            return false;
        }
        return true;
    };
};


/**
 * 主要业务逻辑相关
 */
var im_client = {
    /**
     * 初始化变量
     * @return {void}
     */
    init: function (ctrl, talks_id) {
        this.load(ctrl, talks_id);
        this.initnode();
        this.addevent();
    },
    load: function (ctrl, talks_id) {
        var that = this;
        var key_talk_id = 'talk-' + talks_id;
        this.parent = ctrl;
        this.userinfo = ctrl.userinfo;
        this.g_talks_id = talks_id;
        this.curr_talkinfo = ctrl.cache_talklist[key_talk_id];

        var receive_uid = this.curr_talkinfo.receiver_uid;
        var sender_uid = this.curr_talkinfo.sender_uid;
        var to_userid = this.userinfo.uid == sender_uid ? receive_uid > 0 ? receive_uid : 0 : sender_uid;
        this.curr_to_userid = to_userid;

        this.cache = new Cache(this.userinfo);
        this.appui = new AppUI(this.userinfo);

        var onreceived = function (msg) {
            that.doMsg(msg);
        };
        this.sdk = new SDKBridge(this, this.cache, {'token': this.userinfo.token, 'onreceived': onreceived});
        this.initUI();
    },
    initnode: function () {
        this.$div_chat_container = $("#div_chat_container");
        this.$chatContent = $('#j-chatContent');
        this.$messageText = $('#j-messageText');
        this.$sendBtn = $('#j-sendBtn');
        this.$sendImg = $('#j-sendImg');

        this.$btnClose = $("#btn_close");

        //kick弹窗
        this.$logoutDialog = $('#j-logoutDialog');
        this.$closeDialog = $('#j-closeDialog');
        this.$cancelBtn = $('#j-cancelBtn');
        this.$okBtn = $('#j-okBtn');
        this.$mask = $('#j-mask');
    },
    addevent: function () {
        var that = this;
        that.$sendBtn.on('click', that.sendTextMessage.bind(that));
        that.$messageText.on('keyup', function (e) {
            var evt = e || window.event;
            var params = {'that': that, 'evt': evt};
            that.inputMessage.apply(this, [params]);
        });
        that.$btnClose.on('click', that.closeLayer.bind(that));
        that.$okBtn.on('click', that.logout.bind(that));

    },
    initUI: function () {
        var g_load_msg_flag = 0;
        var g_load_user_flag = 0;
        var that = this;
        that.openChatBox(that.curr_to_userid);

        that.getHistoryMsgs(function (ret) {
            var msglist = [];
            var fstmsg = that.createDefaultMsg();
            msglist.push(fstmsg);
            if (ret.code == 200) {
                var lists = ret.data.list;
                var total = ret.data.total;
                var len = lists.length;
                for (var i = 0; i < len; i++) {
                    var row = lists[i];
                    var msg = that.parseMsg(row);
                    msglist.push(msg);
                }
                that.cache.addMsgs(msglist);
            }
            g_load_msg_flag = 1;
            if (g_load_msg_flag == 1 && g_load_user_flag == 1) {
                that.doChatUI(that.curr_talkinfo.id);
            }
        });
        that.get_talks_users(function (ret) {
            if (ret.code == 200) {
                var list = ret.data;
                if (list.length > 0) {
                    that.cache.setPersonlist(list);
                }
            } else {
                alert(ret.message);
                return false;
            }
            g_load_user_flag = 1;
            if (g_load_msg_flag == 1 && g_load_user_flag == 1) {
                that.doChatUI(that.curr_talkinfo.id);
            }
        });
    },
    inputMessage: function (params) {
        var evt = params['evt'];
        var that = params['that'];
        var $this = $(this);
        if ($.trim($this.val()).length > 0) {
            that.change_btn_state();
            if (evt.keyCode === 13 && evt.ctrlKey) {
                $this.val($this.val() + '\r\n');
            } else if (evt.keyCode === 13 && !evt.ctrlKey) {
                that.sendTextMessage();
            }
        } else {
            that.change_btn_state();
        }
    },
    change_btn_state: function () {
        var that = this;
        var v = that.$messageText.val();
        if ($.trim(v).length > 0) {
            that.$sendImg.hide();
            that.$sendBtn.show();
        } else {
            that.$sendImg.show();
            that.$sendBtn.hide();
        }
    },
    sendTextMessage: function () {
        var that = this;
        var body = that.$messageText.val();
        var targetid = that.curr_to_userid;
        var msg = {
            'type': 'text',
            'content': body,
            'from':this.userinfo.uid,
            'to': targetid
        };
        if (/text|image|custom|tip/i.test(msg.type)) {
            that.sdk.sendMessage(msg, {
                onSuccess: function (message) {
                    msg.time = message.sentTime;
                    msg.msg_id = message.messageUId;
                    that.sysnMsgLocalServer(msg);
                    that.doMsg(msg);
                }
            });
        }

    },
    /**
     * 处理收到的消息 
     * @param  {Object} msg 
     * @return 
     */
    doMsg: function (msg) {
        var that = this,
                updateContentUI = function (msginfo) {
                    var msgHtml = that.appui.updateChatContentUI(msginfo, that.cache);
                    that.$chatContent.find('.no-msg').remove();
                    that.$chatContent.append(msgHtml).scrollTop(99999);
                    that.$messageText.val('');
                    that.change_btn_state();
                };

        if (/text|image|custom|tip/i.test(msg.type)) {
            updateContentUI(msg);
//            console.log(message);
        }
    },
    /**
     * 同步发送的消息到本地服务器
     * lc@2016-8-8
     * @returns {undefined}
     */
    sysnMsgLocalServer: function (msg) {
        var that = this;
        var msgInfo = {
            'talks_id': this.g_talks_id, //本地消息id
            'uid': this.userinfo.uid, //发送者ID
            'username': this.userinfo.username, //发送者
            'flag': msg.type, //消息类型
            'body': msg.content, //消息内容
            'im_msg_id': msg.msg_id,
            'im_msg_time': msg.time,
            'from_flag': (this.userinfo.utype == 2 ? 1 : 0) //用户类型，1:医生 0:普通用户
        };
        japp.ajax.call('ask.create_talksdetail', {
            'data': msgInfo,
            'success': function (ret) {
                if (ret.code == 200) {
                    that.parent.update_talk_cache(that.g_talks_id, msgInfo);
                } else {
                    alert(ret.message);
                    return false;
                }
            }
        });
    },
    /**
     * 点击左边面板，打开聊天框
     */
    openChatBox: function (to_userid) {
        if (to_userid > 0) {
            var html = this.appui.buildChatContainer();
            var style = "position:fixed; left:0; top:0; width:100%; height:100%;" +
                    "border: none; -webkit-animation-duration: .5s; animation-duration: .5s;";
            var pageii = layer.open({
                type: 1,
                content: html,
                anim: 'up',
                style: style,
                shadeClose: false
            });
            this.layer_index = pageii;
        } else {
            alert('会话信息获取错误!');
        }
    },
    /**
     * 获取当前会话消息
     * @return {void}
     */
    getHistoryMsgs: function (callback) {
        var that = this;
        var talks_id = that.curr_talkinfo.id;
        that.sdk.getHistoryMessages(talks_id, 0, 10, {
            onSuccess: function (ret) {
                if (typeof (callback) == 'function') {
                    callback.apply(this, [ret]);
                }
            }
        });
    },
    parseMsg: function (row) {
        var msg = {};
        msg.id = row.id;
        msg.from = row.uid;
        msg.from_nick = row.username;
        msg.to = row.from_flag == 1 ? this.curr_talkinfo.sender_uid : this.userinfo.uid;
        msg.to_nick = row.from_flag == 1 ? this.curr_talkinfo.sender_name : this.userinfo.username;

        msg.talks_id = row.talks_id;
        msg.time = row.createtime;
        msg.type = row.flag;
        msg.status = 'success';
        msg.content = row.body;
        return msg;
    },
    get_talks_users: function (callback) {
        var that = this;
        japp.ajax.call('ask.get_talks_users', {
            'data': {'talks_id': that.curr_talkinfo.id},
            'success': function (ret) {
                if (typeof (callback) == 'function') {
                    callback.apply(this, [ret]);
                }
            }
        });
    },
    //拿到历史消息后聊天面板UI呈现
    doChatUI: function (talks_id) {
        var that = this;
        var temp = that.appui.buildChatContentUI(talks_id, that.cache);
        that.$chatContent.html(temp);
//        that.$chatContent.scrollTop(9999);

    },
    getLocalMsgsDone: function (err, data) {
        if (!err) {
            var msgs = data.msgs;
            var defaultmsg = this.createDefaultMsg();
            msgs.push(defaultmsg);
            this.cache.addMsgsByReverse(msgs);
            var id = data.scene + "-" + data.to;
            var array = getAllAccount(msgs);
            var that = this;
            this.checkUserInfo(array, function (argument) {
                that.doChatUI(id);
            });
        } else {
            alert("获取历史消息失败");
        }
    },
    /**
     * 创建默认的问题消息 
     * @param  {Object} msg 
     * @return 
     */
    createDefaultMsg: function () {
        var msg = {};
        msg.id = 0;
        msg.from = this.curr_talkinfo.sender_uid;
        msg.from_nick = this.curr_talkinfo.sender_name;
        msg.to = this.curr_talkinfo.receiver_uid;
        msg.to_nick = this.curr_talkinfo.receiver_name;
        msg.talks_id = this.curr_talkinfo.id;
        msg.time = this.curr_talkinfo.createtime * 1000;
        msg.type = 'text';
        msg.status = 'success';
        msg.content = this.curr_talkinfo.subject;
        return msg;
    },
    logout: function () {
    },
    closeLayer: function () {
        layer.close(this.layer_index);
    }
};