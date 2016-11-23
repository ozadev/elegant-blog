
app.controller("mainCtrl", [
    '$scope',
    '$window',
    '$http',
    function ($scope, $window, $http) {

        $scope.categories = {
            0: 'Electronics',
            1: 'Software embedded',
            2: 'CADs',
            3: 'FPGA digital design',
            4: 'Linux'
        };

        $scope.tags = {
            0: 'asm',
            1: 'c++',
            2: 'digital design',
            3: 'FPGA',
            4: 'programming',
            5: 'ARM'
        };

        $scope.postsList = [
            {
                id: 0,
                title: 'Lorem ipsum dolor sit amet, his affert platonem intellegat at, blandit maluisset constituto his ne.',
                preview: 'Et nec consetetur efficiantur. No eum eros reque solet, ius ne expetenda repudiare. Ei his sale prompta suscipiantur, dicunt ancillae copiosae ei mel, nec dicam ridens dolores at. Et his vide inciderint, pri cu convenire molestiae. Ex alterum propriae complectitur mei. Ea vero tritani his, eros adhuc omnium ut per.',
                category: 0,
                tags: [0, 1],
                date: 'Oct 10, 2016',
                author: 'John Doe',
                commentsNum: 10,
                posterSrc: './content/0/poster.jpg'
            },
            {
                id: 1,
                title: 'Lorem ipsum dolor sit amet, his affert platonem intellegat at, blandit maluisset constituto his ne.',
                preview: 'Et nec consetetur efficiantur. No eum eros reque solet, ius ne expetenda repudiare. Ei his sale prompta suscipiantur, dicunt ancillae copiosae ei mel, nec dicam ridens dolores at. Et his vide inciderint, pri cu convenire molestiae. Ex alterum propriae complectitur mei. Ea vero tritani his, eros adhuc omnium ut per.',
                category: 4,
                tags: [3, 4],
                date: 'Sep 21, 2016',
                author: 'John Doe',
                commentsNum: 3,
                posterSrc: './content/1/poster.jpg'
            }
        ]

        $scope.popularPostsList = [
            {
                id: 0,
                title: 'Lorem ipsum dolor sit amet, his affert platonem intellegat at, blandit maluisset constituto his ne.',
                date: 'Oct 10, 2016',
                posterSrc: './content/0/poster-mini.jpg'
            },
            {
                id: 1,
                title: 'Lorem ipsum dolor sit amet, his affert platonem intellegat at, blandit maluisset constituto his ne.',
                date: 'Sep 21, 2016',
                posterSrc: './content/1/poster-mini.jpg'
            }
        ]


    }]);
