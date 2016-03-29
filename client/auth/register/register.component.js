angular.module('relayer').directive('register', () => {
    return {
        restrict: 'E',
        templateUrl: 'client/auth/register/register.html',
        controllerAs: 'reg',
        controller: function($scope, $reactive) {
            $reactive(this).attach($scope);

            this.credentials = {
                email: '',
                password: ''
            };

            this.error = '';

            this.register = () => {
                console.log('Registration disabled.');
                // Accounts.createUser(this.credentials, (err) => {
                //    if (err) {
                //        this.error = err;
                //    }
                //    else {
                //        $state.go('home');
                //    }
                // });
            };
        }
    };
});
