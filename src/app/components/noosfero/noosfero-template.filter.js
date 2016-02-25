(function() {
  'use strict';
  angular
    .module("noosferoApp")
    .filter("noosferoTemplateFilter", function() {
      return function(text, options) {
        for(var option in options) {
          text = text.replace('{'+option+'}', options[option]);
        }
        return text;
      }
    })
})();
