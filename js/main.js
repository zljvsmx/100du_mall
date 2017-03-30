
$(function () {
	
	//	(function(){
	//		代码
	//		代码
	//		代码
	//		。。。	
	//	})()
	
	//搜索切换:以闭包方式进行，以上为闭包格式
	(function () {
		var aLi = $('#menu li');
		var oText = $('.form').find('.text')
		var arrText = ['例如：搜店', '例如：地址', '例如：优惠券', '例如：全文', '例如：视频']
		var iNow = 0;

		oText.val(arrText[iNow]);

		//点击栏目切换样式以及下方提示文字
		aLi.each(function (index) {
			$(this).click(function () {
				aLi.attr('class', 'gradiet');
				$(this).attr('class', 'active');

				iNow = index;
				oText.val(arrText[iNow]);
			})
		})
		//光标聚焦
		oText.focus(function(){
			if($(this).val()==arrText[iNow]){
				$(this).val('');
			}
		})
		//失去光标
		oText.blur(function(){
			if($(this).val()==''){
				oText.val(arrText[iNow])
			}
		})
	})();

	//Update文字上下滚动
	(function () {
		var oDiv=$('.update');
		var oUl=$('.update .wrap ul');
		
		var arrDate=[	{'name':'萱萱','time':'4','title':'那些美丽的瞬间','url':'http://www.baidu.com'},
						{'name':'周周','time':'5','title':'我就适合发函就是','url':'http://www.baidu.com'},
						{'name':'杨洋','time':'6','title':'哈哈哈哈哈哈哈','url':'http://www.baidu.com'},
						{'name':'晶晶','time':'1','title':'真他妈的男啊啊啊','url':'http://www.baidu.com'},
						{'name':'溜溜','time':'2','title':'我该如何是好啊','url':'http://www.baidu.com'},
						{'name':'旺旺','time':'3','title':'好像休息啊啊啊','url':'http://www.baidu.com'},
						{'name':'哈哈','time':'7','title':'没有美丽的瞬间','url':'http://www.baidu.com'},
						{'name':'卡卡','time':'8','title':'这么没意思','url':'http://www.baidu.com'}
		];
		var str='';
		for(var i=0;i<arrDate.length;i++){
			str+='<li><a href="'+arrDate[i].url+'"><strong>'+arrDate[i].name+'</strong> <span>'+arrDate[i].time+'分钟前</span> 写了一片新文章：'+arrDate[i].title+'</a></li>';
		}
		oUl.html(str);
		var iH=oUl.find('li').height();
		var Up=$('#UpBtn');
		var Down=$('#DownBtn');
		var iNow=0;
		var timer=null;
		
		
		
		
		//点击进行滚动效果
		Up.click(function(){
			
			doMove(-1);
		});
		Down.click(function(){
			doMove(1);
		});
		
		//移入停止，移出继续走
		oDiv.hover(function(){
			clearInterval(timer);
		},function(){
			autoPlay();
		})
		
		function doMove(num){
			iNow+=num;
			if(Math.abs(iNow)>arrDate.length-1){
				iNow=0;
			}
			if(iNow>0){
				iNow=-(arrDate.length-1);
			}
			oUl.stop().animate({
				'top':iH*iNow
			},1000);
		}
		
		function autoPlay(){
			timer=setInterval(function(){
				doMove(-1);
			},1000)
		}
		autoPlay();
	})();

	//options选项卡切换
	(function(){
		//红店铺新开张
		fnTab($('.tabNav1'),$('.tabCon1'))
		function fnTab(oNav,aCon){
			var aElem=oNav.children();
			aCon.hide().eq(0).show();
			aElem.each(function(index){
				$(this).click(function(){
					aElem.removeClass('active').addClass('gradiet');
					$(this).removeClass('gradiet').addClass('active');
					aElem.find('a').attr('class','triangle_down_gray');
					$(this).find('a').attr('class','triangle_down_red');
					
					aCon.hide().eq($(this).index()).show();
				})
			})
		}
	
		//地铁交通
		subtab($('.subnav'),$('.subCon'))
		function subtab(sNav,sCon){
			var sElem=$('.subnav').children();
			sCon.hide().eq(0).show();
			sElem.each(function(index){
				$(this).click(function(){
					sElem.removeClass('active').addClass('gradiet');
					$(this).removeClass('gradiet').addClass('active');
					sElem.find('a').attr('class','triangle_down_gray');
					$(this).find('a').attr('class','triangle_down_red');
					
					sCon.hide().eq(index).show();
				})
			})
		}

	})();

	//自动播放的焦点图
	(function(){
		var arr=['爸爸去哪儿啦','人体摄影光彩照人','我也不知道是啥'];
		var oDiv=$('#fade');
		var aUlLi=oDiv.find('ul li');
		var aOlLi=oDiv.find('ol li');
		var oP=oDiv.find('p');
		var iNow=0;
		var timer=null;
		
		fnFade();
		
		
		
		aOlLi.click(function(){
			iNow=$(this).index();
			fnFade();
		})
		
		oDiv.hover(function(){
			clearInterval(timer);
		},autoPlay)
		
		function autoPlay(){
			timer=setInterval(function(){
				iNow++;
				iNow%=arr.length;
				fnFade();
			},1000)
		}
		
		autoPlay();
		
		
		
		function fnFade(){
			aUlLi.each(function(i){
				if(iNow!=i){
					aUlLi.eq(i).fadeOut().css('z-index','1');
					aOlLi.eq(i).removeClass('active');
				}else{
					aUlLi.eq(i).fadeIn().css('z-index','2');
					aOlLi.eq(i).addClass('active');
					oP.text(arr[i]);
				}
			})
		}
		
	})();

	//日历提示说明
	(function(){
		var aSpan=$('.calendar h3 span');
		var aImg=$('.calendar img');
		var aPrompt=$('.today_info');
		var oImg=aPrompt.find('img');
		var oStromg=aPrompt.find('strong');
		var oP=aPrompt.find('p');
		
		aImg.hover(function(){
			var iTop=$(this).parent().position().top-30;
			var iLeft=$(this).parent().position().left+55;
			var index=$(this).parent().index()%aSpan.size();
			
			console.log(index);
			aPrompt.show().css({'top':iTop,'left':iLeft});
			oP.text($(this).attr('info'));
			oImg.attr('src',$(this).attr('src'))
			oStromg.text(aSpan.eq(index).text());
			
		},function(){
			aPrompt.hide();
		})
	})();

	//BBS高亮显示
	(function(){
		var oOlLi=$('.bbs ol').find('li');
		oOlLi.mouseover(function(){
			oOlLi.removeClass('active').eq($(this).index()).addClass('active');
		})
	})();

	//HOT鼠标提示效果
	(function(){
		var arr=[
				
				'用户1<br/>人气1',
				'用户2<br/>人气1',
				'用户3<br/>人气1',
				'用户4<br/>人气1',
				'用户5<br/>人气1',
				'用户6<br/>人气1',
				'用户7<br/>人气1',
				'用户8<br/>人气1',
				'用户9<br/>人气1',
				'用户10<br/>人气1'
		]
		$('.hot_area li').mouseover(function(){
			if($(this).index()==0){
				return;
			}
			$('.hot_area li p').remove();
			
			$(this).append('<p style="width:'+ ($(this).width()-12) +'px;height:'+ ($(this).height()-12) +'px">'+ arr[$(this).index()-1] +'</p>')
		})
		
		
	})();
})