import '@/styles/styles.scss';
import $ from 'jquery';

(function () {
  let productItem = $('.product-list .item');
  productItem.height(productItem.width());

  $( window ).resize(function() {
    productItem.height(productItem.width());
  });
})();
