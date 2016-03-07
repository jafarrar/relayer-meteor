angular.module('relayer').directive('streamView', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/streams/stream-view/stream-view.html',
        controllerAs: 'sv',
        controller: function($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.subscribe('streams');

            this.helpers({
                stream: () => {
                    return Streams.findOne({ slug: $stateParams.slug });
                }
            });
        }
    }
});
