
app.controller("mainCtrl", [
    '$scope',
    '$window',
    '$http',
    '$sce',
    function ($scope, $window, $http, $sce) {

        $scope.deviceScreenType = ($window.innerWidth < 768) ? 'mobile' :
            ($window.innerWidth < 992) ? 'tablet' : 'desktop';

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
