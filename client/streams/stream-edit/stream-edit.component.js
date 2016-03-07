angular.module('relayer').directive('streamEdit', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/streams/stream-edit/stream-edit.html',
        controllerAs: 'se',
        controller: function($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.subscribe('streams');

            this.helpers({
                stream: () => {
                    return Streams.findOne({ _id: $stateParams.streamId });
                }
            });

            this.updateStream = () => {
                Streams.update({ _id: $stateParams.streamId }, {
                    $set: {
                        name: this.stream.name,
                        description: this.stream.description,
                        streamKey: this.stream.streamKey,
                        resX: this.stream.resX,
                        resY: this.stream.resY
                    }
                }, (error) => {
                    if (error) {
                        console.log("Unable to update the stream");
                    }
                    else {
                        console.log("Stream updated.");
                    }
                });
            };
        }
    }
});
