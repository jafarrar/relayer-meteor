angular.module('relayer').directive('streamsList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/streams/streams-list/streams-list.html',
        controllerAs: 'sl',
        controller: function($scope, $reactive) {
            $reactive(this).attach($scope);

            this.subscribe('streams');

            this.helpers({
                streams: () => {
                    return Streams.find({});
                }
            })
        }
    }
})
