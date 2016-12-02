
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

        $scope.slideout = new Slideout({
            'panel': document.getElementById('panel'),
            'menu': document.getElementById('menu'),
            'padding': 256,
            'tolerance': 70,
            'side': 'right'
        });

        $scope.menuState = {opened: false};

        $scope.slideout.on('open', function() {
            $scope.$apply($scope.menuState.opened = true);

        });

        $scope.slideout.on('close', function() {
            $scope.$apply($scope.menuState.opened = false);
        });


    }]);
