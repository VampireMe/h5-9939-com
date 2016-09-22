// 数据缓存
// 建议开发者选择mvvm框架来通过数据来驱动UI变化
var Cache = (function () {
    var Cache = function (_loginuser) {
        this.personlist = {};
        this.msgs = {};
        this.sessions = [];
        this.mutelist = [];
        this.sysMsgs = [];
        this.customSysMsgs = [];
        this.sysMsgCount = 0;
        if (!_loginuser) {
            this.loginuser = _loginuser;
            this.uid = this.loginuser.uid;
        }
    };

    /**
     * 根据uid获取用户对象
     * @param uid: 用户uid
     */
    Cache.prototype.getUserById = function (uid) {
        if (this.personlist[uid]) {
            return this.personlist[uid];
        }
        return false;
    };
    // 用户对象相关
    Cache.prototype.setPersonlist = function (list) {
        var item;
        for (var i = list.length - 1; i >= 0; i--) {
            item = list[i];
            this.personlist[item.uid] = item;
        }
        ;
    };

    Cache.prototype.updateAvatar = function (url) {
        this.personlist[this.uid].avatar = url;
    };

    Cache.prototype.getPersonlist = function () {
        return this.personlist;
    };


    /**
     * 设置会话列表
     * @param {Array} sessions 会话对象
     */
    Cache.prototype.setSessions = function (sessions) {
        this.sessions = sessions;
    };

    /**
     * 获取当前会话
     * @return {Array} 会话集合
     */
    Cache.prototype.getSessions = function () {
        return this.sessions;
    };

    /**
     * 获取指定会话
     * @return {Array} 会话集合
     */
    Cache.prototype.findSession = function (id) {
        for (var i = this.sessions.length - 1; i >= 0; i--) {
            if (this.sessions[i].id === id) {
                return this.sessions[i];
            }
        }
        ;
        return false;
    };

    Cache.prototype.addMsgs = function (msgs) {
        var talks_id, group_key;
        if (!$.isArray(msgs)) {
            this.addMsg(msgs);
            return;
        }
        for (var i = 0; i < msgs.length; i++) {
            talks_id = msgs[i].talks_id;
            group_key = "p2p-" + talks_id;
            if (!this.msgs[group_key]) {
                this.msgs[group_key] = [];
            }
            this.msgs[group_key].push(msgs[i]);
        }
        ;
    };

    Cache.prototype.addMsg = function (msg) {
        var talks_id, group_key;
        talks_id = msg.talks_id;
        group_key = "p2p-" + talks_id;
        if (!this.msgs[group_key]) {
            this.msgs[group_key] = [];
        }
        this.msgs[group_key].push(msg);
    };

    Cache.prototype.addMsgsByReverse = function (msgs) {
        var talks_id, group_key;
        for (var i = 0; i < msgs.length; i++) {
            talks_id = msgs[i].talks_id;
            group_key = "p2p-" + talks_id;
            if (!this.msgs[group_key]) {
                this.msgs[group_key] = [];
            }
            this.msgs[group_key].unshift(msgs[i]);
        }
        ;
    };

    //系统消息
    Cache.prototype.setSysMsgs = function (data) {
        this.sysMsgs = data;
    };

    Cache.prototype.getSysMsgs = function (data) {
        return this.sysMsgs;
    };

    //自定义系统消息
    Cache.prototype.addCustomSysMsgs = function (data) {
        for (var i = 0; i < data.length; i++) {
            this.customSysMsgs.push(data[i]);
        }
        ;
    };

    Cache.prototype.deleteCustomSysMsgs = function () {
        this.customSysMsgs = [];
    };

    Cache.prototype.getCustomSysMsgs = function (data) {
        return this.customSysMsgs;
    };

    // 系统消息计数
    Cache.prototype.getSysMsgCount = function (value) {
        return this.sysMsgCount;
    };

    Cache.prototype.setSysMsgCount = function (value) {
        this.sysMsgCount = value;
    };

    Cache.prototype.addSysMsgCount = function (value) {
        this.sysMsgCount = this.sysMsgCount + value;
    };


    /**
     * 历史消息
     * @return {Array}    
     */

    Cache.prototype.getMsgs = function (id) {
        var group_msg_key = 'p2p-' + id;
        if (!!this.msgs[group_msg_key]) {
            return this.msgs[group_msg_key];
        } else {
            return [];
        }
    };

    /**
     * 离线消息处理
     * @param {Array} msgs 
     */
    Cache.prototype.addOfflineMsgs = function (msgs) {
        for (var i = msgs.length - 1; i >= 0; i--) {
            if (/text|image|file|audio|video|geo|custom|notification/i.test(msgs[i].type)) {
                this.addMsgs(msgs[i]);
            } else {
                continue;
            }
        }
        ;
    };

    Cache.prototype.setMutelist = function (data) {
        this.mutelist = data;
    };

    Cache.prototype.getMutelist = function (data) {
        return this.mutelist;
    };

    Cache.prototype.inMutelist = function (account) {
        for (var i = this.mutelist.length - 1; i >= 0; i--) {
            if (this.mutelist[i].account == account) {
                return true;
            }
        }
        ;
        return false;
    };

    Cache.prototype.addToMutelist = function (data) {
        this.mutelist.push(data);
    };

    Cache.prototype.removeFromMutelist = function (account) {
        for (var i = this.mutelist.length - 1; i >= 0; i--) {
            if (this.mutelist[i].account == account) {
                this.mutelist.splice(i, 1);
                return true;
            }
        }
        ;
        return false;
    };
    return Cache;
})();

