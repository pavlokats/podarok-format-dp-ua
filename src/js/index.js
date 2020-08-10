import '@/styles/styles.scss';
import $ from 'jquery';

(function () {
  $( document ).ready(function() {
    let productItem = $('.product-list .item'),
        nameInput = $('#nameinput'),
        nameOutput = $('#nameoutput'),
        wishInput = $('#wishinput'),
        wishOutput = $('#wishoutput');
    
    productItem.height(productItem.width());

    $( window ).resize(function() {
      productItem.height(productItem.width());
    });

    $('#select-template').change(function() {
      switch ($('#select-template option:selected').val()) {
        case '1': $('.select-letter-container').show();
                  $('.select-number-container').hide();
                  $('#templateoutput').html($('#select-letter option:selected').html());
          break;
        case '2': $('.select-letter-container').hide();
                  $('.select-number-container').show();
                  $('#templateoutput').html($('#select-number option:selected').html());
          break;
      }
    });

    $('#select-letter').change(function() {
      $('#templateoutput').html($('#select-letter option:selected').html());
    });

    $('#select-number').change(function() {
      $('#templateoutput').html($('#select-number option:selected').html());
    });

    function emptyInputsCheck(itemInput, itemOutput) {
      if (itemInput.val() == '') {
        switch(itemOutput) {
          case nameOutput: itemOutput.html("Введите имя");
            break;
          case wishOutput: itemOutput.html("Ваше пожелание");
            break;
        }
      }
    }

    emptyInputsCheck(nameInput, nameOutput);
    emptyInputsCheck(wishInput, wishOutput);

    nameInput.keyup(function() { 
      nameOutput.html(nameInput.val());
      emptyInputsCheck(nameInput, nameOutput);
    });

    wishInput.keyup(function() { 
      wishOutput.html(wishInput.val());
      emptyInputsCheck(wishInput, wishOutput);
    });
  });
})();
