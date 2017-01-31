(function () {
    'use strict';

    angular
        .module('blogApp')
        .factory('loadGlobalData', loadGlobalData);

    loadGlobalData.$inject = ['$http'];

    function loadGlobalData($http) {

        var service = {
            getGlobalData: getGlobalData
        };

        return service;

        //////

        function getGlobalData() {
            return $http.get('/api/global-data', {cache: true})
                .then(function (res) {
                    return res.data;
                });
        }
    }


})();