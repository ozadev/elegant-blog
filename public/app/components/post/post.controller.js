(function () {
    'use strict';

    angular.module('blogApp').controller("postCtrl", [
        '$sce',
        'dataResolve',
        function ($sce, dataResolve) {

            var vm = this;

            vm.sce = $sce;

            vm.post = dataResolve.post;
            vm.categories = dataResolve.categories;
            vm.tags = dataResolve.tags;
            vm.popularPostsList = dataResolve.popularPostsList;
        }
    ]);

})();