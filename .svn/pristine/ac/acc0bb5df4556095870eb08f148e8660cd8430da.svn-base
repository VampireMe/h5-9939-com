var AppUI = (function () {

    var _appUI = function (_loginuser) {
        this.curr_userinfo = _loginuser;
    }
    _appUI.prototype = {
        /**
         * 创建聊天容器
         */
        buildChatContainer: function () {
            var html = [];
            html.push('<div id="div_chat_container" class="bodb">');
            html.push('<article class="head fixhe"><a href="javascript:" id="btn_close" name="btn_close"></a>问题详情</article>');
            html.push('<article class="commu"  id="j-chatContent">');
            html.push('    <p class="tips">医生的回复仅为建议，具体诊疗请前往医院</p>');
            html.push('    <p class="ptim">2016-6-3 12:32</p>');
            html.push('</article>');
            html.push('<article class="procom">');
            html.push('    <div class="vobla">');
            html.push('        <a class="voice"></a><input type="text" id="j-messageText" name="j-messageText" value="" />');
            html.push('        <div class="disn">按住 说话</div>');
            html.push('        <a class="adco j-send" id="j-sendImg"></a><a class="send disn j-send" id="j-sendBtn">发送</a>');
            html.push('    </div>');
            html.push('    <div class="vlis disn">');
            html.push('        <a><div></div><p>拍照</p></a>');
            html.push('        <a><div></div><p>照片</p></a>');
            html.push('        <a><div></div><p>清除记录</p></a>');
            html.push('    </div>');
            html.push('</article>');
            html.push('</div>');
            return html.join('');
        },
        /**
         * 当前会话聊天面板UI
         */
        buildChatContentUI: function (talks_id, cache) {
            var msgHtml = "",
                    msgs = cache.getMsgs(talks_id);
            if (msgs.length === 0) {
                var html = [];
                html.push('<div class="oubra"></div>');
                html.push('<article class="inque">');
                html.push('    <h3>提示</h3><p>由于医生是在工作期间回答您的问题，可能短时间无法应答，可以咨询经验丰富的值班医生为您解答。</p>');
                html.push('    <a href="">咨询值班医生</a>');
                html.push('</article>');
                msgHtml = html.join('');
            } else {
                for (var i = 0, l = msgs.length; i < l; ++i) {
                    var message = msgs[i],
                            user = cache.getUserById(message.from);
                    //消息时间显示
                    if (i == 0) {
                        msgHtml += this.makeTimeTag(message.time);
                    } else {
                        if (message.time - msgs[i - 1].time > 5 * 60 * 1000) {
                            msgHtml += this.makeTimeTag(message.time);
                        }
                    }
                    msgHtml += this.makeChatContent(message, user);
                }
            }
            return msgHtml;
        },
        /**
         * 更新当前会话聊天面板UI
         */
        updateChatContentUI: function (msg, cache) {
            var lastItem = $("#j-chatContent .item").last(),
                    msgHtml = "",
                    user = cache.getUserById(msg.from);
            if (lastItem.length == 0) {
                msgHtml += this.makeTimeTag(msg.time);
            } else {
                if (msg.time - parseInt(lastItem.attr('data-time')) > 5 * 60 * 1000) {
                    msgHtml += this.makeTimeTag(msg.time);
                }
            }
            msgHtml += this.makeChatContent(msg, user);
            return msgHtml;
        },
        /**
         * 通用消息内容UI
         */
        makeChatContent: function (message, user) {
            var msgHtml = '';
            //聊天消息
            var type = message.type,
                    avatar = user.avatar;
            var curr_userid = this.curr_userinfo.uid;
            var class_name = (user.uid == curr_userid) ? '' : 'leftb';
            if (type === "tip") {
                msgHtml = '<p class="u-notice tc item"><span class="radius5px">' + this.getMessage(message) + '</span></p>';
            } else {
                msgHtml = [
                    '<div class="perin ' + class_name + '">',
                    '   <a href=""><img src="' + avatar + '" alt=""></a>',
                    '   <div>',
                    '       <p>' + this.getMessage(message) + '</p>',
                    '   </div>',
                    '</div>'
                ].join('');
            }
            return msgHtml;
        },
        /**
         * 系统消息
         */
        buildSysMsgs: function (data, cache) {
            var html = "";
            return html;
        },
        // 自定义系统通知
        buildCustomSysMsgs: function (data, cache) {
            var html = "";
            return html;
        },
        //聊天消息中的时间显示
        makeTimeTag: function (time) {
            return  '<p class="ptim">' + this.makeTimeTip(time) + '</p>';
        },
        makeTimeTip: function (time) {
            var str_date = japp.helper.date('Y-m-d H:i', time);
            return str_date;
        },
        /**
         * 会话列表消息
         * @param  {object} msg 消息
         * @return {string} str
         */
        getMessage: function (msg) {
            var str = '';
            switch (msg.type) {
                case 'text':
                    var re = /(http:\/\/[\w.\/]+)(?![^<]+>)/gi; // 识别链接
                    str = this.escape(msg.content);
                    str = str.replace(re, "<a href='$1' target='_blank'>$1</a>");
                    break;
                case 'image':
                    break;
                case 'file':
                    break;
                case 'tip':
                    str = "这是一条提醒消息";
                    break;
                case 'video':
                    break;
                case 'audio':
                    break;
                case 'geo':
                    str = sentStr + '一条[地理位置]消息';
                    break;
                case 'custom':
                    break;
                default:
                    break;
            }
            return str;
        },
        escape: function (_content) {
            var _reg = /<br\/?>$/,
                    _map = {
                        r: /\<|\>|\&|\r|\n|\s|\'|\"/g,
                        '<': '&lt;', '>': '&gt;', '&': '&amp;', ' ': '&nbsp;',
                        '"': '&quot;', "'": '&#39;', '\n': '<br/>', '\r': ''
                    };
            var encode = function (_map, _content) {
                _content = '' + _content;
                if (!_map || !_content) {
                    return _content || '';
                }
                return _content.replace(_map.r, function ($1) {
                    var _result = _map[!_map.i ? $1.toLowerCase() : $1];
                    return _result != null ? _result : $1;
                });
            };
            _content = encode(_map, _content);
            return _content.replace(_reg, '<br/><br/>');
        }
    };
    return _appUI;
}());


