angular.module('relayer')
    .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                template: '<relayer></relayer>'
            })

        $urlRouterProvider.otherwise("/");
    });
