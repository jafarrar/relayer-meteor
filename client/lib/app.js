var app = angular.module('relayer', []);

angular.module('relayer', [
    'angular-meteor',
    'angular-meteor.auth',
    'ui.router'
]);

function onReady() {
    angular.bootstrap(document, ['relayer'], {
        strictDi: true
    });
}

if (Meteor.isCordova)
    angular.element(document).on("deviceready", onReady);
else
    angular.element(document).ready(onReady);
