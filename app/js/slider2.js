(function(){

	var flag = 'true',
		timerDuration = 4000,
		timer = 0;

    return {
	    
	    init : function() {
	    	var 
	    		_this = this;
	    		_this.autoSwitch();

    		$('.slider_controls-button').on('click', function(e) {
    			e.preventDefault();
    			
    			var
    				$this = $(this),
    				slides = $this.closest('.slider').find('.slider__item'),
    				activeSlide = slides.filter('.slider__item-active'),
    				nextSlide = activeSlide.next(),
    				prevSlide = activeSlide.prev(),
    				firstSlide = slides.first();
    				lastSlide = slides.last();

    			_this.clearTimer();

    			if (flag) {
    				flag = false;
	    			if ($this.hasClass('slider_controls-button_next')) {
	    				if (nextSlide.length) {
	    					_this.moveSlide(nextSlide, 'forward');
	    				} else {
	    					_this.moveSlide(firstSlide, 'forward');
	    				}
	    			} else {
	    				if (prevSlide.length) {
	    					_this.moveSlide(prevSlide, 'backward');
	    				} else {
	    					_this.moveSlide(lastSlide, 'backward');
	    				}
	    			}

	    		}

    		});	
	    },

	    moveSlide: function (slide, direction) {
	    	var 
	    		container = slide.closest('.slider'),
				slides = container.find('.slider__item'),
				activeSlide = slides.filter('.slider__item-active'),
				slideWidth = slides.width(),
				duration = 400,
				reqCssPosition = 0,
				reqSlideStrafe = 0;
				if (direction === 'forward')  {
					reqCssPosition = slideWidth;
					reqSlideStrafe = -slideWidth;

				} else if (direction === 'backward') {
			
					reqCssPosition = -slideWidth;
					reqSlideStrafe = slideWidth;
				}

				slide.css('left', reqCssPosition).addClass('inslide');

				var movableSlide = slides.filter('.inslide');

				activeSlide.animate({left: reqSlideStrafe}, duration);

				movableSlide.animate({left: 0}, duration, function() {
					var $this = $(this);

					slides.css('left', 0).removeClass('slider__item-active');
					$this.toggleClass('inslide slider__item-active');
					flag = true;
				});

			},

			autoSwitch: function () {
				var
					_this = this;

					timer = setInterval(function() {
						var 
							slides = $('#slider .slider__item'),
							activeSlide = slides.filter('.slider__item-active'),
							nextSlide = activeSlide.next(),
							firstSlide = slides.first();

							if (nextSlide.length) {
		    					_this.moveSlide(nextSlide, 'forward');
		    				} else {
		    					_this.moveSlide(firstSlide, 'forward');
		    				}
					}, timerDuration);
			},

			clearTimer: function () {
				if(timer) {
					clearInterval(timer);
					this.autoSwitch();
				}
			}
	
	    }
}());