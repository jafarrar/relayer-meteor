angular.module('relayer')
    .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                template: '<streams-list></streams-list>'
            })
            .state('streamEdit', {
                url: '/:slug/edit',
                template: '<stream-edit></stream-edit>'
            })
            .state('streamView', {
                url: '/:slug',
                template: '<stream-view></stream-view>',
                onEnter: function() {
                    JWPlayer.load(Meteor.settings.public.jwplayerKey);
                }
            })

        $urlRouterProvider.otherwise("/");
    });
