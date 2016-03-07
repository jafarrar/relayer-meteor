angular.module('relayer').directive('relayer', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/relayer/relayer.html',
        controllerAs: 'vm',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

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
            }
        }
    }
});
