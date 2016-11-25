
// app.config(['$interpolateProvider', function ($interpolateProvider) {
//     $interpolateProvider.startSymbol("[[");
//     $interpolateProvider.endSymbol("]]");
// }]);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/postsList.html',
            controller: 'postsListCtrl',
            resolve: {
                postsList: function(getPosts) {
                    console.log('route /');
                    return getPosts.getPostsAll();
                    // console.log($route.current.params.id);
                }
            }
        })
        .when('/category/:id', {
            templateUrl: 'views/postsList.html',
            controller: 'postsListCtrl',
            resolve: {
                postsList: function($route, getPosts) {
                    console.log('route /category/id');
                    return getPosts.getPostsByCategory($route.current.params.id);
                }
            }
        })
        .when('/tag/:id', {
            templateUrl: 'views/postsList.html',
            controller: 'postsListCtrl',
            resolve: {
                postsList: function($route, getPosts) {
                    console.log('route /tag/id');
                    return getPosts.getPostsByTag($route.current.params.id);
                }
            }
        })
        .when('/post/:id', {
            templateUrl: 'views/post.html',
            controller: ['$scope', 'post', function($scope, post) {
                $scope.post = post;
            }],
            resolve: {
                post: function($route, getPosts) {
                    console.log('route /post/id');
                    return getPosts.getPostById($route.current.params.id);
                }
            }
        })
        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
