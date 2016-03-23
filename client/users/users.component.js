angular.module('relayer').directive('users', function() {
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
                this.call('addUser', this.credentials, (error, result) => {
                    if (error) {
                        console.log("Unable to add user", error);
                        this.error = error.reason;
                        this.activeError = true;
                    }
                    else {
                        console.log("User added", result);
                        this.activeError = false;
                        this.error = {};
                        this.credentials = {};
                    }
                });
            };

            this.removeUser = (user) => {
                if(!confirm("Remove user?")) {
                    return false;
                }

                Meteor.call('removeUser', user._id, (error) => {
                    if (error) {
                        console.log("Unable to remove user", error);
                    }
                    else {
                        console.log("User removed");
                    }
                });
            };

            this.setAdmin = (user) => {
                Meteor.users.update(user._id, {
                    $set: {
                        isAdmin: true
                    }
                });
            };

            this.revokeAdmin = (user) => {
                Meteor.users.update(user._id, {
                    $set: {
                        isAdmin: false
                    }
                });
            };

            this.generatePassword = () => {
                this.credentials.password = Random.id(12);
            }

        }
    }
})
