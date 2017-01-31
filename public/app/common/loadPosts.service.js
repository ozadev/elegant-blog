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
            return $http.get('/assets/data/posts.json', { cache: true })
                .then(function(resp) {
                    return resp.data;
                });
        }

        function getPostsByCategory(id) {
            return service.getPostsAll()
                .then(function (posts) {
                    return posts.filter(function(item) {
                        return item.category === id;
                    })
                });
        }

        function getPostsByTag(id) {
            return service.getPostsAll()
                .then(function (posts) {
                    return posts.filter(function(item) {
                        return item.tags.indexOf(id) !== -1;
                    })
                });
        }

        function getPostById(id) {
            return service.getPostsAll()
                .then(function (posts) {
                    return posts.filter(function(item) {
                        return item.id === +id;
                    })[0];
                });
        }

    }

})();