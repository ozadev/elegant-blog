(function () {
    'use strict';

    angular
        .module('blogApp')
        .controller("mainCtrl", mainCtrl);

    mainCtrl.$inject = ['$scope', 'loadGlobalData'];

    function mainCtrl($scope, loadGlobalData) {

        var vm = this;

        vm.categories = {};
        vm.tags = {};
        vm.popularPostsList = [];

        loadGlobalData.getGlobalData()
            .then(getGlobalData)
            .catch(getGlobalDataError);

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

        //////

        // getGlobalData() promise resolve function
        function getGlobalData(data) {
            vm.categories = data.categories;
            vm.tags = data.tags;
            vm.popularPostsList = data.popularPostsList;

            return data;
        }

        // getGlobalData() promise reject function
        function getGlobalDataError(err) {
            console.error('Error with getGlobalData() promise at app.controller');
            console.error(err);
        }

    }

})();