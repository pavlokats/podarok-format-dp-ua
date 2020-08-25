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
        selectedValue,
        imageLink,
        lettersArray = [],
        numbersArray = [],
        useArray;

    let app = {
      selectTemplate() {
        switch ($('#select-template option:selected').val()) {
          case '1': $('.select-letter-container').show();
                    $('.select-number-container').hide();
                    $('#select-letter option[value="0"]').prop("selected", true);
                    app.selectSymbol("letter", true);
            break;
          case '2': $('.select-letter-container').hide();
                    $('.select-number-container').show();
                    $('#select-number option[value="1"]').prop("selected", true);
                    app.selectSymbol("number", true);
            break;
        }
      },
      fillArray(arrayName, classPrefix, from, to) {
        for (let i = from, max = to; i < max; i += 1) {
          arrayName.push(classPrefix + '-' + i);
        }
      },
      selectSymbol(symbolType, reset) {
        let folderName;
        if (symbolType === "letter") {
          folderName = "letters";
          useArray = lettersArray;
        } else if (symbolType === "number") {
          folderName = "numbers";
          useArray = numbersArray;
        } else {
          return;
        }

        if(reset) {
          selectedValue = 0;
        }

        selectedValue = $('#select-' + symbolType + ' option:selected').val();
        imageLink = 'images/' + folderName + '/default-' + svgColor + '/' + useArray[selectedValue] + '.svg';
        $("#templateoutput img").prop("src", imageLink);
      },
      selectColor() {
        let selectedItem = $("input[type=radio][name=cup-color]:checked");
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
            case nameOutput: itemOutput.html("Введите имя");
              break;
            case wishOutput: itemOutput.html("Ваше пожелание");
              break;
          }
        }
      }
    }

    app.fillArray(lettersArray, "letter", 0, 43);
    app.fillArray(numbersArray, "number", 0, 80);

    app.changeSize();
    $(window).resize(app.changeSize);

    $("a.scrollto").on("click",function(a){
      if("" !== this.hash) {
        a.preventDefault();
        let b = this.hash;
        $("html, body").animate({ scrollTop: $(b).offset().top - 0 }, 800, function(){});
      }
    });

    $('#select-template').change(app.selectTemplate);
    $('#select-letter').change(function(){app.selectSymbol("letter")});
    $('#select-number').change(function(){app.selectSymbol("number")});
    $('input[type=radio][name=cup-color]').change(app.selectColor);

    app.emptyInputsCheck(nameInput, nameOutput);
    app.emptyInputsCheck(wishInput, wishOutput);

    nameInput.keyup(function() { 
      nameOutput.html(nameInput.val());
      app.emptyInputsCheck(nameInput, nameOutput);
    });

    wishInput.keyup(function() { 
      wishOutput.html(wishInput.val());
      app.emptyInputsCheck(wishInput, wishOutput);
    });
  });
})();
