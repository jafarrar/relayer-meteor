const requireLogin = {
    currentUser: ['$q', ($q) => {
        if (Meteor.userId() === null) {
            return $q.reject('AUTH_REQUIRED');
        }
        return $q.resolve();
    }]
};

angular.module('relayer')
    .config(($urlRouterProvider, $stateProvider, $locationProvider) => {
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
                onEnter: () => {
                    JWPlayer.load(Meteor.settings.public.jwPlayerKey);
                }
            });

        $urlRouterProvider.otherwise('/');
    })
    .run(($rootScope, $state) => {
        $rootScope.$on('$stateChangeError',
            (event, toState, toParams, fromState, fromParams, error) => {
                if (error == 'AUTH_REQUIRED') {
                    $state.go('login');
                }
            }
        );
    });
