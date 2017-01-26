(function () {
    'use strict';

    angular.module('blogApp').controller("postsListCtrl", [
        '$sce',
        'getGlobalData',
        'postsList',
        function ($sce, getGlobalData, postsList) {

            var vm = this;

            vm.sce = $sce;

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

            vm.postsList = postsList;

        }
    ]);

})();