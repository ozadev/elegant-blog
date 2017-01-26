(function () {
    'use strict';

    angular.module('blogApp').controller("mainCtrl", [
        '$scope',
        'getGlobalData',
        function ($scope, getGlobalData) {

            var vm = this;

            getGlobalData.getCategories()
                .then(function(data) {
                    vm.categories = data;
                });

            getGlobalData.getTags()
                .then(function(data) {
                    vm.tags = data;
                });

            getGlobalData.getPopularPosts()
                .then(function(data) {
                    vm.popularPostsList = data;
                });


            //
            // Slideout menu
            //
            var slideoutMenuWidth = 250;

            vm.slideout = new Slideout({
                'panel': document.getElementById('panel'),
                'menu': document.getElementById('menu'),
                'padding': slideoutMenuWidth,
                'tolerance': 70,
                'side': 'right'
            });

            vm.menuState = {opened: false};

            vm.slideout.on('beforeopen', function() {
                console.log('beforeopen');
                if (!vm.menuState.opened) {
                    $scope.$apply(vm.menuState.opened = true);
                }
            });

            vm.slideout.on('beforeclose', function() {
                console.log('beforeclose');
                if (vm.menuState.opened) {
                    $scope.$apply(vm.menuState.opened = false);
                }
            });

        }]);

})();