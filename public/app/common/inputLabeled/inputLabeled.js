
(function () {
  'use strict';

  angular.module('blogApp').directive('inputLabeled', [
    '$document',
    '$window',
    '$interval',
    'textAngularManager',
    function ($document, $window, $interval, textAngularManager) {
      return {
        templateUrl: '/app/common/inputLabeled/inputLabeled.html',
        restrict: 'AE',
        replace: true,
        scope: {
          variables: '=',
          textModel: '='
        },
        link: function (scope, element, attr) {

          // element.ready(function() {
          // });

          var savedSelection;
          var editor = textAngularManager.retrieveEditor('editor1').scope;
          scope.resultText = '';

          $interval(function() {
            var elem = angular.element('<div>')[0];
            elem.innerHTML = scope.textView;
              if(elem.firstElementChild.tagName === 'P') {
                elem = elem.firstElementChild;
              }
            if (elem.querySelectorAll('span.rangySelectionBoundary')) {
              elem.querySelectorAll('span.rangySelectionBoundary')
                  .forEach(function(item) {item.remove()});
            }

            // console.log(editor.html);
            var customList = elem.querySelectorAll('span.label-template');
            if (customList) {
              customList.forEach(function(item) {
                item.insertAdjacentHTML('afterEnd', '{{' + item.getAttribute('type') + '}}');
                item.remove();
              });
            }
            scope.resultText = elem.innerHTML.replace(new RegExp('&nbsp;','g'), '');

          }, 100);



          scope.isOpened = false;

          scope.placeElement = placeElement;

          scope.textView = transformToView(scope.textModel);


          //<span class="list-item-elem">val</span>
          // scope.textView = scope.text;

          // scope.$watch(function() {return scope.text}, function() {
          //   scope.textView = transform(scope.text);
          // });


          // scope.$watch(function() {
          //   return window.getSelection().baseOffset;
          //
          // }, function(newVal) {
          //   scope.carret = newVal;
          // });

          // scope.$watch(function() {return scope.textView}, function(newVal, prevVal) {
            // if (newVal != prevVal) {
            //   console.log(scope.textView.slice(-5, -4));
               // scope.text += scope.textView.slice(-4);
            // }
          // });


          scope.saveCursor = function() {
            console.log(savedSelection);
            // if(angular.isUndefined(savedSelection)) {
              editor.displayElements.text[0].focus();
            // }
            savedSelection = $window.rangy.saveSelection();
          };

          scope.select = function (item) {

            var labelElem = angular.element('<span>');
            labelElem.attr('value', scope.variables[item].name);
            labelElem.attr('type', item);
            labelElem.attr('style', 'background-image: url(' + scope.variables[item].iconSrc + ')');
            labelElem.addClass('label-template');

            // var labelElem = angular.element('<span class="test-content" value="' + scope.variables[newItem].name + '" type="'+ newItem +'"></span>')[0];
            placeElement(labelElem[0]);

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

          function transformToView(text) {
            // var varsArr = text.match(/\{([^}]+)\}}/gm); // with {{}}
            var varsArr = text.match(/([^{{]*?)\w(?=\}})/gmi); // without {{}}

            varsArr.forEach(function(item) {
              var labelElem = angular.element('<span>');
              labelElem.attr('value', scope.variables[item].name);
              labelElem.attr('type', item);
              labelElem.attr('style', 'background-image: url(' + scope.variables[item].iconSrc + ')');
              labelElem.addClass('label-template');
              text = text.replace('{{' + item + '}}', labelElem[0].outerHTML + '&nbsp');
            });

            return text;
          }

          function transformToText(view) {

            var elem = angular.element('<div>')[0];

            elem.innerHTML = scope.textView;

            // remove parent 'p' tag
            if(elem.firstElementChild.tagName === 'P') {
              elem = elem.firstElementChild;
            }

            // remove
            if (elem.querySelectorAll('span.rangySelectionBoundary')) {
              elem.querySelectorAll('span.rangySelectionBoundary').forEach(function(item) {
                  item.remove()
                });
            }

            // console.log(editor.html);
            var customList = elem.querySelectorAll('span.label-template');
            if (customList) {
              customList.forEach(function(item) {
                item.insertAdjacentHTML('afterEnd', '{{' + item.getAttribute('type') + '}}');
                item.remove();
              });
            }
            scope.resultText = elem.innerHTML.replace(new RegExp('&nbsp;','g'), '');

          }


          function placeElement(customElem) {
            editor.displayElements.text[0].focus();
            $window.rangy.restoreSelection(savedSelection);
            editor.wrapSelection('insertHTML', customElem.outerHTML + '&nbsp', true);
          }

        }
      }
    }])
})();
