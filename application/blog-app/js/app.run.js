
(function () {
  'use strict';

  angular.module('blogApp').run([
        '$rootScope',
        '$window',
        '$document',
        function ($rootScope, $window, $document) {

            $rootScope.screenMobile = 768;

            $rootScope.screenType = ($window.innerWidth < 768) ? 'mobile' :
              ($window.innerWidth < 992) ? 'tablet' : 'desktop';

            angular.element($window).bind('resize', function() {
                var screenTypeNew = ($window.innerWidth < 768) ? 'mobile' :
                  ($window.innerWidth < 992) ? 'tablet' : 'desktop';
                if (screenTypeNew !== $rootScope.screenType) {
                    $rootScope.screenType = screenTypeNew;
                    $rootScope.$digest();
                }
            });

            $rootScope.isScreenDesktop = function() {
                return $rootScope.screenType === 'desktop';
            };

            $rootScope.isScreenMobile = function() {
                return $rootScope.screenType === 'mobile';
            };

            $rootScope.isScreenTablet = function() {
                return $rootScope.screenType === 'tablet';
            };

            // Set scroll at begin on reload
            $rootScope.$on('$stateChangeSuccess', function() {
              $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
            });

        }
    ]);

})();