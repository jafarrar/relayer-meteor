angular.module('relayer').directive('users', () => {
    return {
        restrict: 'E',
        templateUrl: 'client/users/users.html',
        controllerAs: 'ua',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            this.credentials = {
                email: '',
                password: ''
            };

            this.error = {};
            this.activeError = false;

            this.subscribe('users');

            this.helpers({
                users: () => {
                    return Meteor.users.find({});
                }
            });

            this.createUser = () => {
                this.call('addUser', this.credentials, (error) => {
                    if (error) {
                        this.error = error.reason;
                        this.activeError = true;
                    } else {
                        this.activeError = false;
                        this.error = {};
                        this.credentials = {};
                    }
                });
            };

            this.removeUser = (user) => {
                if (!confirm('Remove user?')) {
                    return false;
                }

                Meteor.call('removeUser', user._id, (error) => {
                    if (error) {
                        this.error = error.reason;
                    } else {
                        this.error = {};
                    }
                });

                return true;
            };

            this.setAdmin = (targetUser) => {
                this.call('toggleAdmin', targetUser._id, Meteor.userId(), (error) => {
                    if (error) {
                        this.error = error.reason;
                    } else {
                        this.error = {};
                    }
                });
            };

            this.generatePassword = () => {
                this.credentials.password = Random.id(12);
            };
        }
    };
});
