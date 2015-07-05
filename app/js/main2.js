(function(){
	var app = {
		init: function(){
			this.setUpListeners();
			$('input[placeholder], textarea[placeholder]').placeholder();
		},

		setUpListeners: function() {
			var siteForm = $('#call-form');

			siteForm.on('submit', this.validateForm);
			siteForm.on('submit', this.sendMail);
			$('.slider_controls-button').on('click', this.sliderBox);
			$('#scroll-btn').on('click', this.scrollTop);
			$(window).on('scroll', this.scrollTopBtnShow)
		},

		//================== ОТПРАВКА ФОРМЫ ===============//
		sendMail: function(e) {
            e.preventDefault();
            var formData = $(this).serialize(),
                url = '../app/php/mail.php';

            $.ajax({
                url: url,
                dataType: 'json',
                type: 'post',
                data: formData,
                success: function(data){
                    console.log(data);

                    app.successResult(form);
                },
                failure: function(){
                	app.failResult(form);
                }
            });
		},

		successResult: function (form) {
			var markup = '<div class="form__success-message">Ваша заявка принята!</div>';
			$(form).append(markup);

			setTimeout(function(){
				markup.fadeOut(300);
			}, 5000);
		},

		failResult: function (form) {
			var markup = '<div class="form__error-message">Произошла ошибка</div>';

			$(form).append(markup);

			setTimeout(function(){
				markup.fadeOut(300);
			}, 5000);
		},	


	    //============== ВАЛИДАЦИЯ =============//
		    
		validateForm: function(e){

		    // e.preventDefault();

		    var
		        form = $(this),
		        name = form.find("[data-validation='user-name']"),
		        telephone = form.find("[data-validation='user-tel']"),
		        day = form.find("[data-validation='call-day']"),
		        month = form.find("[data-validation='call-month']"),
		        comment = form.find("[data-validation='user-comment']"),
		        isValid = false;    

		    name.each(function(){
		        var 
		            $this = $(this),
		            notEmptyField = !!$this.val();

		        if(notEmptyField){
		            isValid = true;   
		        } else {
		            isValid = false;
		            $this.tooltips({
		                content : 'Введите ваше имя',
		                position : 'right'
		            });
		            isValid = false;
		        }    
		    });

		    telephone.each(function(){
		        var 
		            $this = $(this),
		            notEmptyField = !!$this.val();

		        if(notEmptyField){
		            isValid = true;   
		        } else {
		        	$this.tooltips({
		                content : 'Введите ваш телефон',
		                position : 'right'
		            });
		            isValid = false;
		        }    
		    });

		    day.each(function(){
		        var 
		            $this = $(this),
		            notEmptyField = !!$this.val();

		        if(notEmptyField){
		            isValid = true;   
		        } else {
		            $this.tooltips({
		                content : 'Выберете день звонка',
		                position : 'left'
		            });
		            isValid = false;
		        }    
		    });
		    month.each(function(){
		        var 
		            $this = $(this),
		            notEmptyField = !!$this.val();

		        if(notEmptyField){
		            isValid = true;   
		        } else {
		            $this.tooltips({
		                content : 'Выберете месяц звонка',
		                position : 'right'
		            });
		            isValid = false;
		        }    
		    });
		    comment.each(function(){
		        var 
		            $this = $(this),
		            notEmptyField = !!$this.val();

		        if(notEmptyField){
		            isValid = true;   
		        } else {
		            $this.tooltips({
		                content : 'Введите ваш комментарий',
		                position : 'right'
		            });
		            isValid = false;
		        }    
		    });
		    return isValid;
		},


		//============= SLIDER =============//
		
		sliderBox: function(e){
			e.preventDefault();

			var $this = $(this),
				sliderWrap = $('#site-slider'), 
				sliderList = sliderWrap.find('.slider__list'),
				sliderItems = sliderList.find('.slider__item'),
				activeSlide = sliderItems.filter('.slider__item-active'),
				nextSlide = activeSlide.next(),
				prevSlide = activeSlide.prev(),
				firstSlide = sliderItems.first(),
				lastSlide = sliderItems.last(),
                sliderOffset = sliderWrap.offset().left,
				position = 0;

			if($this.hasClass('slider_controls-button_next')){
				if(nextSlide.length){
					position = nextSlide.offset().left - sliderOffset;
					app.addActiveClass(nextSlide);
				} else{
					position = firstSlide.offset().left - sliderOffset;
					app.addActiveClass(firstSlide);
				}
			} else{
				if(prevSlide.length){
					position = prevSlide.offset().left - sliderOffset;
					app.addActiveClass(prevSlide);
				} else{
					position = lastSlide.offset().left - sliderOffset;
					app.addActiveClass(lastSlide);
				}
			}
			sliderList.css({
                'left' : '-=' + position + 'px'
                });
		},
		addActiveClass: function(regSlide){
			regSlide.addClass('slider__item-active').siblings().removeClass('slider__item-active');
		},

		//============= SCROLL BUTTON =============//
		
		scrollTopBtnShow: function(){
			
			var position = $(window).scrollTop(),
				scrollBtn = $('#scroll-top');

			if(position > 200){
				scrollBtn.fadeIn(300);
			} else {
				scrollBtn.fadeOut(300);
			}

		},
		scrollTop: function(e){
			e.preventDefault();

			var win = $(window);

			win.scrollTop(0);
		}
	}
	app.init();
}());