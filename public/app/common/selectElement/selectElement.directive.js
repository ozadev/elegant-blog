
(function () {
  'use strict';

  angular.module('blogApp').directive('selectElement', [
    '$document',
    '$window',
    '$interval',
    'textAngularManager',
    function ($document, $window, $interval, textAngularManager) {
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

          var savedSelection;
          var editor = textAngularManager.retrieveEditor('editor1').scope;
          scope.resultText;

          $interval(function() {
            var elem = angular.element('<div>')[0];
            elem.innerHTML = editor.html;
              if(elem.firstElementChild.tagName === 'P') {
                elem = elem.firstElementChild;
              }
            if (elem.querySelectorAll('span.rangySelectionBoundary')) {
              elem.querySelectorAll('span.rangySelectionBoundary')
                  .forEach(function(item) {item.remove()});
            }

            // console.log(editor.html);
            var customList = elem.querySelectorAll('span.test-content');
            if (customList) {
              customList.forEach(function(item) {
                item.insertAdjacentHTML('afterEnd', '{{' + item.getAttribute('type') + '}}');
                item.remove();
              });
            }
            scope.resultText = elem.innerHTML.replace(new RegExp('&nbsp;','g'), '');

            // console.log(resultText);

          }, 100);

          scope.variables = {
            email_from: {
              name: "test@upwork.com",
              iconSrc: "/assets/img/icon-doc1.jpg"
            },
            email_to : {
              name : "to@upwork.com",
              iconSrc: "/assets/img/icon-doc2.jpg"
            },
            email_subject : {
              name : "our meeting next week",
              iconSrc: "/assets/img/icon-doc3.jpg"
            }
          };

          scope.isOpened = false;

          scope.getCursorPosition = getCursorPosition;
          scope.placeElement = placeElement;

          scope.text = 'Lorem ipsum dolor {{email_from}} consectetur {{email_subject}} adipiscing ';
          scope.textModel = transform(scope.text);


          //<span class="list-item-elem">val</span>
          // scope.textModel = scope.text;

          // scope.$watch(function() {return scope.text}, function() {
          //   scope.textModel = transform(scope.text);
          // });


          // scope.$watch(function() {
          //   return window.getSelection().baseOffset;
          //
          // }, function(newVal) {
          //   scope.carret = newVal;
          // });

          // scope.$watch(function() {return scope.textModel}, function(newVal, prevVal) {
            // if (newVal != prevVal) {
            //   console.log(scope.textModel.slice(-5, -4));
               // scope.text += scope.textModel.slice(-4);
            // }
          // });


          scope.saveCursor = function() {
            savedSelection = $window.rangy.saveSelection();
          };

          scope.select = function (newItem) {
            var customElem = angular.element('<span class="test-content" value="' + scope.variables[newItem].name + '" type="'+ newItem +'"></span>')[0];
            placeElement(customElem);
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
            // var varsArr = text.match(/\{([^}]+)\}}/gm); // with {}
            var varsArr = text.match(/([^{{]*?)\w(?=\}})/gmi); // without {}

            varsArr.forEach(function(item) {
              var elem = angular.element('<span>');
              elem.attr('value', scope.variables[item].name);
              elem.attr('type', item);
              elem.attr('style', 'background-image: url(' + scope.variables[item].iconSrc + ')');
              elem.addClass('test-content');
              // console.log(elem[0].outerHTML);
              text = text.replace('{{' + item + '}}', elem[0].outerHTML + '&nbsp')
            });

            return text;
          }

          // function reTransform(text) {
          //   var varsArr = text.match(/<span class=(.*?)\/span>/i);
          //   console.log(varsArr);
          // }

          function getCursorPosition(newItem) {
            var sel, range;
            sel = window.getSelection();
            console.log(sel);
            if (sel.getRangeAt && sel.rangeCount) {
              scope.rango = sel.getRangeAt(0);
              scope.rango.insertNode(document.createTextNode('{{lala}}'));

              return sel.getRangeAt(0);
            }
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
