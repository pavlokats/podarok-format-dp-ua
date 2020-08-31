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
    let dropdownLetter = $('#select-letter'),
        dropdownNumber = $('#select-number'),
        dropdownReason = $('#select-reason'),
        dropdownTemplate = $('#select-template'),
        folderName = 'letters',
        imageLink,
        lettersArray = [],
        nameCounter = $('#name-counter'),
        nameFontSize,
        nameInput = $('#nameinput'),
        nameOutput = $('#nameoutput'),
        numbersArray = [],
        productStyle = $('#productstyle'),
        productSymbol = $('#productsymbol'),
        productWidth,
        radioCupColor = $('input[type=radio][name=cup-color]'),
        selectedColor,
        selectedColorName,
        selectedItem,
        selectedOption = $('#select-letter option:selected'),
        selectedValue = selectedOption.val(),
        svgColor = $('#svgcolorvalue').val(),
        templateName,
        templateStyle = 'default',
        useArray = lettersArray,
        wishCounter = $('#wish-counter'),
        wishFontSize,
        wishInput = $('#wishinput'),
        wishOutput = $('#wishoutput');

    let app = {
      maxNameCount: 12,
      maxWishCount: 50,
      maxLettersCount: 43,
      maxNumbersCount: 81,
      cupPriceWhite: 120,
      cupPriceColor: 150,
      selectTemplate() {
        switch ($('#select-template option:selected').val()) {
          case '1': $('.select-letter-container').show();
                    $('.select-number-container').hide();
                    $('#select-letter option[value="0"]').prop('selected', true);
                    app.selectSymbol("letter", true);
                    productSymbol.val($('#select-letter option[value="0"]').text());
            break;
          case '2': $('.select-letter-container').hide();
                    $('.select-number-container').show();
                    $('#select-number option[value="1"]').prop('selected', true);
                    app.selectSymbol("number", true);
                    productSymbol.val($('#select-number option[value="1"]').text());
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
        templateName = $('#select-reason option:selected').text();
        imageLink = 'images/styles/' + templateStyle + '-' + svgColor + '.svg';
        $('#templateoutput .style-image').prop('src', imageLink);
        productStyle.val(templateName);
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
        selectedOption = $('#select-' + symbolType + ' option:selected');
        selectedValue = selectedOption.val();
        imageLink = 'images/' + folderName + '/' + svgColor + '/' + useArray[selectedValue] + '.svg';
        $('#templateoutput .template-image').prop('src', imageLink);
        productSymbol.val(selectedOption.text());
      },
      selectColor() {
        selectedItem = $('input[type=radio][name=cup-color]:checked');
        selectedColorName = $('input[type=radio][name=cup-color]:checked + label').text();
        $('#productcolor').val(selectedColorName);
        selectedColor = selectedItem.val();
        let cupBackgroundClass = 'product__cup_' + selectedColor;
        $("#product-cup-image").removeAttr('class');
        $("#product-cup-image").prop('class', '');
        $('#product-cup-image')[0].className = '';
        $('#product-cup-image').addClass('product').addClass('product__cup').addClass(cupBackgroundClass);
        if(selectedItem.hasClass('cup-color-radio-color')) {
          $('#price-value').html(app.cupPriceColor);
        } else {
          $('#price-value').html(app.cupPriceWhite);
        }
      },
      changeSize() {
        productWidth = $('.product').width();
        nameFontSize = productWidth / 22.22;
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
        if( nameInput.val() !== '' && wishInput.val() !== '' ) {
          $('.order-form-element').prop('disabled', false);
        } else {
          $('.order-form-element').prop('disabled', true);
        }
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

    app.fillArray(lettersArray, 'letter', 0, app.maxLettersCount);
    app.fillArray(numbersArray, 'number', 0, app.maxNumbersCount);

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
