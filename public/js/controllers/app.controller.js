
app.controller("mainCtrl", [
    '$scope',
    '$window',
    '$http',
    '$sce',
    function ($scope, $window, $http, $sce) {

        $http.get('data/categories.json', { cache: true }).then(function(resp) {
            $scope.categories = resp.data;
        });

        $http.get('data/tags.json', { cache: true }).then(function(resp) {
            console.log(resp);
            $scope.tags = resp.data;
        });

        $http.get('data/popularPosts.json', { cache: true }).then(function(resp) {
            $scope.popularPostsList = resp.data;
        });

        $scope.sce = $sce;


    }]);
