(function() {
  'use strict';
  var SEARCH_CONDITION = {
    ORDER_ID: 'ORDER_ID',
    NAME: 'NAME',
    VALD_FLAG: 'VALD_FLAG',
    ALLOW_FOREIGN_FRUITS: 'ALLOW_FOREIGN_FRUITS',
    START_DATE: 'START_DATE',
    END_DATE: 'END_DATE',
    ORDER_STATUS: 'ORDER_STATUS',
    RECEIVER_CELL_PHONE: 'RECEIVER_CELL_PHONE',
    RECEIVE_DATE: 'RECEIVE_DATE',
  };
  



  angular
    .module('app')
    .constant("fruitpay", "${GULP_SERVER_DOMAIN}")
    .constant("fruitpayClient", "${GULP_CLIENT_DOMAIN}")
    .constant('SEARCH_CONDITION', SEARCH_CONDITION);
})();