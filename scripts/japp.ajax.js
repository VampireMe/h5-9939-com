//-----------------------------------------------------------------------------
//
//作    者：王普强
//
//创建日期：2016.07.29
//
//文件说明：页面请求相关
//
//-----------------------------------------------------------------------------
(function () {
    //----------------------------------------------
    //函数名：ajax
    //参数： opt json格式{'data':{"filename":filename,"userid":userid,"token":token,"from":from},'callback':func}
    //说  明：发送ajax请求
    //----------------------------------------------
    function ajax(url, opt) {
        var defaults = {
            url: url,
            type: "POST",
            dataType: "json",
            data: opt['data'],
            async: true,
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (ret) {
            },
            error: function (ret) {
            }
        }
        var ajax_params = $.extend({}, defaults, opt || {});
        $.ajax(ajax_params);
    }
    var aj = {
        _api_url: "http://api.server.9939.com/",
        //----------------------------------------------
        //函数名：getApiUrl
        //说  明：获取请求的地址
        //----------------------------------------------
        getApiUrl: function (method, params) {
            params = params || {};
            var params_str = '';
            if (typeof (params) == "object") {
                var queryArr = [];
                for (var i in params) {
                    queryArr.push(i + "=" + encodeURIComponent(params[i]));
                }
                params_str = queryArr.join("&");
            }
            if ($.trim(params_str).length > 0) {
                params_str = '&' + params_str;
            }
            return this._api_url + "?method=" + method + params_str;
        },
        //----------------------------------------------
        //函数名：call
        //说  明：ajax调用
        //参  数:
        //method:请求的方法名称 例如:ask.getlist
        //opt: ajax请求的参数. 格式{'data':{"filename":filename,"userid":userid,"token":token,"from":from},'success':func}
        //params:用于拼装url的扩展参数
        //----------------------------------------------
        call: function (method, opt, params) {
            method = method || {};
            var url = this.getApiUrl(method, params);
            ajax(url, opt);
        }
    }
    japp.add("ajax", aj);
}());
