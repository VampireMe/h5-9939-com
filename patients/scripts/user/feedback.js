var feedback = {
   init : function(){
       this.html_render();
       this.add_event();
   },
   dom:{
       head:$('.head'),
       gaite:$('.gaite'),
       subs:$('.subs'),
       loading:$('.loading'),
       maincontent:$('.maincontent'),
   },
    userInfo: {
        uid: japp.store.get('uid'),
        username: japp.store.get('username'),
    },
   links:{
      backlink: '/patients/views/user/center.html',
   },
   html_render : function(){
       this.dom.head.render(this.links);
       this.body_loading();
   },
   add_event:function(){
       this.dom.subs.on('click',this.feedback_subs.bind(this));
   },
   feedback_subs:function(){
      if(this.get_feedback_confirm()){
        alert('五分钟之内已经提交过意见！');
        return false;
      }
      //获取 feedback contact
      var content = $('.textarea').val();
      var contact = $('.txco').val();
      //验证 数据的合法性
      if(content.length < 20){
        alert('输入字数不应少于20字！');
        return false;
      }
      if(!(/^1[34578]\d{9}$/.test(contact))){
         alert("手机号码有误，请重填"); 
         return false; 
      }
      //ajax 提交数据到后台
      var data = {'userid':this.userInfo.uid,'username':this.userInfo.username,'content':content,'contact':contact};
      this.feedback_ajax(data,this);
   },
   feedback_ajax:function(data,obj_this){
      japp.ajax.call(
        'feedback.add',
        {
          'data':data,
          'beforeSend':function(){},
          'success':function(res){
            alert(res.message);
            obj_this.set_feedback_confirm();
            window.location.href = obj_this.links.backlink;
          },
          'error':function(){},
        }
        );
   },
   set_feedback_confirm:function(){
      japp.store.set('feedback_confirm',1,5000);
   },
   get_feedback_confirm:function(){
      return japp.store.get('feedback_confirm');
   },
   body_loading:function(){
        this.dom.loading.hide();
        this.dom.maincontent.show();
   }
}
feedback.init();
