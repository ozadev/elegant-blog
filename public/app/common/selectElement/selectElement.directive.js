
(function () {
  'use strict';

  angular.module('blogApp').directive('selectElement', [
    '$document',
    '$window',
    function ($document, $window) {
      return {
        templateUrl: '/app/common/selectElement/selectElement.html',
        restrict: 'AE',
        replace: true,
        scope: {
          selected: '=',
          list: '='
        },
        link: function (scope, element, attr) {

          // element.ready(function() {
          // });

          scope.variables = {
            "email_from" : "test@upwork.com",
            "email_to" : "to@upwork.com",
            "email_subject" : "our meeting next week"
          };

          scope.text = 'textAngular is a super cool fff {{email_from}} lala {{email_subject}} gdfgdfgdfgdf dfgdfgdfg ';
          scope.textModel = transform(scope.text);
          reTransform(scope.textModel);

          //<span class="list-item-elem">val</span>
          // scope.textModel = scope.text;

          scope.$watch(function() {return scope.text}, function() {
            scope.textModel = transform(scope.text);
          });

          // scope.$watch(function() {return scope.textModel}, function(newVal, prevVal) {
            // if (newVal != prevVal) {
            //   console.log(scope.textModel.slice(-5, -4));
               // scope.text += scope.textModel.slice(-4);
            // }
          // });

          scope.isOpened = false;

          var status = false;

          scope.select = function (newItem) {

            status = true;
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
            // console.log(text);
            // var varsArr = text.split(/{{(.*?)}}/);
            // var varsArr = text.match(/\{([^}]+)\}}/gm); // with {}
            var varsArr = text.match(/([^{{]*?)\w(?=\}})/gmi); // without {}
            // console.log(varsArr);
            // console.log(text);
            varsArr.forEach(function(item) {
              if (status) {
                console.log(element[0].querySelector('span[data-key="' + item + '"]'));
                var width = $window.getComputedStyle(element[0].querySelector('span[data-key="' + item + '"]')).getPropertyValue("width");
                console.log(width);
                text = text.replace('{{' + item + '}}', '<span class="test-content" style="width: ' + width + '" value="' + scope.variables[item] + '"></span>&nbsp')
              }
              else {
                text = text.replace('{{' + item + '}}', '<span class="test-content" value="' + scope.variables[item] + '"></span>&nbsp')
              }

            });

            // console.log(text);

            return text;
          }


          function reTransform(text) {
            // text += 2;
            var varsArr = text.match(/<span class=(.*?)\/span>/i);
            console.log(varsArr);
            // return text;
          }

        }
      }
    }])
})();
