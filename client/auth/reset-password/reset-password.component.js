angular.module('relayer').directive('resetpw', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/auth/reset-password/reset-password.html',
        controllerAs: 'rspwd',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.credentials = {
                email: ''
            };

            this.error = '';

            this.reset = () => {
                Accounts.forgotPassword(this.credentials, (err) => {
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
