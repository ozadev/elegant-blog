
// app.config(['$interpolateProvider', function ($interpolateProvider) {
//     $interpolateProvider.startSymbol("[[");
//     $interpolateProvider.endSymbol("]]");
// }]);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/:id?', {
            templateUrl: 'views/postsList.html',
            controller: 'postsListCtrl',
            resolve: {
                postsList: function($route) {
                    console.log($route.current.params.id);
                    var postsList = [
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
                    ];

                    if ($route.current.params.id === 'electronics') {
                        postsList = [
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
                            }
                        ];
                    }

                    if ($route.current.params.id === 'linux') {
                        postsList = [
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
                        ];
                    }

                    return postsList;
                }
            }
        })
        .when('/category/:id', {
            templateUrl: 'views/postsList.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
