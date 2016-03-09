angular.module('relayer')
    .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                template: '<streams-list></streams-list>',
                resolve: {
                    currentUser: ($q) => {
                        if (Meteor.userId() == null) {
                            return $q.reject('AUTH_REQUIRED');
                        }
                        else {
                            return $q.resolve();
                        }
                    }
                }
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
            .state('streamEdit', {
                url: '/:slug/edit',
                template: '<stream-edit></stream-edit>',
                resolve: {
                    currentUser: ($q) => {
                        if (Meteor.userId() == null) {
                            return $q.reject('AUTH_REQUIRED');
                        }
                        else {
                            return $q.resolve();
                        }
                    }
                }
            })
            .state('streamView', {
                url: '/:slug',
                template: '<stream-view></stream-view>',
                onEnter: function() {
                    JWPlayer.load(Meteor.settings.public.jwplayerKey);
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
