// JavaScript Document
$(document).ready(function(){
	$(".main_visual").hover(function(){
		$("#btn_prev,#btn_next").fadeIn()
	},function(){
		$("#btn_prev,#btn_next").fadeOut()
	});
	$dragBln = false;
	$(".main_image").touchSlider({
		flexible : true,
		speed : 200,
		btn_prev : $("#btn_prev"),
		btn_next : $("#btn_next"),
		paging : $(".flicking_con a,.flicking_c a"),
		counter : function (e){
			$(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
			$(".flicking_c a").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	$(".main_re").touchSlider({
		flexible : true,
		speed : 200,
	});
	
	$(".main_image,.main_re").bind("mousedown", function() {
		$dragBln = false;
	});
	$(".main_image,.main_re").bind("dragstart", function() {
		$dragBln = true;
	});
	$(".main_image a,.main_re").click(function(){
		if($dragBln) {
			return false;
		}
	});
	timer = setInterval(function(){
		$("#btn_next").click();
	}, 5000);
	$(".main_visual").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		},5000);
	});
	$(".main_image,.main_re").bind("touchstart",function(){
		clearInterval(timer);
	}).bind("touchend", function(){
		timer = setInterval(function(){
			$("#btn_next").click();
		}, 5000);
	});
});
