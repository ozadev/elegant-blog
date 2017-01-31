(function () {
    'use strict';

    angular
        .module('blogApp')
        .controller("postsListCtrl", postsListCtrl);

    postsListCtrl.$inject = ['$sce', 'postsListResolve', 'loadGlobalData'];

    function postsListCtrl ($sce, postsListResolve, loadGlobalData) {

        var vm = this;

        vm.sce = $sce;
        vm.postsList = postsListResolve;
        vm.categories = {};
        vm.tags = {};
        vm.popularPostsList = [];

        loadGlobalData.getGlobalData()
            .then(getGlobalData)
            .catch(getGlobalDataError);

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
            console.error('Error with getGlobalData() promise at postsList.controller.js');
            console.error(err);
        }

    }

})();