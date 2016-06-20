;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};


	// Go to next section
	var gotToNextSection = function(){
		var el = $('.fh5co-learn-more'),
			w = el.width(),
			divide = -w/2;
		el.css('margin-left', divide);
	};

	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};



	// Scroll Next
	var ScrollNext = function() {
		$('body').on('click', '.scroll-btn', function(e){
			e.preventDefault();

			$('html, body').animate({
				scrollTop: $( $(this).closest('[data-next="yes"]').next()).offset().top
			}, 1000, 'easeInOutExpo');
			return false;
		});
	};

	

	var styleToggle = function() {

		
		if ( $.cookie('styleCookie') !== undefined ) {
			if ( $.cookie('styleCookie') === 'style-light.css'  ) { 
				
				$('.js-style-toggle').attr('data-style', 'light');
			} else  {
				$('.js-style-toggle').attr('data-style', 'default');
			}
			$('#theme-switch').attr('href', 'css/' + $.cookie('styleCookie'));
		} 


		if ( $.cookie('btnActive') !== undefined ) $('.js-style-toggle').addClass($.cookie('btnActive'));
		



		// $('.js-style-toggle').on('click', function(){
		$('body').on('click','.js-style-toggle',function(event){

			

			var data = $('.js-style-toggle').attr('data-style'), style = '', $this = $(this);

			if ( data === 'default') {

				// switch to light
				style = 'style-light.css';
				$this.attr('data-style', 'light');

				// add class active to button
				$.cookie('btnActive', 'active', { expires: 365, path: '/'});
				$this.addClass($.cookie('btnActive'));
				

			} else {
				// switch to dark color
				style = 'style.css';
				$this.attr('data-style', 'default');

				// remove class active from button
				$.removeCookie('btnActive', { path: '/' });
				$(this).removeClass('active'); 

				// switch to style
				$.cookie('styleCookie', style, { expires: 365, path: '/'});

			}

			// switch to style 
			$.cookie('styleCookie', style, { expires: 365, path: '/'});

			// apply the new style
			$('#theme-switch').attr('href', 'css/' + $.cookie('styleCookie'));
				
			
			event.preventDefault();

		});
		
	}
	
	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	

	var moreProjectSlider = function() {
		$('.flexslider').flexslider({
			animation: "slide",
			animationLoop: false,
			itemWidth: 310,
			itemMargin: 20,
			controlNav: false
		});
	}
	

	// Document on load.
	$(function(){
		
		gotToNextSection();
		loaderPage();
		ScrollNext();
		moreProjectSlider();
		styleToggle();
		
		// Animate
		contentWayPoint();

	});


}());


$(document).ready(function() {

	$("body").css("display", "none");

    $("body").fadeIn(2000);
    $("body").stop().animate({
    	opacity: 1
    });


	$("a.transition").click(function(event){

		event.preventDefault();
		linkLocation = this.href;
		$("body").fadeOut(1000, redirectPage);		

	});
		
	function redirectPage() {
		window.location = linkLocation;
	}

	$('.owl-carousel').owlCarousel({
		center: true,
	    loop:true,
	    margin:10,
	    item:3,
	    responsive:{
	        0:{
	            items:2
	        },
	        400:{
	        	items:2
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:3
	        }
	    }
	})

	$('.video-thumbnail').click(function(){
		url = $(this).attr('data-detail');
		head = $(this).find('p').text();
		$("#displayVideo").attr('src',url.replace("watch?v=", "v/"));
		$('.video-detail .content-head').text(head);

		id = $(this).attr('data-id');
		if(id == 1){
			detail = "สิ่งที่เราทํามันส่งผลกระทบต่อสังคมทุกๆอย่าง ง่ายๆเลยถ้าเราเองไม่เป็นปัญหาของสังคม สังคมก็ หมดปัญหา ถ้าเราสามารถมีส่วนทําให้เรื่องใดเรื่องหนึ่งเป็นประโยชน์ได้ สังคมก็จะเจริญขึ้นไปอีก" ;
		}else if(id == 2){
			detail = "ฟัง 6 มุมมองที่น่าสนใจสุดๆ “ครีเอทีฟอาสา” คืออะไร โดย เป้ อารักษ์ อมรศุภศิริ, กรณ์ เทพินทราภิรักษ์ ชลณัฏฐ์ โกยกุล, พันโทวันชนะ สวัสดี, พงศธร จงวิลาส และ ทรงกลด บางยี่ขัน";
		}else if(id == 3){
			detail = "จิตอาสา คือ หน้าที่ พันโทวันชนะ สวัสดี นายทหาร / จิตอาสา / นักแสดง";
		}
		$('.video-detail').find('p').not('.content-head').text(detail);
		
	});
	
});
