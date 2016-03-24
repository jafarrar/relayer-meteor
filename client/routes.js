let requireLogin = {
    currentUser: ['$q', function($q) {
        if (Meteor.userId() == null) {
            console.log("null");
            return $q.reject('AUTH_REQUIRED');
        }
        else {
            console.log("not null");
            return $q.resolve();
        }
    }]
};

angular.module('relayer')
    .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                template: '<streams-list></streams-list>',
                resolve: requireLogin
            })
            .state('login', {
                url: '/login',
                template: '<login></login>'
            })
            .state('register', {
                url: '/register',
                template: '<register></register>'
            })
            .state('resetpw', {
                url: '/resetpw',
                template: '<resetpw></resetpw>'
            })
            .state('users', {
                url: '/users',
                template: '<users></users>',
                resolve: requireLogin
            })
            .state('streamEdit', {
                url: '/stream/:slug/edit',
                template: '<stream-edit></stream-edit>',
                resolve: requireLogin
            })
            .state('streamView', {
                url: '/stream/:slug',
                template: '<stream-view></stream-view>',
                onEnter: function() {
                    JWPlayer.load(Meteor.settings.public.jwPlayerKey);
                }
            });

        $urlRouterProvider.otherwise("/");
    })
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === 'AUTH_REQUIRED') {
                $state.go('login');
            }
        });
    });
