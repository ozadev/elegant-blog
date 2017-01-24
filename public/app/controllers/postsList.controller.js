app.controller("postsListCtrl", [
    '$scope',
    'postsList',
    function ($scope, postsList) {

        $scope.postsList = postsList;

    }]);
