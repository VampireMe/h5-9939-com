japp.add('pager',{});
(function(pg){
	 var defaults = {
			base_url	: '',
			total_page 	: 5,
			start_page	: 1,
			current_page: 1,
			display  	: 7,
			prev_text	:'上一页',
			next_text	:'下一页',
			onchange	:function(opt){turnpage(opt);}
	};
	function loadpage(opt){
		var containerid = opt['containerid'];
		var totalpage = parseInt(opt['total_page']);
		var current_page_num = parseInt(opt['current_page']);
		var display = parseInt(opt['display']);
		
		var start = Math.min(parseInt(Math.max((current_page_num-display/2),1)),Math.max((totalpage-display+1),1));
		var end = Math.min((start+display-1),totalpage);
		
		var htmlArr = [];
		htmlArr.push('<div class="page">');
		htmlArr.push('<div class="pagin clearfix">');
		
		if(totalpage>1){
			var prev_page_num = parseInt(opt['current_page'])-1;
			var next_page_num = parseInt(opt['current_page'])+1;
			
			htmlArr.push('<span class="prev_page prev_page_'+containerid+'"  page="'+prev_page_num+'" flag="prev"  title="上一页">&lt;</span>');
			htmlArr.push('<a class="prev_page prev_page_'+containerid+'"  page="'+prev_page_num+'" flag="prev" title="上一页" style="display:none">&lt;</a>');
			for(var i=start;i<=end;i++){
				var classname = i==1?'linkpager_'+containerid+' '+'current':'linkpager_'+containerid;
				htmlArr.push('<a class="'+classname+'" page="'+i+'">'+i+'</a>');
			}
			htmlArr.push('<span class="next_page next_page_'+containerid+'" page="'+next_page_num+'" flag="next"  style="display:none"  title="下一页">&gt;</span>');
			htmlArr.push('<a class="next_page next_page_'+containerid+'" page="'+next_page_num+'" flag="next"  title="下一页">&gt;</a>');
		}
		htmlArr.push('</div>');
		htmlArr.push('</div>');
		$("#"+ containerid).html(htmlArr.join(''));
		
		$("a.prev_page_"+containerid+",a.next_page_"+containerid).click(function(){
			var totalpage = parseInt(opt['total_page']);
			var current_page_num =opt['current_page'];
			var flag = $(this).attr("flag");
			current_page_num = flag=="next"?++current_page_num:--current_page_num;
			current_page_num = Math.max(Math.min(current_page_num,totalpage),1);
			$(".linkpager_"+containerid+"[page='"+current_page_num+"']").trigger("click");
		});
		
		$(".linkpager_"+containerid).click(function(){
			var current_page_num =parseInt($(this).attr("page"));
			opt['current_page']=current_page_num;
			loadpage(opt);
		});
		setpagestyle(opt);
	}
	
	function turnpage(opt){
		var rowdatacontainer_flag = opt['datacontainer'];
		var current_page_num=parseInt(opt['current_page']);
		$('.'+rowdatacontainer_flag).hide();
		$("."+rowdatacontainer_flag+"[page_num='"+current_page_num+"']").show();
	}
	function setpagestyle(opt){
		var containerid=opt['containerid'];
		var current_page_num=parseInt(opt['current_page']);
		var totalpage = parseInt(opt['total_page']);
		
		$(".linkpager_"+containerid).removeClass("current");
		$(".linkpager_"+containerid+"[page='"+current_page_num+"']").attr('class','linkpager_'+containerid+' current');
		
		$("a.prev_page_"+containerid+",span.next_page_"+containerid).hide();
		$("span.prev_page_"+containerid+",a.next_page_"+containerid).show();
		
		if(current_page_num>1){
			$("a.prev_page_"+containerid).show();
			$("span.prev_page_"+containerid).hide();
		}
		if(totalpage==current_page_num){
			$("span.next_page_"+containerid).show();
			$("a.next_page_"+containerid).hide();
		}
		
		if(typeof(opt['onchange'])!='undefined'){
			opt['onchange'].apply(this,[opt]);
		}
	}
	
	//初始化翻页控件config ={'containerid':'','datacontainer':'','total':'5','pagesize':'5','display':'5'};
	//datacontainer 用来通过$(".datacontainer")筛选数据的标记
	pg.init=function(config){
		var opt = $.extend({},defaults,config||{});
		var total=parseInt(opt['total']);
		var pagesize=parseInt(opt['pagesize']);
		opt['total_page']=Math.ceil(total/pagesize);
		loadpage(opt);
	};
})(japp.get("pager"));