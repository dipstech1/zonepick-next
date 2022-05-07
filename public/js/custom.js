(function ($, window, Typist) {
    
	/*---------owl-carousel------------*/
	
	
  $('.productimg-slider').owlCarousel({
		loop:true,
		margin:10,
		autoplay:false,
		nav:true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		responsiveClass: true,
		smartSpeed: 2500,
		navText: ["<i className='fas fa-angle-left'></i>", "<i className='fas fa-angle-right'></i>"],
		responsive:{
			0:{
				items:1,
			},
			600:{
				items:1,
			},
			1000:{
				items:1,
			}
		}
	})
	$('.Popular-slider').owlCarousel({
		loop:false,
		margin:0,
		autoplay:false,
		nav:true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		responsiveClass: true,
		smartSpeed: 2500,
		navText: ["<i className='fas fa-angle-left'></i>", "<i className='fas fa-angle-right'></i>"],
		responsive:{
			0:{
				items:1,
			},
			600:{
				items:1,
			},
			1000:{
				items:3,
			}
		}
	});

	/*--------scrollup_down---------*/

// 	$(".down").click(function() {
// 		$('.time-slider').animate({
// 			scrollTop: $(".up").offset().top
// 		}, 1500);
// 	});
//    });
   
//    $(document).ready(function() {
//    $(".up").click(function() {
// 		$('.time-slider').animate({
// 			scrollTop: $(".down").offset().top
// 		}, 1000);
// 	});

	/*-------active---------*/
	
	$(document).ready(function() {
		$(".nav-link").click(function () {
			$(".nav-link").removeClass("active");
			$(this).addClass("active");   
		});
	});
	
	
	/*-------------headder_fixed-------------*/
	
	
		$(window).scroll(function(){
			var sticky = $('.header'),
				scroll = $(window).scrollTop();
		  
			if (scroll >= 20) sticky.addClass('fixed');
			else sticky.removeClass('fixed');
		});
	
/*--------------ASO.JS---------------*/
	
//  AOS.init();
		
//refresh animations
 
//  $(window).on('load', function() {
//  	AOS.refresh();
//  });

/*------range-------*/

$("#rangePrimary").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 20000,
    from: 0,
    to: 8000,
    prefix: "₹"
});

})(jQuery, window);

/*-------Wizard-----------*/

$(document).ready(function () {
  
    //validation
   $('input, select').tooltipster({
       trigger: 'custom',
       onlyOne: false,
       position: 'right',
       theme: 'tooltipster-light'
     });

      $("#form").validate({
          errorPlacement: function (error, element) {
              var lastError = $(element).data('lastError'),
                  newError = $(error).text();

              $(element).data('lastError', newError);

              if(newError !== '' && newError !== lastError){
                  $(element).tooltipster('content', newError);
                  $(element).tooltipster('show');
              }
          },
          success: function (label, element) {
              $(element).tooltipster('hide');
          }
      });


  /* This code handles all of the navigation stuff.
  ** Probably leave it. Credit to https://bootsnipp.com/snippets/featured/form-wizard-and-validation
  */
  var navListItems = $('div.setup-panel div a'),
          allWells = $('.setup-content'),
          allNextBtn = $('.nextBtn');

  allWells.hide();

  navListItems.click(function (e) {
      e.preventDefault();
      var $target = $($(this).attr('href')),
          $item = $(this);

      if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-primary').addClass('btn-default');
          $item.addClass('btn-primary');
          $('input, select').tooltipster("hide");
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
      }
  });

  /* Handles validating using jQuery validate.
  */
  allNextBtn.click(function(){
      var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input"),
          isValid = true;

      //Loop through all inputs in this form group and validate them.
      for(var i=0; i<curInputs.length; i++){
          if (!$(curInputs[i]).valid()){
              isValid = false;
          }
      }

      if (isValid){
          //Progress to the next page.
        nextStepWizard.removeClass('disabled').trigger('click');    
          // # # # AJAX REQUEST HERE # # # 
          
          /*
          Theoretically, in order to preserve the state of the form should the worst happen, we could use an ajax call that would look something like this:
          
          //Prepare the key-val pairs like a normal post request.
          var fields = {};
          for(var i= 0; i < curInputs.length; i++){
            fields[$(curInputs[i]).attr("name")] = $(curInputs[i]).attr("name").val();
          }
          
          $.post(
              "location.php",
              fields,
              function(data){
                //Silent success handler.
              }                
          );
          
          //The FINAL button on last page should have its own logic to finalize the enrolment.
          */
      }
  });

  $('div.setup-panel div a.btn-primary').trigger('click');
  
});





