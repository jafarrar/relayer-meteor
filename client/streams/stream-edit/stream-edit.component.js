angular.module('relayer').directive('streamEdit', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/streams/stream-edit/stream-edit.html',
        controllerAs: 'se',
        controller: function($scope, $stateParams, $reactive, $state) {
            $reactive(this).attach($scope);

            this.subscribe('streams');

            this.helpers({
                stream: () => {
                    return Streams.findOne({ slug: $stateParams.slug });
                }
            });

            this.updateStream = () => {
                Streams.update({ _id: this.stream._id }, {
                    $set: {
                        name: this.stream.name,
                        slug: this.stream.slug,
                        description: this.stream.description,
                        streamKey: this.stream.streamKey,
                        resX: this.stream.resX,
                        resY: this.stream.resY,
                        public: this.stream.public
                    }
                }, (error) => {
                    if (error) {
                        console.log("Unable to update the stream");
                    }
                    else {
                        console.log("Stream updated.");
                    }
                });

                if (this.stream.slug != $stateParams.slug) {
                    $state.go('streamEdit', {slug: this.stream.slug});
                }
            };

            this.generateStreamKey = () => {
                this.stream.streamKey = Random.id();
            };
        }
    }
});
