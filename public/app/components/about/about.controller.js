(function () {
    'use strict';

    angular
        .module('blogApp')
        .controller("aboutCtrl", aboutCtrl);

    aboutCtrl.$inject = ['$sce'];

    function aboutCtrl($sce) {

        var vm = this;

        vm.sce = $sce;

        vm.test = 'lala';

        vm.textModel = 'Lorem {{email_from}} ipsum dolor {{email_to}} la ';

        vm.variables = {
            email_from: {
                name: "test@upwork.com",
                iconSrc: "/assets/img/icon-doc1.jpg"
            },
            email_to : {
                name : "to@upwork.com",
                iconSrc: "/assets/img/icon-doc2.jpg"
            },
            email_subject : {
                name : "our meeting next week",
                iconSrc: "/assets/img/icon-doc3.jpg"
            },
            email_from2: {
              name: "test@upwork.com",
              iconSrc: "/assets/img/icon-doc1.jpg"
            },
            email_to2 : {
              name : "to@upwork.com",
              iconSrc: "/assets/img/icon-doc2.jpg"
            },
            email_subject2 : {
              name : "our meeting next week",
              iconSrc: "/assets/img/icon-doc3.jpg"
            }
        };

    }

})();