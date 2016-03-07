angular.module('relayer')
    .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                template: '<streams-list></streams-list>'
            })
            .state('streamEdit', {
                url: '/:streamId/edit',
                template: '<stream-edit></stream-edit>'
            })

        $urlRouterProvider.otherwise("/");
    });
