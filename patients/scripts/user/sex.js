var user = {
   init : function(){
       this.user_render();
       this.addEvent();
   },
   dom:{
       head:$('.head'),
       sex:$('.sex'),
       quit:$('.quit'),
       loading:$('.loading'),
       maincontent:$('.maincontent'),
   },
   userInfo:{
       uid:japp.store.get('uid'),
       gender:japp.store.get('gender'),
   },
   links:{
      backLink:'/patients/views/user/personal.html',
   },
   user_render : function(){
       this.dom.head.render(this.links);
       this.dom.sex.render(this.sexClass());
       this.boadLoading();
   },
   sexClass:function(){
      var sexClass = {boy:'',girl:''};
      if(this.userInfo.gender == 1){
          sexClass.boy = 'curs';
        }else{
          sexClass.girl = 'curs';
        }
        return sexClass;
   },
   addEvent:function(){
       $('.quit').on('click',this.subSex.bind(this));
   },
   subSex:function(){
      var new_sex = parseInt($('.curs').attr('class-data'));
      if(new_sex == parseInt(this.userInfo.gender)){
        window.location.href = '/patients/views/user/personal.html';
      }else{
        var data = {userid:this.userInfo.uid,sex:new_sex};
        this.sexAjax(data);
      }
   },
   sexAjax:function(data){
      japp.ajax.call(
        'userp.sex',
        {
          'data':data,
          'beforeSend':function(){},
          'success':function(meg){
            if(meg.code == 200){
              alert(meg.message);
              japp.store.set('gender',data.sex,10000);
              window.location.href = '/patients/views/user/personal.html';
            }else{
              alert(meg.message);
            }
          },
          'error':function(){},
        }
        );
   },
   boadLoading:function(){
        this.dom.loading.hide();
        this.dom.maincontent.show();
   }
}
user.init();
