$.fn.tooltips = function (options) {
    // дефолтные значения (если значения не заданы в функции)
    options = {
        position    : options.position || 'right',
        content     : options.content || 'I am tooltip'         
    };

    var
        // в блок вставляется позиция тултипа и контент
        markup = '<div class="tooltip tooltip-' + options.position + '"> \
           <div class="tooltip-inner">' + options.content + '</div> \
       </div>';

    var
        $this = this,   // элемент, к которому применяем плагин
        body = $('body');

    $this
        .addClass('tooltipstered')      // элемент, к которому уже добавили тултип
        .attr('data-tooltip-position', options.position);  // для того чтобы знать с какой сторон был тултип, чтобы пересчитывать

    // добавляем в конец документа тултип
    body.append(markup);

    // вызов главной ф-ии находим последний добавленный тултип по общему классу
    _positionIt($this, body.find('.tooltip').last(), options.position); 
 

    // пропадание тултипов при клике в любое место
    $(document).on('click', function(){
        var $this = $(this),
            errorInputs = $this.find('.error-field');

        $('.tooltip').remove();
    });

    // изменение положения тултипа по рисайзу окна браузера
    $(window).on('resize', function(){
        var 
            tooltipsArray = [];     // массив из всех созданных тултипов

        $('.tooltip').each(function(){
            tooltipsArray.push($(this));
        });

        $('.tooltipstered').each(function(index){
            var 
                position = $(this).data('tooltip-position');
            _positionIt($(this), tooltipsArray[index], position);
        });
    });

    // центрирование тултипов
    function _positionIt(elem, tooltip, position) {
        
        // измеряем элемент
        
        var
            elemWidth   = elem.outerWidth(true),
            elemHeight  = elem.outerHeight(true),
            // верхний край элемента
            topEdge     = elem.offset().top,
            // нижний край = верхний край + высота элемента
            bottomEdge  = topEdge + elemHeight,
            leftEdge    = elem.offset().left,
            // правый край = левый край + ширина элемента
            rightEdge   = leftEdge + elemWidth;

        // измеряем тултип
        
        var 
            tooltipWidth    = tooltip.outerWidth(true),
            tooltipHeight   = tooltip.outerHeight(true),
            leftCenter      = (elemWidth / 2) - (tooltipWidth / 2),
            topCenter       = (elemHeight / 2) -(tooltipHeight / 2);

        var positions = {};

        switch (position) {
            // тултип справа от элемента, посередине
            case 'right' : 
                positions = {
                left : rightEdge,
                top : topEdge + topCenter
            };
            break;
            // тултип слева от элемента, посередине
            case 'left' : 
                positions = {
                left : leftEdge - tooltipWidth,
                top: topEdge + topCenter
            };
            break;
            // тултип сверху от элемента, посередине
            case 'top' : 
                positions = {
                left : leftEdge + leftCenter,
                top : topEdge - tooltipHeight
            };
            break;
            // тултип снизу от элемента, посередине
            case 'bottom' : 
                positions = {
                left : leftEdge + leftCenter,
                top  : bottomEdge
            };
            break;
        }

        tooltip
            .offset(positions)
            .css('opacity', '1');
    }
};