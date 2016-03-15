angular.module('relayer').directive('streamEdit', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/streams/stream-edit/stream-edit.html',
        controllerAs: 'se',
        controller: function($scope, $stateParams, $reactive, $state) {
            $reactive(this).attach($scope);

            this.subscribe('streams');

            this.error = {};

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
                        channel: this.stream.channel,
                        streamKey: this.stream.streamKey,
                        resX: this.stream.resX,
                        resY: this.stream.resY,
                        defaultVolume: this.stream.defaultVolume,
                        public: this.stream.public
                    }
                }, (error) => {
                    if (error) {
                        this.error = error.reason;
                        console.log("Unable to update the stream", error);
                    }
                    else {
                        this.error = {};
                        console.log("Stream updated.");
                    }
                });

                // Redirect user if slug is updated
                // currently doesn't handle non-unique well
                if (this.stream.slug != $stateParams.slug) {
                    //$state.go('streamEdit', {slug: this.stream.slug});
                    console.log("change state requested");
                }
            };

            this.generateStreamKey = () => {
                this.stream.streamKey = Random.id();
            };

            this.updateChannelList = () => {
                Meteor.call('updateAppList', (error) => {
                    if (error) {
                        console.log("Unable to update  list", error);
                    }
                    else {
                        console.log("List Updated");
                    }
                });
            };

            this.dropPublisher = () => {
                Meteor.call('dropPublisher', this.stream.channel, this.stream.streamKey, (error) => {
                    if (error) {
                        console.log("Unable to drop publisher", error);
                    }
                    else {
                        console.log("Publisher dropped");
                    }
                });
            };

        }
    }
});
