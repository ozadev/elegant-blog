(function () {
    'use strict';

    angular
        .module('blogApp')
        .controller("postCtrl", postCtrl);

    postCtrl.$inject = ['$sce', 'postResolve', 'loadGlobalData'];

    function postCtrl($sce, postResolve, loadGlobalData) {

        var vm = this;

        vm.sce = $sce;
        vm.post = postResolve;
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
            console.error('Error with getGlobalData() promise at post.controller.js');
            console.error(err);
        }
    }

})();