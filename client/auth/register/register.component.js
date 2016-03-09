angular.module('relayer').directive('register', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/auth/register/register.html',
        controllerAs: 'reg',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.credentials = {
                email: '',
                password: ''
            };

            this.error = '';

            this.register = () => {
                Accounts.createUser(this.credentials, (err) => {
                    if (err) {
                        this.error = err;
                    }
                    else {
                        $state.go('login');
                    }
                });
            };

        }
    }
});
