import 'normalize.css';
import '@/styles/styles.scss';
import '@/styles/components/header.scss';
import '@/styles/components/section-productlist.scss';
import '@/styles/components/section-howtoorder.scss';
import '@/styles/components/section-sites.scss';
import '@/styles/components/application.scss';
import '@/styles/components/footer.scss';
import $ from 'jquery';

(function () {
  $( document ).ready(function() {
    let nameInput = $('#nameinput'),
        nameOutput = $('#nameoutput'),
        wishInput = $('#wishinput'),
        wishOutput = $('#wishoutput'),
        svgColor = $('#svgcolorvalue').val(),
        templateStyle = 'default',
        folderName = 'letters',
        selectedValue = $('#select-letter option:selected').val(),
        imageLink,
        lettersArray = [],
        numbersArray = [],
        useArray = lettersArray,
        nameCounter = $('#name-counter'),
        wishCounter = $('#wish-counter'),
        dropdownTemplate = $('#select-template'),
        dropdownReason = $('#select-reason'),
        dropdownLetter = $('#select-letter'),
        dropdownNumber = $('#select-number'),
        radioCupColor = $('input[type=radio][name=cup-color]');

    let app = {
      maxNameCount: 12,
      maxWishCount: 50,
      selectTemplate() {
        switch ($('#select-template option:selected').val()) {
          case '1': $('.select-letter-container').show();
                    $('.select-number-container').hide();
                    $('#select-letter option[value="0"]').prop('selected', true);
                    app.selectSymbol("letter", true);
            break;
          case '2': $('.select-letter-container').hide();
                    $('.select-number-container').show();
                    $('#select-number option[value="1"]').prop('selected', true);
                    app.selectSymbol("number", true);
            break;
        }
      },
      fillArray(arrayName, classPrefix, from, to) {
        for (let i = from, max = to; i < max; i += 1) {
          arrayName.push(classPrefix + '-' + i);
        }
      },
      selectStyle() {
        templateStyle = $('#select-reason option:selected').val();
        imageLink = 'images/styles/' + templateStyle + '-' + svgColor + '.svg';
        $('#templateoutput .style-image').prop('src', imageLink);
      },
      selectSymbol(symbolType, reset) {
        if (symbolType === 'letter') {
          folderName = 'letters';
          useArray = lettersArray;
        } else if (symbolType === 'number') {
          folderName = 'numbers';
          useArray = numbersArray;
        } else {
          return;
        }
        if(reset) {
          selectedValue = 0;
        }
        selectedValue = $('#select-' + symbolType + ' option:selected').val();
        imageLink = 'images/' + folderName + '/' + svgColor + '/' + useArray[selectedValue] + '.svg';
        $('#templateoutput .template-image').prop('src', imageLink);
      },
      selectColor() {
        let selectedItem = $('input[type=radio][name=cup-color]:checked');
        let selectedColor = selectedItem.val();
        let cupBackgroundClass = 'product__cup_' + selectedColor;
        $("#product-cup-image").removeAttr('class');
        $("#product-cup-image").prop('class', '');
        $('#product-cup-image')[0].className = '';
        $('#product-cup-image').addClass('product').addClass('product__cup').addClass(cupBackgroundClass);
        if(selectedItem.hasClass('cup-color-radio-color')) {
          $('#price-value').html('150');
        } else {
          $('#price-value').html('120');
        }
      },
      changeSize() {
        let productWidth = $('.product').width(),
            nameFontSize = productWidth / 22.22,
            wishFontSize = productWidth / 33.33;
        $('.product').height(productWidth);
        $('.template-name').css('font-size', nameFontSize);
        $('.template-wish').css('font-size', wishFontSize);
      },
      emptyInputsCheck(itemInput, itemOutput) {
        if (itemInput.val() == '') {
          switch(itemOutput) {
            case nameOutput: itemOutput.html('Введите имя');
              break;
            case wishOutput: itemOutput.html('Ваше пожелание');
              break;
          }
        }
      },
      inputAction(inputType) {
        if(inputType === 'name') {
          nameOutput.html(nameInput.val());
          app.emptyInputsCheck(nameInput, nameOutput);
        } else if (inputType === 'wish') {
          wishOutput.html(wishInput.val());
          app.emptyInputsCheck(wishInput, wishOutput);
        } else {
          return;
        }
        app.getCount(inputType);
      },
      getCount(counter) {
        if(counter === 'name') {
          let count = this.maxNameCount - nameInput.val().length;
          nameCounter.html(count);
        } else if (counter === 'wish') {
          let count = this.maxWishCount - wishInput.val().length;
          wishCounter.html(count);
        } else {
          return;
        }
      }
    }

    app.fillArray(lettersArray, 'letter', 0, 43);
    app.fillArray(numbersArray, 'number', 0, 81);

    app.changeSize();
    $(window).resize(app.changeSize);

    $('a.scrollto').on('click',function(a){
      if('' !== this.hash) {
        a.preventDefault();
        let b = this.hash;
        $('html, body').animate({ scrollTop: $(b).offset().top - 0 }, 800, function(){});
      }
    });

    dropdownTemplate.change(function() {
      app.selectTemplate();
    });

    dropdownReason.change(function() {
      app.selectStyle();
    });

    dropdownLetter.change(function() {
      app.selectSymbol('letter');
    });

    dropdownNumber.change(function() {
      app.selectSymbol('number');
    });

    radioCupColor.change(function() {
      app.selectColor();
    });

    app.emptyInputsCheck(nameInput, nameOutput);
    app.emptyInputsCheck(wishInput, wishOutput);

    nameInput.keyup(function() { 
      app.inputAction('name');
    });

    wishInput.keyup(function() { 
      app.inputAction('wish');
    });

    nameCounter.html(app.maxNameCount);
    wishCounter.html(app.maxWishCount);
  });
})();
