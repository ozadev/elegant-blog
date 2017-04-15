(function () {
    'use strict';

    angular.module('blogApp', [
        'ui.router'
    // 'ngCookies',
    // 'ngAnimate',
    ]);

})();

// (function () {
//     'use strict';
//
//     angular.module('blogApp').config([
//         '$rootScope',
//         function ($rootScope) {
//
//         }
//     ]);
//
// })();
//

(function () {
    'use strict';

    angular.module('blogApp').controller("mainCtrl", [
        '$scope',
        '$window',
        '$http',
        '$sce',
        function ($scope, $window, $http, $sce) {

            $scope.sce = $sce;

            $scope.deviceScreenType = ($window.innerWidth < 768) ? 'mobile' :
                ($window.innerWidth < 992) ? 'tablet' : 'desktop';

            $http.get('/assets/data/categories.json', { cache: true })
                .then(function(resp) {
                    $scope.categories = resp.data;
                });

            $http.get('/assets/data/tags.json', { cache: true })
                .then(function(resp) {
                    console.log(resp);
                    $scope.tags = resp.data;
                });

            $http.get('/assets/data/popularPosts.json', { cache: true })
                .then(function(resp) {
                    $scope.popularPostsList = resp.data;
                });

            var slideoutMenuWidth = 250;

            // if ($scope.deviceScreenType === 'mobile') {
            //     slideoutMenuWidth = $window.innerWidth - 60;
            // }
            // if ($scope.deviceScreenType === 'tablet') {
            //     slideoutMenuWidth = 250;
            // }

            $scope.slideout = new Slideout({
                'panel': document.getElementById('panel'),
                'menu': document.getElementById('menu'),
                'padding': slideoutMenuWidth,
                'tolerance': 70,
                'side': 'right'
            });

            $scope.menuState = {opened: false};

            $scope.slideout.on('beforeopen', function() {
                console.log('beforeopen');
                if (!$scope.menuState.opened) {
                    $scope.$apply($scope.menuState.opened = true);
                }
            });

            // $scope.slideout.on('open', function() {
            //     console.log('open');
            //     // if (!$scope.menuState.opened) {
            //     $scope.$apply($scope.menuState.opened = true);
            //     // }
            // });

            $scope.slideout.on('beforeclose', function() {
                console.log('beforeclose');
                if ($scope.menuState.opened) {
                    $scope.$apply($scope.menuState.opened = false);
                }
            });
            // $scope.slideout.on('close', function() {
            //     console.log('close');
            //     // if ($scope.menuState.opened) {
            //     $scope.$apply($scope.menuState.opened = false);
            //     // }
            // });

        }]);

})();

(function () {
    'use strict';

    angular.module('blogApp').config([
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider) {

            var states = [
                {
                    name: 'index',
                    url: '/',
                    templateUrl: 'app/components/postsList/postsList.html',
                    controller: 'postsListCtrl',
                    resolve: {
                        postsList: [
                            'getPosts',
                            function(getPosts) {
                                console.log('route /');
                                return getPosts.getPostsAll();
                                // console.log($route.current.params.id);
                            }
                        ]
                    }
                },
                {
                    name: 'category',
                    url: '/category/:id',
                    templateUrl: 'app/components/postsList/postsList.html',
                    controller: 'postsListCtrl',
                    resolve: {
                        postsList: [
                            '$stateParams',
                            'getPosts',
                            function($stateParams, getPosts) {
                                console.log('route /category/id');
                                return getPosts.getPostsByCategory($stateParams.id);
                            }
                        ]
                    }
                },
                {
                    name: 'tag',
                    url: '/tag/:id',
                    templateUrl: 'app/components/postsList/postsList.html',
                    controller: 'postsListCtrl',
                    resolve: {
                        postsList: [
                            '$stateParams',
                            'getPosts',
                            function($stateParams, getPosts) {
                                console.log('route /tag/id');
                                return getPosts.getPostsByTag($stateParams.id);
                            }
                        ]
                    }
                },
                {
                    name: 'post',
                    url: '/post/:id',
                    templateUrl: 'app/components/post/post.html',
                    controller: ['$scope', 'post', function($scope, post) {
                        $scope.post = post;
                    }],
                    resolve: {
                    post: [
                            '$stateParams',
                            'getPosts',
                            function($route, getPosts) {
                                console.log('route /post/id');
                                return getPosts.getPostById($stateParams.id);
                            }
                        ]
                    }
                },
                {
                    name: 'about',
                    url: '/about',
                    templateUrl: 'app/components/about/about.html'
                }

            ];



            // Loop over the state definitions and register them
            states.forEach(function(state) {
                $stateProvider.state(state);
            });

            // Default route
            $urlRouterProvider.otherwise("/");

            // Set hashbang prefix
            $locationProvider.hashPrefix('');

        }
    ]);

})();

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
(function () {
    'use strict';


    angular.module('blogApp').factory('getPosts', function($http) {
        var service = {
            getPostsAll: function() {
                return $http.get('/assets/data/posts.json', { cache: true })
                    .then(function(resp) {
                        return resp.data;
                    });
            },

            getPostsByCategory: function(id) {
                return service.getPostsAll()
                    .then(function (posts) {
                        return posts.filter(function(item) {
                            return item.category === id;
                        })
                    });
            },

            getPostsByTag: function(id) {
                return service.getPostsAll()
                    .then(function (posts) {
                        return posts.filter(function(item) {
                            return item.tags.indexOf(id) !== -1;
                        })
                    });
            },

            getPostById: function(id) {
                return service.getPostsAll()
                    .then(function (posts) {
                        return posts.filter(function(item) {
                            return item.id === +id;
                        })[0];
                    });
            }

        };

        return service;
    });

})();
(function () {
    'use strict';

    angular.module('blogApp').directive('menuSwitchBtn', [
        '$timeout',
        function ($timeout) {
            return {
                restrict: 'EA',
                scope: {
                    title: '@',
                    titleHideTime: '@',
                    titleShowDelay: '@',
                    transformDelay: '@',
                    transformTime: '@',
                    menuState: '='
                },
                replace: true,
                template:
                    '<div class="menu-switcher menu-open" data-ng-class="{\'menu-open\': !menuState.opened, \'menu-close\': menuState.opened}">' +
                        '<div class="line-top"></div>' +
                        '<div class="line-middle"></div>' +
                        '<div class="line-bottom"></div>' +
                        '<div class="title">{{title}}</div>' +
                    '</div>',
                link: function (scope, element, attr) {

                }
            }
        }
    ]);

})();



// scope.$watch(scope.showElemOnIf, function(value) {
//
//     if (value) {
//         element.css({
//             opacity : '0',
//             display: 'block'
//         });
//
//         $timeout(function() {
//             element.css({
//                 transition: scope.appearDelay + 'ms',
//                 opacity : '1'
//             });
//         }, scope.showDelay);
//
//         $timeout(function() {
//             element.css({
//                 opacity : '0'
//             });
//         }, +scope.showDuration + +scope.showDelay);
//
//         $timeout(function() {
//             element.css({
//                 transition: 'none',
//                 display: 'none'
//             });
//         }, +scope.showDuration + +scope.showDelay + +scope.appearDelay);
//     }
// });
(function () {
    'use strict';

    angular.module('blogApp').controller("postsListCtrl", [
        '$scope',
        'postsList',
        '$window',
        '$http',
        '$sce',
        function ($scope, postsList, $window, $http, $sce) {

            $scope.sce = $sce;

            $scope.deviceScreenType = ($window.innerWidth < 768) ? 'mobile' :
                ($window.innerWidth < 992) ? 'tablet' : 'desktop';

            $http.get('/assets/data/categories.json', { cache: true })
                .then(function(resp) {
                    $scope.categories = resp.data;
                });

            $http.get('/assets/data/tags.json', { cache: true })
                .then(function(resp) {
                    console.log(resp);
                    $scope.tags = resp.data;
                });

            $http.get('/assets/data/popularPosts.json', { cache: true })
                .then(function(resp) {
                    $scope.popularPostsList = resp.data;
                });

            $scope.postsList = postsList;

        }
    ]);

})();