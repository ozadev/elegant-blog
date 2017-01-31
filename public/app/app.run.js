(function () {
    'use strict';

    angular
        .module('blogApp')
        .run([
            '$rootScope',
            '$window',
            '$document',
            function ($rootScope, $window, $document) {

                var screenTabletMin = 768; // bootstrap screen-sm-min
                var screenLaptopMin = 992; // bootstrap screen-md-min
                var screenDesktopMin = 1200; // bootstrap screen-lg-min

                $rootScope.globalData = {};

                $rootScope.screenType = ($window.innerWidth < screenTabletMin) ? 'mobile' :
                    ($window.innerWidth < screenLaptopMin) ? 'tablet' :
                        ($window.innerWidth < screenDesktopMin) ? 'laptop' : 'desktop';

                angular.element($window).bind('resize', function () {
                    var screenTypeNew = ($window.innerWidth < screenTabletMin) ? 'mobile' :
                        ($window.innerWidth < screenLaptopMin) ? 'tablet' :
                            ($window.innerWidth < screenDesktopMin) ? 'laptop' : 'desktop';
                    if (screenTypeNew !== $rootScope.screenType) {
                        $rootScope.screenType = screenTypeNew;
                        $rootScope.$digest();
                    }
                });

                $rootScope.isScreenMobile = function () {
                    return $rootScope.screenType === 'mobile';
                };

                $rootScope.isScreenTablet = function () {
                    return $rootScope.screenType === 'tablet';
                };

                $rootScope.isScreenLaptop = function () {
                    return $rootScope.screenType === 'laptop';
                };

                $rootScope.isScreenDesktop = function () {
                    return $rootScope.screenType === 'desktop';
                };


                // Set scroll at begin on reload
                $rootScope.$on('$stateChangeSuccess', function () {
                    $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
                });

            }
        ]);

})();