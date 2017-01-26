
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
                    controllerAs: 'vm',
                    resolve: {
                        postsList: [
                            'getPosts',
                            function(getPosts) {
                                console.log('route /');
                                return getPosts.getPostsAll();
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
                        postsList: [
                            '$stateParams',
                            'getPosts',
                            function($stateParams, getPosts) {
                                console.log('route /category/' + $stateParams.id);
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
                    controllerAs: 'vm',
                    resolve: {
                        postsList: [
                            '$stateParams',
                            'getPosts',
                            'getGlobalData',
                            function($stateParams, getPosts, getGlobalData) {
                                // console.log('route /tag/' + $stateParams.id);
                                // return getPosts.getPostsByTag($stateParams.id);
                                var data = {};

                                getPosts.getPostsByTag($stateParams.id)
                                    .then(function(post) {
                                        data.post = post;
                                    });

                                getGlobalData.getCategories()
                                    .then(function(categories) {
                                        data.categories = categories;
                                    });

                                getGlobalData.getTags()
                                    .then(function(tags) {
                                        data.tags = tags;
                                    });

                                getGlobalData.getPopularPosts()
                                    .then(function(popularPostsList) {
                                        data.popularPostsList = popularPostsList;
                                    });

                                return data;

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
                        dataResolve: [
                                '$stateParams',
                                'getPosts',
                                'getGlobalData',
                                function($stateParams, getPosts, getGlobalData) {
                                    console.log('route /post/' + $stateParams.id);

                                    var data = {};

                                    getPosts.getPostById($stateParams.id)
                                        .then(function(post) {
                                            data.post = post;
                                        });

                                    getGlobalData.getCategories()
                                        .then(function(categories) {
                                            data.categories = categories;
                                        });

                                    getGlobalData.getTags()
                                        .then(function(tags) {
                                            data.tags = tags;
                                        });

                                    getGlobalData.getPopularPosts()
                                        .then(function(popularPostsList) {
                                            data.popularPostsList = popularPostsList;
                                        });

                                    console.log(data);

                                    return data;
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