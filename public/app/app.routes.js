//
//
//
(function () {
    'use strict';

    angular
        .module('blogApp')
        .config([
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
                        controllerAs: 'vm',
                        resolve: {
                            postsListResolve: [
                                'loadPosts',
                                function(loadPosts) {
                                    console.log('route /');
                                    return loadPosts.getPostsAll();
                                }
                            ]
                        }
                    },
                    {
                        name: 'category',
                        url: '/category/:id',
                        templateUrl: 'app/components/postsList/postsList.html',
                        controller: 'postsListCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            postsListResolve: [
                                '$stateParams',
                                'loadPosts',
                                function($stateParams, loadPosts) {
                                    console.log('route /category/' + $stateParams.id);
                                    return loadPosts.getPostsByCategory($stateParams.id);
                                }
                            ]
                        }
                    },
                    {
                        name: 'tag',
                        url: '/tag/:id',
                        templateUrl: 'app/components/postsList/postsList.html',
                        controller: 'postsListCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            postsListResolve: [
                                '$stateParams',
                                'loadPosts',
                                function($stateParams, loadPosts) {
                                    console.log('route /tag/' + $stateParams.id);
                                    return loadPosts.getPostsByTag($stateParams.id);
                                }
                            ]
                        }
                    },
                    {
                        name: 'post',
                        url: '/post/:id',
                        templateUrl: 'app/components/post/post.html',
                        controller: 'postCtrl',
                        controllerAs: 'vm',
                        resolve: {
                            postResolve: [
                                '$stateParams',
                                'loadPosts',
                                function($stateParams, loadPosts) {
                                    console.log('route /post/' + $stateParams.id);
                                    return loadPosts.getPostById($stateParams.id);
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