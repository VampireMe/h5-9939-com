var SDKBridge = function (_ctrl, _cache, opt) {

    var defaults = {};

    //默认传的配置项
    opt = $.extend({}, defaults, opt || {});

    //父窗体
    this.ctrl = _ctrl;

    //保存通讯的缓存对象
    this.cache = _cache;

    var msg = function (message) {
        
        this.parse = function () {
            var _msg = {};
            _msg.time = message.sentTime;
            _msg.msg_id = message.messageUId;
            _msg.content = message.content.content;
            _msg.from = message.senderUserId;
            _msg.to = message.targetId;
            return _msg;
        };
    };

    var RIM_Handler = {
        onChanged: function (status) {
            switch (status) {
                //正在链接
                case RongIMLib.ConnectionStatus.CONNECTING:
                    console.log('正在链接');
                    break;
                    //链接成功
                case RongIMLib.ConnectionStatus.CONNECTED:
                    console.log('链接成功');
                    break;
                    //重新链接
                case RongIMLib.ConnectionStatus.DISCONNECTED:
                    console.log('断开连接');
                    break;
                    //其他设备登录
                case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                    console.log('其他设备登录');
                    break;
                    //网络不可用
                case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                    console.log('网络不可用');
                    break;
            }
        },
        onReceived: function (message) {
            // 判断消息类型
            switch (message.messageType) {
                case RongIMClient.MessageType.TextMessage:
                    var t_msg = new msg(message);
                    var f_msg = t_msg.parse();
                    f_msg.type = 'text';
                    opt['onreceived'].apply(this, [f_msg]);
                    console.log(message);
                    break;
                case RongIMClient.MessageType.VoiceMessage:
                    // 对声音进行预加载                
                    // message.content.content 格式为 AMR 格式的 base64 码
                    RongIMLib.RongIMVoice.preLoaded(message.content.content);
                    break;
                case RongIMClient.MessageType.ImageMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.DiscussionNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.LocationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.RichContentMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.DiscussionNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.InformationNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.ContactNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.ProfileNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.CommandNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.CommandMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.UnknownMessage:
                    // do something...
                    break;
                default:
                    // 自定义消息
                    // do something...
            }
        }

    };
    this.init = function () {
        this.pre_connect(opt);
        this.nim = RongIMClient.getInstance();
        this.nim.getHistoryMessages = function (talks_id, offset, size, opt) {
            var data = {'talks_id': talks_id, 'offset': offset, 'size': size};
            japp.ajax.call('ask.gettalksdetail', {
                'data': data,
                'beforeSend': function () {
                    if (typeof (opt['onBefore']) == 'function') {
                        opt['onBefore'].apply(this, [this]);
                    }
                },
                'success': function (ret) {
                    if (typeof (opt['onSuccess']) == 'function') {
                        opt['onSuccess'].apply(this, [ret]);
                    }
                },
                error: function (err) {
                    if (typeof (opt['onError']) == 'function') {
                        opt['onError'].apply(this, [err]);
                    }
                }
            });
        };
    };
    this.pre_connect = function (opt) {
        RongIMClient.init("n19jmcy59ndu9");
        var token = opt['token']; //'KegwgGw/6GleG6LBjLqsVRKPhSqSI2HF++svq14OzaFhzdT6qHMgLb0hJAuIL+ONAerYns/2nrVa0XQvzUk9cw==';
        // 设置连接监听状态 （ status 标识当前连接状态）
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: RIM_Handler.onChanged.bind(this)
        });
        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: RIM_Handler.onReceived.bind(this)
        });
        // 连接融云服务器。
        RongIMClient.connect(token, {
            onSuccess: function (userId) {
                console.log("Login successfully." + userId);
            },
            onTokenIncorrect: function () {
                console.log('token无效');
            },
            onError: function (errorCode) {
                var info = '';
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                        info = '不可接受的协议版本';
                        break;
                    case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                        info = 'appkey不正确';
                        break;
                    case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                        info = '服务器不可用';
                        break;
                }
                console.log(errorCode);
            }
        });
    };
    this.init();
};

SDKBridge.prototype.sendMessage = function (msg, callback) {
    var opt = {
        onSuccess: function (message) {
            if (typeof (callback['onSuccess']) == 'function') {
                callback['onSuccess'].apply(this, [message]);
            }
        },
        onError: function (errorcode, message) {
            var info = '';
            switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                    info = '超时';
                    break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                    info = '未知错误';
                    break;
                case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                    info = '在黑名单中，无法向对方发送消息';
                    break;
                case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                    info = '不在讨论组中';
                    break;
                case RongIMLib.ErrorCode.NOT_IN_GROUP:
                    info = '不在群组中';
                    break;
                case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                    info = '不在聊天室中';
                    break;
                default :
                    info = x;
                    break;
            }
            if (typeof (callback['onError']) == 'function') {
                callback['onError'].apply(this, [info]);
            }

        }
    };
    //默认传的配置项
    var conversationtype = RongIMLib.ConversationType.PRIVATE;
    var message = {};
    switch (msg.type) {
        case 'text':
        {
            message = new RongIMLib.TextMessage({content: msg.content});
            break;
        }
        case 'image':
        {
            break;
        }

    }
    this.nim.sendMessage(conversationtype, msg.to, message, opt);
};

SDKBridge.prototype.getHistoryMessages = function (talks_id, offset, size, callback) {
    var opt = {
        onSuccess: function (ret) {
            if (typeof (callback['onSuccess']) == 'function') {
                callback['onSuccess'].apply(this, [ret]);
            }
        },
        onError: function (error) {
            if (typeof (callback['onError']) == 'function') {
                callback['onError'].apply(this, [error]);
            }
        }
    };
    this.nim.getHistoryMessages(talks_id, offset, size, opt);
};