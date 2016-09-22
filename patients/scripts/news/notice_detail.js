/**
 * 公告
 */

var notice_detail = {
	init:function(){
	   this.noticle_detail();
	},
	changepage:function(info){
		info.createtime = japp.helper.date('Y-m-d H:i:s',info.createtime);
                if(info.content==null){
                    info.content = '';
                }
		$(".titl").render(info);
                $(".datc").render(info);
                $(".arle").render(info);
                $(".loading").hide();
                $(".maincontent").show();
	},
	noticle_detail:function(){
		var id = japp.helper.getQueryParam('id');
		var data ={
			'id': id,
		};
		var that = this;
		japp.ajax.call('news.noticeDetail',{
			'data': data,
			'beforeSend': function () {},
			'success': function (ret) {
				if(ret.code==200){
					var symptominfo = ret.data;
					that.changepage(symptominfo);
				}else{
					return false;
				}
			},
			error: function () {
				console.log('请求失败，请重试');
			}
		});
	},
}
notice_detail.init();

