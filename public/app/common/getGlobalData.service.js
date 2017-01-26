(function () {
    'use strict';

    angular.module('blogApp').factory('getGlobalData', function($http) {

        var service = {

            getCategories: function() {
                return $http.get('/assets/data/categories.json', {cache: true})
                    .then(function (res) {
                        return res.data;
                    })
            },

            getTags: function() {
                return $http.get('/assets/data/tags.json', {cache: true})
                    .then(function (res) {
                        return res.data;
                    });
            },

            getPopularPosts: function() {
                return $http.get('/assets/data/popularPosts.json', {cache: true})
                    .then(function (res) {
                        return res.data;
                    });
            }

        };

        return service;
    });

})();