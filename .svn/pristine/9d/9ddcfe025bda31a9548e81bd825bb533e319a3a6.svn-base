// JavaScript Document
$(function(){
	//登录页面input获得焦点
	$('.formst .indis input').keydown(function(){
		$(this).parent().find('a').show();	
	});
	
	var isshow=true;//用于控制全局显示与隐藏
	$(document).click(function(){
		if(isshow){
			var dvalatr=$('.formst .indis a').attr('data-ct');
			if(dvalatr==1){
				$(this).hide();
				$('.formst .indis a').attr('data-ct','0');
			}
		}
		isshow=true;
	});
	$('.formst .indis a').click(function(){
		var dval=$('.formst .indis a').attr('data-ct');
		if(dval==1){
			$(this).hide();
			$(this).prev('input').focus();
		}
		else{
			$(this).hide();
			$(this).prev('input').val('');
			$(this).prev('input').focus();
			
		}
		isshow=false;
	});
	//点击去除a的样式
	$('.seslid a').click(function(){
		$('.seslid a').removeClass('curs');
		$(this).addClass('curs');	
	});
	//选中
	$('.agree div').click(function(){
		if($(this).attr('data-g')==0){
			$(this).removeClass('cusm')	;
			$(this).attr('data-g','1');	
		}
		else{
			
			$(this).addClass('cusm');
			$(this).attr('data-g','0');	
		}
	});
	//其他查找点击展开
	var bo=true;
	$('.find dt').click(function(){
		if(bo){
			$(this).find('div').addClass('cur');
			$(this).nextAll('dd').show();
			bo=false;
		}
		else{
			$(this).find('div').removeClass('cur');
			$(this).nextAll('dd').hide();	
			bo=true;
		}
	});
	//疾病症状点击切换
	$('.sexn a').click(function(){
		var inde=$(this).index();
		$(this).parent('.sexn').find('a').removeClass('curr');	
		$(this).addClass('curr');
		$(this).parent().next('.male').find('.sechoi').removeClass('shay').addClass('disn');
		$(this).parent().next('.male').find('.sechoi').eq(inde).removeClass('disn').addClass('shay');
	});
	/*切换正面背面*/
	var bool=true;
	$('a.fronb').click(function(){
		if($('.mal,.mal_02').is(":visible")){
			if($('.mal').is(':visible')){
				$('.mal').removeClass('shay').addClass('disn');
				$('.mal_02').removeClass('disn').addClass('shay');
				$(this).html('正面');	
			}
			else{
				$('.mal').removeClass('disn').addClass('shay');
				$('.mal_02').removeClass('shay').addClass('disn');
				$(this).html('背面');	
			}
		}	
		else{
			if($('.fem_01').is(':visible')){
				$('.fem_01').removeClass('shay').addClass('disn');
				$('.fem_02').removeClass('disn').addClass('shay');
				$(this).html('正面');	
			}
			else{
				$('.fem_01').removeClass('disn').addClass('shay');
				$('.fem_02').removeClass('shay').addClass('disn');
				$(this).html('背面');	
			}	
		}
	});
	//点击展示男女
//	$('.btns span').click(function(){
//		var cuclic=$(this).attr('class');
//		if(cuclic=='sp_02'){
//			$(this).prev('span').removeClass('sp_01c');
//			$('.btns span.sp_02').addClass('sp_02c');
//			$('.prso').find('div.mal,div.mal_02,div.fem_01,div.fem_02').removeClass('shay').addClass('disn');	
//			$('.fem_01').removeClass('disn').addClass('shay');	
//		}
//		else{
//			$(this).next('span').removeClass('sp_02c');
//			$('.btns span.sp_01').addClass('sp_01c');
//			$('.prso').find('div.mal,div.mal_02,div.fem_01,div.fem_02').removeClass('shay').addClass('disn');	
//			$('.mal').removeClass('disn').addClass('shay');			
//		}	
//	});
	//职位弹出
	$('.yeaid').click(function(){
		$('.oubra,.age').removeClass('disn').addClass('shay');	
	});
	$('.teac').click(function(){
		$('.oubra,.work').removeClass('disn').addClass('shay');	
	});
	$('a.acali,.confo').click(function(){
		$('.oubra,.agint').removeClass('shay').addClass('disn');	
		
	});
//	$('.plav a').click(function(){
//		$('.plav a').removeClass('defs');
//		$(this).addClass('defs');	
//	});
	$('.oubra,.closw,.cancle,.qla p a:last-child').click(function(){
		$('.oubra,.choico,.sio,.agint,.brand,.sio,.tips,.purcha,.share,.inque,.qla').removeClass('shay').addClass('disn');	
		$('body').css('overflow','visible');	
	});
	//订阅
	$('.order').click(function(){
		$('.oubra,.purcha,.share').removeClass('disn').addClass('shay');
	});
	//分享
	$('a.sarl').click(function(){
		$('.oubra,.share').removeClass('disn').addClass('shay');	
	});
	//评价好评
	$('.istis a').click(function(){
		var ind=$(this).index();
		$('.istis a').removeClass('curr1 curr2 curr3');
		$(this).addClass('curr'+parseInt(ind+1));	
		$('.pasat .lapear').removeClass('shay').addClass('disn');
		$('.pasat .lapear').eq(ind).removeClass('disn').addClass('shay');
	});
	$('.lapear a.clie').attr('data_c','1');
	$('.lapear a').click(function(){
		var att=$(this).attr('data_c');
		if(att=='1'){
			$(this).removeClass('clie');	
			$(this).attr('data_c','0');
		}
		else{
			$(this).addClass('clie');	
			$(this).attr('data_c','1');
		}
	});
	//首页向左滚动
	$(window).load(function(){
		$.mCustomScrollbar.defaults.theme="light-2"; //set "light-2" as the default theme
		
		$("#ho,#ho1,#ho2,#ho3").mCustomScrollbar({
			axis:"x",
			advanced:{autoExpandHorizontalScroll:true}
		});
	});
	//点击的时候，滑动关闭
	var bo=true;
	$('.control').click(function(){
		if(bo){
			$('.checkbox').css('background','#53d769');
			bo=false;
		}
		else{
			$('.checkbox').css('background','#fff');
			bo=true;	
		}
			
	});
	//咨询内容 放大缩小文章页
	$('.datc a').click(function(){
		if($(this).hasClass('max')){
			$('.arle p').css('font-size','.34rem');	
		}
		else{
			$('.arle p').css('font-size','.3rem');		
		}	
	});
	//全部科室当前状态
	$('.lasle a').click(function(){
		$('.lasle a').removeClass('curt');
		$(this).addClass('curt');
	});
	//点击收藏
	var bot=true;
	$('.head a.conc').click(function(){
		if(bot){
			$(this).addClass('conch');	
			bot=false;
		}
		else{
			$(this).removeClass('conch');	
			bot=true;	
		}
	});
	//点击赞
	var bol=true;
	$('.cagre a').click(function(){
		if(bol){
			$(this).addClass('agr');	
			bol=false;
		}
		else{
			$(this).removeClass('agr');	
			bol=true;	
		}
	});
	//男女年龄弹层
	$('.conse a.male').click(function(){
		$('.oubra,.sexla').removeClass('disn').addClass('shay');		
	});
	$('.conse a.age').click(function(){
		$('.oubra,.agela').removeClass('disn').addClass('shay');		
	});	
	//向下滑动显示专家
	$(window).scroll(function(){
		if($(this).scrollTop()>216){
			$('.docbg').fadeIn();	
		}	
		else{
			$('.docbg').fadeOut();		
		}
	});
	//点击展开擅长简介
	
	$('.pressu a').click(function(){
		var att=$(this).attr('data_t');
		if(att==1){
			$(this).parents('.pressu').find('p').removeClass('open');
			$(this).removeClass('csmt');
			$(this).attr('data_t','0');
		}
		else{
			$(this).parents('.pressu').find('p').addClass('open');
			$(this).addClass('csmt');
			$(this).attr('data_t','1');	
		}
		
	});
	//语音对话框
	var boc=true;
	$('.vobla a.adco').click(function(){
		if(boc){
			$('.vlis').removeClass('disn').addClass('shay');
			boc=false;	
		}
		else{
			$('.vlis').removeClass('shay').addClass('disn');	
			boc=true;	
		}
		
	});
	var boct=true;
	$('.vobla a.voice').click(function(){
		if(boct){
			$('.vobla input').removeClass('shay').addClass('disn');
			$('.vobla div').removeClass('disn').addClass('shay');
			boct=false;	
		}
		else{
			$('.vobla div').removeClass('shay').addClass('disn');
			$('.vobla input').removeClass('disn').addClass('shay');
			boct=true;	
		}
		
	});
	$('.vobla div').hover(function(){
		$(this).addClass('hover').html('松开 结束');	
	},function(){
		$(this).removeClass('hover').html('按住 说话');	
	});
	
	$('.vobla input').focus(function(){
		$('.vobla a.adco').removeClass('shay').addClass('disn');
		$('.vobla a.send').removeClass('disn').addClass('shay');
		
	});
	$('.vobla input').blur(function(){
		if($(this).val()==''){
			$('.vobla a.adco').removeClass('disn').addClass('shay');
			$('.vobla a.send').removeClass('shay').addClass('disn');	
		}
	});
	//首页新闻轮播
	function rotat(){
		var leng=$('.exc .noni').length;
		
		
	};
	//医生回答，请及时查看
	$('.hansw a').click(function(){
		$('.hansw').slideUp();	
	});
	$('.head a.conc').click(function(){
		$('.hides').fadeIn(1000,function(){
			$(this).fadeOut(3000);	
		});	
	});
	//首页点击切换
	$('.sexn a').click(function(){
		var inde=$(this).index();
		$(this).parent('.sexn').find('a').removeClass('curr');	
		$(this).addClass('curr');
		$(this).parent().next('.male').find('.sechoi').removeClass('shay').addClass('disn');
		$(this).parent().next('.male').find('.sechoi').eq(inde).removeClass('disn').addClass('shay');
	});
	//一级科室一级部位弹出
	$('.heanew b').click(function(){
		$('.oubra,.choico').removeClass('disn').addClass('shay');	
		$('body').css('overflow','hidden');
		
	});
	//疾病症状分享
	$('a.shic').click(function(){
		$('.arsha,.oubra').removeClass('disn').addClass('shay');
		$('body').css('overflow','hidden');
	});
	$('.cairet').click(function(){
		$('.arsha,.oubra').removeClass('shay').addClass('disn');	
		$('body').css('overflow','visible');
	});
	/*点击查看更多下拉*/
	var bo=true;
	$('a.agmor').click(function(){
		if(bo){
			$('.diacl p').removeClass('inde').addClass('dimor');
			$(this).html('收起');
			bo=false;
		}
		else{
			$('.diacl p').removeClass('dimor').addClass('inde');
			$(this).html('点击查看更多');
			bo=true;	
		}
	});
	/*点击下拉*/
	var bo=true;
	$('.headis li span').click(function(){
		if(bo){
			$(this).next('.nexsib').removeClass('disn').addClass('shay');
			$(this).addClass('cusp');
			$(this).parent().css('padding-bottom','0');
			bo=false;	
		}	
		else{
			$(this).next('.nexsib').removeClass('shay').addClass('disn');
			$(this).removeClass('cusp');
			$(this).parent().css('padding-bottom','.23rem');
			bo=true;	
		}
	});
	//疾病自查5标签收起
	var seva=true;
	$('.isno .spfi_02').click(function(){
		$('.bolcy').removeClass('disn').addClass('shay');
		$('.boli').removeClass('shay').addClass('disn');
	});
	//点击弹出页面
	$('.confir a').click(function(){
		$('.bolcy').removeClass('shay').addClass('disn');
		$('.boli').removeClass('disn').addClass('shay');	
	});
	//症状自查5
	$('.cusyp a').click(function(){
		var index=$(this).index();
		if(index!=0){
			if($(this).attr('data-s')=='1'){
				$(this).removeClass('cus').css({'border':'1px solid #e6e5e5','color':'#333'});	
				$(this).attr('data-s','0');	
			}
			else{
				$(this).addClass('cus').css({'border':'1px solid #49c066','color':'#49c066'});	
				$(this).attr('data-s','1');	
			}
		}
	});
});