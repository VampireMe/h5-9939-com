/**
 * 公告列表
 */
var v=1;
        var notice = {
            init: function () {
                this.noticle_data(1);
//                this.initNode();
//                this.clickEvnt();
                this.rollEvent();
            },
            initNode: function(){
//                this.$pager = $("#pager");
            },
            clickEvnt:function(){
              this.$pager.on('click', this.showDialog.bind(this));  
            },
            rollEvent:function(){
                $(window).on('scroll',this.rollLoading.bind(this));
            },
            changepage: function () {
                $(".loading").hide();
            },
            noticle_data:function(page){
                var data = {
                            'client': '1',
                            'page': page
                        };
                var that = this;
                japp.ajax.call('news.getNoticeList', {
                    'data': data,
                    'beforeSend': function () {},
                    'success': function (ret) {
                        var html='';
                        if(ret.code==200){
                            that.changepage();
                            $("#noticePage").val(ret.data.page);
                            $.each(ret.data.list, function(i,val){
                              var time = japp.helper.date('Y-m-d H:i:s',val.createtime);
                            html +='<a href="/patients/views/news/notice_detail.html?id='+val.id+'"><h3>'+val.description+'</h3><p>'+time+'</p></a>';
                        });
                        $(".notice").append(html);
                        }else{
                            return false;
                        }
                    },
                    error: function () {
                        console.log('请求失败，请重试');
                    }
                });
            },
            showDialog: function () {
                var pages = $("#noticePage").val();
                this.noticle_data(parseInt(pages)+1);
            },
            rollLoading:function(){
              var pages = $("#noticePage").val();
              // 当滚动到最底部以上100像素时， 加载新内容
		if(japp.helper.checkIsScrollToBottom && pages==v){
                    v=v+1;
                    this.noticle_data(parseInt(pages)+1);
                }
            },
        }
        notice.init();


