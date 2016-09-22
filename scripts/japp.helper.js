(function () {
    var helper = {
        //与原生程序交互用
        _protocol: "jiujiu://",
        //----------------------------------------------
        //函数名：setCurrEnvironment
        //说  明：设置当前的运行环境参数,ios or android
        //----------------------------------------------
        setCurrEnvironment: function (envFlag) {
            if (envFlag) {
                japp.store.set("CurrEnvironment", envFlag.toLowerCase(), 24 * 3600);
            } else {
                japp.store.set("CurrEnvironment", "", 24 * 3600);
            }
        },
        //----------------------------------------------
        //函数名：getCurrEnvironment
        //说  明：获取当前的环境参数,ios or android
        //----------------------------------------------
        getCurrEnvironment: function () {
            return japp.store.get("CurrEnvironment");
        },
        //----------------------------------------------
        //函数名：setReferrer
        //说  明：设置来源URL地址
        //----------------------------------------------
        setReferrer: function () {
            var pageName = this.getPageName();
            if (!this.in_array(pageName, ['reg', 'login'])) {
                japp.store.setSession('referrer', window.location.href);
            }
        },
        //----------------------------------------------
        //函数名：getReferrer
        //说  明：获取来源URL地址
        //----------------------------------------------
        getReferrer: function () {
            return japp.store.getSession('referrer');
        },
        /**
         * 跳转页面,只需要写页面名即可不用写文件扩展名
         * 参数1 : 页面名称 back() 后退
         * 参数2 : 参数对象 {"uid":1,"pid":2}
         */
        gotoPage: function () {
            var pageName = arguments[0] || null;
            var params = arguments[1] || null;
            if (pageName != "" && pageName != null) {
                if (pageName == "back()" || pageName == ":back()") {
                    if (pageName == "back()") {
                        window.history.back();
                    } else if (pageName == ":back()") {
                        window.history.back();
                        window.parent.history.back();
                    }
                    return;
                }
                var params_str = "";
                if (params != null) {
                    params_str = "?";
                    if (typeof params == "object") {
                        for (var i in params) {
                            params_str += i.trim() + "=" + params[i] + "&";
                        }
                        params_str = params_str.substring(0, params_str.length - 1);
                    }
                }
                var env_effect = true;
                if (pageName.indexOf("(") == 0 && pageName.lastIndexOf(")") > 0) {
                    //不受环境变量影响
                    env_effect = false;
                    pageName = pageName.replace(/\(|\)/g, "");
                }
                if (this.getCurrEnvironment() == "ios" && env_effect) {
                    window.location.href = this._protocol + pageName;
                } else if (this.getCurrEnvironment() == "android" && env_effect) {
                    switch (pageName) {
                        case "login":
                            //通过安卓抛出的对象调用相关的登录方法
//                            window.androidObj.login();
                            break;
                    }
                } else {
                    switch (pageName) {
                        case "login":
                            pageName = "/login";
                            break;
                    }
                    window.location.href = pageName + ".html" + params_str;
                }
            }
        },
        //获取url中指定参数
        getQueryParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return (r[2]);
            return null;
        },
        //获取页面名称不带后缀
        getPageName: function () {
            var a = location.href;
            var b = a.split("/");
            var c = b.slice(b.length - 1, b.length).toString(String).split(".");
            return c.slice(0, 1).toString();
        },
        // 将数组转化为json格式字符串
        toJson: function (data) {
            // body...
            var json = [];
            for (var i in data) {
                var v = String(data[i]);
                v = v.replace(/['"]/ig, '“');
                var tmp = '"' + i + '":"' + v + '"';
                json.push(tmp);
            }
            ;
            return '{' + json.join(',') + '}';
        },
        //判断变量、数组、对象是否为空
        empty: function (v) {
            switch (typeof v) {
                case 'undefined' :
                    return true;
                case 'string' :
                    if (v.trim().length == 0)
                        return true;
                    break;
                case 'boolean' :
                    if (!v)
                        return true;
                    break;
                case 'number' :
                    if (0 === v)
                        return true;
                    break;
                case 'object' :
                    if (null === v)
                        return true;
                    if (undefined !== v.length && v.length == 0)
                        return true;
                    for (var k in v) {
                        return false;
                    }
                    return true;
                    break;
            }
            return false;
        },
        //----------------------------------------------
        //函数名：checkIsLogged
        //说  明：获取请求的地址
        //----------------------------------------------
        checkIsLogged: function (forceLogin) {
            var uid = japp.store.get('uid');
            var token = japp.store.get('token');
            if (uid != null && token != null) {
                return true;
            } else {
                if (forceLogin) {
                    this.gotoPage("login");
                } else {
                    return false;
                }
            }
        },
        //----------------------------------------------
        //函数名：checkIsScrollToBottom
        //说  明：检查页面是否滚到底
        //----------------------------------------------
        checkIsScrollToBottom: function () {
            var scrollTop = $(window).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(window).height();
            if (scrollTop + windowHeight >= scrollHeight - 50) {
                return true;
            }
            return false;
        },
        //----------------------------------------------
        //函数名：checkIsScrollToTop
        //说  明：检查页面是否滚到顶
        //----------------------------------------------
        checkIsScrollToTop: function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop <= 50) {
                return true;
            }
            return false;
        },
        // 判断字符串是否在数组中
        in_array: function (str, arr) {
            // body...
            var flag = false;
            for (var k in arr) {
                if (arr[k] == str) {
                    flag = true;
                    break;
                }
            }
            return flag;
        },
        /**
         * 和PHP一样的时间戳格式化函数
         * @param  {string} format    格式
         * @param  {int}    timestamp 要格式化的时间 默认为当前时间
         * @return {string}           格式化的时间字符串
         */
        date: function (format, timestamp) {
            var ret;
            var a, jsdate = ((timestamp) ? (String(timestamp).length>10?new Date(timestamp/1000*1000):new Date(timestamp * 1000)): new Date());
            var pad = function (n, c) {
                if ((n = n + "").length < c) {
                    return new Array(++c - n.length).join("0") + n;
                } else {
                    return n;
                }
            };
            var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var txt_ordin = {1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st"};
            var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var f = {
                // Day
                d: function () {
                    return pad(f.j(), 2)
                },
                D: function () {
                    return f.l().substr(0, 3)
                },
                j: function () {
                    return jsdate.getDate()
                },
                l: function () {
                    return txt_weekdays[f.w()]
                },
                N: function () {
                    return f.w() + 1
                },
                S: function () {
                    return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
                },
                w: function () {
                    return jsdate.getDay()
                },
                z: function () {
                    return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
                },
                // Week
                W: function () {
                    var a = f.z(), b = 364 + f.L() - a;
                    var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
                    if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
                        return 1;
                    } else {
                        if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
                            nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                            return date("W", Math.round(nd2.getTime() / 1000));
                        } else {
                            return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                        }
                    }
                },
                // Month
                F: function () {
                    return txt_months[f.n()]
                },
                m: function () {
                    return pad(f.n(), 2)
                },
                M: function () {
                    return f.F().substr(0, 3)
                },
                n: function () {
                    return jsdate.getMonth() + 1
                },
                t: function () {
                    var n;
                    if ((n = jsdate.getMonth() + 1) == 2) {
                        return 28 + f.L();
                    } else {
                        if (n & 1 && n < 8 || !(n & 1) && n > 7) {
                            return 31;
                        } else {
                            return 30;
                        }
                    }
                },
                // Year
                L: function () {
                    var y = f.Y();
                    return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
                },
                //o not supported yet
                Y: function () {
                    return jsdate.getFullYear()
                },
                y: function () {
                    return (jsdate.getFullYear() + "").slice(2)
                },
                // Time
                a: function () {
                    return jsdate.getHours() > 11 ? "pm" : "am"
                },
                A: function () {
                    return f.a().toUpperCase()
                },
                B: function () {
                    // peter paul koch:
                    var off = (jsdate.getTimezoneOffset() + 60) * 60;
                    var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
                    var beat = Math.floor(theSeconds / 86.4);
                    if (beat > 1000)
                        beat -= 1000;
                    if (beat < 0)
                        beat += 1000;
                    if ((String(beat)).length == 1)
                        beat = "00" + beat;
                    if ((String(beat)).length == 2)
                        beat = "0" + beat;
                    return beat;
                },
                g: function () {
                    return jsdate.getHours() % 12 || 12
                },
                G: function () {
                    return jsdate.getHours()
                },
                h: function () {
                    return pad(f.g(), 2)
                },
                H: function () {
                    return pad(jsdate.getHours(), 2)
                },
                i: function () {
                    return pad(jsdate.getMinutes(), 2)
                },
                s: function () {
                    return pad(jsdate.getSeconds(), 2)
                },
                //u not supported yet

                // Timezone
                //e not supported yet
                //I not supported yet
                O: function () {
                    var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
                    if (jsdate.getTimezoneOffset() > 0)
                        t = "-" + t;
                    else
                        t = "+" + t;
                    return t;
                },
                P: function () {
                    var O = f.O();
                    return (O.substr(0, 3) + ":" + O.substr(3, 2))
                },
                //T not supported yet
                //Z not supported yet

                // Full Date/Time
                c: function () {
                    return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
                },
                //r not supported yet
                U: function () {
                    return Math.round(jsdate.getTime() / 1000)
                }
            };

            return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
                if (t != s) {
                    // escaped
                    ret = s;
                } else if (f[s]) {
                    // a date function exists
                    ret = f[s]();
                } else {
                    // nothing special
                    ret = s;
                }
                return ret;
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
            return {'name': browser.appname, 'version': browser.version};
        }
    };
    japp.add('helper', helper);
}());


//写cookies 
function setCookie(name, value) {
    japp.store.set(name, value, 24 * 3600);
}

//读取cookies 
function readCookie(name) {
    return japp.store.get(name);
}

//删除cookies 
function delCookie(name) {
    japp.store.remove(name);
}

//跳转到某页
function gotoPage(pagename) {
    japp.helper.gotoPage(pagename);
}

