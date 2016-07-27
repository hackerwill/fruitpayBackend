(function(){
  'use strict';

  angular
      .module('util')
      .service('CommUtils',CommUtils);
  function CommUtils(){

    this.convertDateToStr = function(date) {
      var year = date.getFullYear();
      var month = add0IfLessThan10(date.getMonth()+1);
      var day = add0IfLessThan10(date.getDate());
      var hour = add0IfLessThan10(date.getHours());
      var minute = add0IfLessThan10(date.getMinutes());
      var second = add0IfLessThan10(date.getSeconds());
      var datestring = year + "-" + month + "-" + day + 
        " " + hour + ":" + minute + ":" + second;
        console.log(datestring)
      return datestring;
    }

    function add0IfLessThan10(value) {
      if(value < 10 ) {
        return '0' + value
      }
      return value
    }

  }

})();