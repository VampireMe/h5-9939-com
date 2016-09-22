var personal = {
   init : function(){
    this.user_render();
   },
   dom:{
       head:$('.head'),
       caninf:$('.caninf'),
       loading:$('.loading'),
       maincontent:$('.maincontent'),
   },
   userInfo:{
       uid:japp.store.get('uid'),
       nickname:japp.store.get('nickname'),
       pic:'http://home.9939.com/upload/pic'+japp.store.get('pic'),
       mobile:japp.store.get('mobile'),
       gender:japp.store.get('gender'),
   },
   links:{
    backlink:'/patients/views/user/center.html',
   },
   user_render : function(){
       this.dom.head.render(this.links);
       this.userInfo.gender = (this.userInfo.gender == 1) ? '男' : '女';
       this.dom.caninf.render(this.userInfo);
       this.boadLoading();
   },
   boadLoading:function(){
        this.dom.loading.hide();
        this.dom.maincontent.show();
   }
}
personal.init();
