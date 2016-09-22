var user = {
   init : function(){
       this.user_init();
       this.user_render();
       this.addEvent();
   },
   user_init: function(){
       japp.store.set('username','zby@80rich.com',1000000);
       japp.store.set('password','123456',1000000);
       japp.store.set('uid','200003',1000000);
       japp.store.set('nickname','轻舞飞扬',1000000);
       japp.store.set('gender','1',1000000);
       japp.store.set('mobile','110119120',1000000);
       japp.store.set('pic','/200910/200003_avatar_middle.jpg',1000000);
   },
   dom:{
       person:$('.person'),
       loading:$('.loading'),
       maincontent:$('.maincontent'),
   },
   userInfo:{
       uid:japp.store.get('uid'),
       nickname:japp.store.get('nickname'),
       pic:'http://home.9939.com/upload/pic'+japp.store.get('pic'),
   },
   user_render : function(){
       this.dom.person.render(this.userInfo);
       this.boadLoading();
   },
   addEvent:function(){
       this.dom.person.on('click',this.personJump);
   },
   personJump : function(){
       window.location.href = '/patients/views/user/personal.html';
   },
   boadLoading:function(){
        this.dom.loading.hide();
        this.dom.maincontent.show();
   }
}
user.init();
