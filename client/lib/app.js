angular.module('relayer', [
    'angular-meteor',
    'ui.router',
    'accounts.ui'
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
