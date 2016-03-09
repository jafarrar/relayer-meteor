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

            this.showAddUserForm = false;

            this.subscribe('users');

            this.helpers({
                users: () => {
                    return Meteor.users.find({});
                }
            });

            this.createUser = () => {
                Meteor.call('addUser', this.credentials, (error) => {
                    if (error) {
                        console.log("Unable to add user");
                    }
                    else {
                        console.log("User added");
                        clearForm();
                    }
                });

                this.credentials = {};
                this.showAddUserForm = false;
            };

            this.removeUser = (user) => {
                Meteor.call('removeUser', user._id, (error) => {
                    if (error) {
                        console.log("Unable to remove user");
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

            this.generatePassword = () => {
                this.credentials.password = Random.id(12);
            }

        }
    }
})
