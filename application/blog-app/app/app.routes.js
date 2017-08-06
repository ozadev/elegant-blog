
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
                    templateUrl: '/app/components/postsList/postsList.html',
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
                    templateUrl: '/app/components/postsList/postsList.html',
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
                    templateUrl: '/app/components/postsList/postsList.html',
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
                    templateUrl: '/app/components/post/post.html',
                    controller: ['$scope', 'post', function($scope, post) {
                        $scope.post = post;
                    }],
                    resolve: {
                    post: [
                            '$stateParams',
                            'getPosts',
                            function($stateParams, getPosts) {
                                console.log('route /post/id');
                                return getPosts.getPostById($stateParams.id);
                            }
                        ]
                    }
                },
                {
                    name: 'about',
                    url: '/about',
                    templateUrl: '/app/components/about/about.html'
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