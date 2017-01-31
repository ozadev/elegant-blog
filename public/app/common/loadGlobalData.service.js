(function () {
    'use strict';

    angular
        .module('blogApp')
        .factory('loadGlobalData', loadGlobalData);

    loadGlobalData.$inject = ['$http', '$q'];

    function loadGlobalData($http, $q) {

        var service = {
            getCategories: getCategories,
            getTags: getTags,
            getPopularPosts: getPopularPosts,
            getGlobalData: getGlobalData
        };

        return service;

        //////

        function getCategories() {
            return $http.get('/assets/data/categories.json', {cache: true})
                .then(function (res) {
                    return res.data;
                })
        }

        function getTags() {
            return $http.get('/assets/data/tags.json', {cache: true})
                .then(function (res) {
                    return res.data;
                });
        }

        function getPopularPosts() {
            return $http.get('/assets/data/popularPosts.json', {cache: true})
                .then(function (res) {
                    return res.data;
                });
        }

        function getGlobalData() {
            return $q.all({
                categories: service.getCategories(),
                tags: service.getTags(),
                popularPostsList: service.getPopularPosts()
            });
        }
    }


})();