(function(){
	var app = {
		init: function(){
			this.setUpListeners();
		},

		setUpListeners: function() {
			$('#call-form').on('submit', this.sendMail);
			$('#call-form').on('submit', this.validateForm);
			$('#slider-btn').on('click', this.sliderBox);
		},

		//================== ОТПРАВКА ФОРМЫ ===============//
		// sendMail: function(form) {
		// var 
		// 	url = '../php/mail.php',
		// 	dataType = 'JSON',
		// 	defObject = app.ajaxForm(form, url, dataType);

		// },
		// ajaxForm: function (form, url, dataType) {

		// 	var data = form.serialize(),
		// 		defObj = $.ajax({
		// 			url: url,
		// 			type: 'POST',
		// 			dataType: dataType,
		// 			data: data,
		// 			beforeSend: function(){
		// 				form.find('#send-btn').attr('disabled', 'disabled');
		// 			}
		// 		})
		// 		.done(function () {
		// 			if (msg === 'OK') {
		// 				app.successResult(form);
		// 			} else {
		// 				app.failResult(form);
		// 			}
		// 		})
		// 		.fail(function() {
		// 			console.log('ошибка');
		// 		})
		// 		.always(function() {
		// 		});

		// 	return defObj;
				
		// },

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

		    e.preventDefault();

		    var
		        form = $(this),
		        name = form.find("[data-validation='user-name']"),
		        telephone = form.find("[data-validation='user-tel']"),
		        day = form.find("[data-validation='call-day']"),
		        month = form.find("[data-validation='call-month']"),
		        comment = form.find("[data-validation='user-comment']"),
		        isValid = false;    // прошла валидацию форма или нет

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

		},


		//============= SLIDER =============//
		
		sliderBox: function(e){
			e.preventDefault();

			var $this = $(this),
				sliderWrap = $this.closest('.slider'),
				sliderList = sliderWrap.find('.slider__list'),
				sliderItems = sliderList.find('.slider__item'),
				activeSlide = sliderItems.filter('.slider__item__active'),
				nextSlide = activeSlide.next(),
				prevSlide = activeSlide.prev(),
				firstSlide = sliderItems.first(),
				lastSlide = sliderItems.last(),
				position = 0;

			if($(this).hasClass('slider_controls-button_next')){
				if(nextSlide.length){
					app.findSlidePosition(nextSlide);
					app.addActiveClass(nextSlide);
				} else{
					app.findSlidePosition(firstSlide);
					app.addActiveClass(firstSlide);
				}
			} else{
				if(prevSlide.length){
					app.findSlidePosition(prevSlide);
					app.addActiveClass(prevSlide);
				} else{
					app.findSlidePosition(lastSlide);
					app.addActiveClass(lastSlide);
				}
			}
			sliderList.css('left', '-=' + position + 'px');
		},
		findSlidePosition: function(slide){
			var $this = $(this),
				sliderWrap = $this.closest('.slider'),
				sliderOffset = sliderWrap.offset().left;

			position = slide.offset().left - sliderOffset;
		},
		addActiveClass: function(regSlide){
			regSlide.addClass('slider__item-active').siblings().removeClass('slider__item-active');
		}
	}
	app.init();
}());