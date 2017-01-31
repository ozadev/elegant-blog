(function () {
    'use strict';

    angular
        .module('blogApp')
        .factory('loadPosts', loadPosts);

    loadPosts.$inject = ['$http'];

    function loadPosts($http) {

        var service = {
            getPostsAll: getPostsAll,
            getPostsByCategory: getPostsByCategory,
            getPostsByTag: getPostsByTag,
            getPostById: getPostById
        };

        return service;

        ///////

        function getPostsAll() {
            return $http.get('/api/posts', { cache: true })
                .then(function(resp) {
                    return resp.data;
                });
        }

        function getPostsByCategory(id) {
            return $http.get('/api/categories/' + id, { cache: true })
                .then(function(resp) {
                    return resp.data;
                });
        }

        function getPostsByTag(id) {
            return $http.get('/api/tags/' + id, { cache: true })
                .then(function(resp) {
                    return resp.data;
                });
        }

        function getPostById(id) {
            return $http.get('/api/posts/' + id, { cache: true })
                .then(function(resp) {
                    return resp.data;
                });
        }

    }

})();