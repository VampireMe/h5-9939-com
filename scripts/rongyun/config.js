(function() {
    // 配置
    var envir = 'online';
    var configMap = {
        test: {
            appkey: 'fe416640c8e8a72734219e1847ad2547',
            url:'https://apptest.netease.im'
        },
        pre:{
    		appkey: '45c6af3c98409b18a84451215d0bdd6e',
    		url:'http://preapp.netease.im:8184'
        },
        online: {
            appkey: '54e43d5b013e65f64d78cc3d15dd9a4d',
            url:'http://api.server.9939.com/'
        }
    };
    window.CONFIG = configMap[envir];
}())