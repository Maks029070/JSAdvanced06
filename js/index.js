const API = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11';

const formatCurrency = new Intl.NumberFormat('uk');
// show rates to user
$.getJSON(API, res => {
   res.forEach(currency => {
      if (currency.ccy !== 'BTC') {
         switch (currency.ccy) {
            case 'USD':
               $('#rate_USD>.row').append(`<div class="rate_item col-12 d-flex justify-content-center">Покупка: ${currency.buy}</div>
                                           <div class="rate_item col-12 d-flex justify-content-center">Продажа: ${currency.sale}</div>`);
               break;
            case 'EUR':
               $('#rate_EUR>.row').append(`<div class="rate_item col-12 d-flex justify-content-center">Покупка: ${currency.buy}</div>
                                           <div class="rate_item col-12 d-flex justify-content-center">Продажа: ${currency.sale}</div>`);
               break;
            case "RUR":
               $('#rate_RUR>.row').append(`<div class="rate_item col-12 d-flex justify-content-center">Покупка: ${currency.buy}</div>
                                           <div class="rate_item col-12 d-flex justify-content-center">Продажа: ${currency.sale}</div>`);
               break;
         }
      }
   });
});

const Converter = (function () {
   function regEvents() {
      $('#convertBtn').on('click', () => {
         convertation();
      });
   }

   function convertation() {
      if ($('#inputVal').val() !== '') {
         let quantity = parseFloat($('#inputVal').val());
         console.log(quantity);
         $.getJSON(API, res => {
            $('.result').html('');
            res.forEach(currency => {
               if (currency.ccy !== 'BTC') {
                  $('.result').append(`<div class="col-12 d-flex justify-content-center">За ${formatCurrency.format(quantity)} 
               гривень ви можете купити ${formatCurrency.format(quantity/currency.buy)} ${currency.ccy}</div>`);
               }
            });
         });
      } else {
         $('.error').css('display', 'block');
         setTimeout(() => {
            $('.error').css('display', 'none');
         }, 3000);
      }
   }

   return {
      init: function () {
         regEvents();
      }
   }
})();

Converter.init();