var mobile = {
   init : function(){
       this.mobile_render();
       this.add_event();
   },
   dom:{
       head:$('.head'),
       indis:$('.indis'),//手机号
       checo:$('.checo input:first'),//验证码
       getcheco:$('.getcheco'),//验证码
       subs:$('.subs'),//提交按钮
       messa:$('.messa'),//绑定成功
       loading:$('.loading'),
       maincontent:$('.maincontent'),
   },
   userInfo:{
       uid:japp.store.get('uid'),
       nickname:japp.store.get('nickname'),
       pic:'http://home.9939.com/upload/pic'+japp.store.get('pic'),
   },
   binding:{
       title:'绑定手机号',
       placeholder:'手机号',
       subsvalue:'绑 定'
   },
   modify:{
      title:'修改手机号',
      placeholder:'新手机号',
      subsvalue:'确 定'
   },
   links:{
       backlink:'/patients/views/user/personal.html',
   },
   mobile_render : function(){
        var uid = this.userInfo.uid;
        var that = this;
        that.dom.head.render(that.links);
        japp.ajax.call(
          'userp.isBindMobile',
          {
            'data':{userid:uid},
            'success':function(res){
              if(res.code == 200){
                that.dom.maincontent.render(that.binding);
              }else{
                that.dom.maincontent.render(that.modify);
              }
              that.boad_loading();
            }
          }
          );
   },
   add_event:function(){
      this.dom.maincontent.on('click','.getcheco',this.getcheco.bind(this));
   },
   getcheco:function(){
    var mobile = $('.indis input:first').val();
    var that = this;
    var ismobile = this.is_mobile(mobile);
    if(!ismobile){
      alert('手机号格式不正确！');
    }
    japp.ajax.call(
      'userp.bindSmsVerification',{
        'data':{mobile:mobile,userid:that.userInfo.uid},
        'complete':function(){

        },
        'success':function(res){
          if(res.code == 200){
            alert(res.message);
          }else{
            alert(res.message);
          }
        },
      }
      );
   },
   count_down:function(obj){
      // $('.maincontent .getcheco').val();
      var countdown=60; 
          if (countdown == 0) { 
              obj.removeAttribute("disabled");    
              obj.value="获取验证码"; 
              countdown = 60; 
              return;
          } else { 
              obj.setAttribute("disabled", true); 
              obj.value="重新发送(" + countdown + ")"; 
              countdown--; 
          } 
      setTimeout(function() { 
          this.count_down(obj) }
          ,1000) 
   },
   is_mobile:function(mobile){
      if(!(/^1[34578]\d{9}$/.test(mobile))){
         return false; 
      }
      return true;
   },
   boad_loading:function(){
        this.dom.loading.hide();
        this.dom.maincontent.show();
   }
}
mobile.init();
