angular.module('relayer').directive('relayer', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/relayer/relayer.html',
        controllerAs: 'vm',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.subscribe('users');
            this.subscribe('channels');

            this.helpers({
                isLoggedIn: () => {
                    return Meteor.userId() !== null;
                },
                currentUser: () => {
                    return Meteor.user();
                },
                channels: () => {
                    return Channels.find({});
                }
            });

            this.logout = () => {
                Accounts.logout();
                $state.go('login');
            }
        }
    }
});
