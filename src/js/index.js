import 'normalize.css';
import '@/styles/styles.scss';
import '@/styles/components/header.scss';
import '@/styles/components/section-productlist.scss';
import '@/styles/components/section-howtoorder.scss';
import '@/styles/components/section-sites.scss';
import '@/styles/components/footer.scss';
import $ from 'jquery';

(function () {
  $( document ).ready(function() {
    let nameInput = $('#nameinput'),
        nameOutput = $('#nameoutput'),
        wishInput = $('#wishinput'),
        wishOutput = $('#wishoutput');

    $("a.scrollto").on("click",function(a){
      if("" !== this.hash) {
        a.preventDefault();
        var b = this.hash;
        $("html, body").animate({ scrollTop: $(b).offset().top - 0 }, 800, function(){});
      }
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
