angular.module('relayer').directive('relayer', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/relayer/relayer.html',
        controllerAs: 'vm',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.subscribe('users');

            this.streamChannels = Meteor.settings.public.applicationList;

            this.helpers({
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                },
                currentUser: () => {
                    return Meteor.user();
                }
            });

            this.logout = () => {
                Accounts.logout();
                $state.go('login');
            }
        }
    }
});
