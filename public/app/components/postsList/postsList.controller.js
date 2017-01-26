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