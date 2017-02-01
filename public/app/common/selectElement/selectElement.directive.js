
(function () {
  'use strict';

  angular.module('blogApp').directive('selectElement', [
    '$document',
    function ($document) {
      return {
        templateUrl: '/app/common/selectElement/selectElement.html',
        restrict: 'AE',
        replace: true,
        scope: {
          selected: '=',
          list: '='
        },
        link: function (scope, element, attr) {

          scope.variables = {
            "email_from" : "test@upwork.com",
            "email_to" : "to@upwork.com",
            "email_subject" : "our meeting next week"
          };

          scope.text = 'textAngular is a super cool fff {{email_from}} lala {{email_subject}} gdfgdfgdfgdf dfgdfgdfg';
          scope.textModel = transform(scope.text);

          //<span class="list-item-elem">val</span>
          // scope.textModel = scope.text;

          scope.$watch(function() {return scope.text}, function() {
            scope.textModel = transform(scope.text);
          });

          // scope.$watch(function() {return scope.textModel}, function() {
          //   scope.textModel = transform(scope.text);
          // });

          scope.isOpened = false;

          scope.select = function (newItem) {
            scope.text += ' ' + '{{' + newItem + '}}';
            scope.isOpened = false;
          };

          // Close at click outside
          $document.on('click', function (e) {
            if (element !== e.target && !element[0].contains(e.target)) {
              scope.$apply(function () {
                scope.$eval(scope.isOpened = false);
              });
            }
          });

          //////

          function transform(text) {
            console.log(text);
            // var varsArr = text.split(/{{(.*?)}}/);
            // var varsArr = text.match(/\{([^}]+)\}}/gm); // with {}
            var varsArr = text.match(/([^{{]*?)\w(?=\}})/gmi); // without {}
            console.log(varsArr);
            // console.log(text);
            varsArr.forEach(function(item) {
              text = text.replace('{{' + item + '}}', '<span class="test-content" value="' + scope.variables[item] + '"></span> ')
            });

            // console.log(text);

            return text;
          }

        }
      }
    }])
})();
