angular.module('relayer').directive('streamEdit', () => {
    return {
        restrict: 'E',
        templateUrl: 'client/streams/stream-edit/stream-edit.html',
        controllerAs: 'se',
        controller: function($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.subscribe('streams');

            this.error = {};
            this.activeError = false;

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
                        public: this.stream.public,
                        autoplay: this.stream.autoplay
                    }
                }, (error) => {
                    if (error) {
                        this.error = error.reason;
                        this.activeError = true;
                    } else {
                        this.error = {};
                        this.activeError = false;
                    }
                });

                // Redirect user if slug is updated
                // currently doesn't handle non-unique well
                if (this.stream.slug !== $stateParams.slug) {
                    // $state.go('streamEdit', {slug: this.stream.slug});
                    console.log('change state requested');
                }
            };

            this.autorun(() => {
                try {
                    this.aspectRatio = Streams.getAspectRatio(
                        this.getReactively('stream.resX'),
                        this.getReactively('stream.resY')
                    );
                } catch (e) {
                    this.aspectRatio = '16:9';
                }
            });

            this.generateStreamKey = () => {
                this.stream.streamKey = Random.id();
            };

            this.updateChannelList = () => {
                this.call('updateAppList', (error) => {
                    if (error) {
                        this.error = error.reason;
                    } else {
                        this.error = {};
                    }
                });
            };

            this.dropPublisher = () => {
                if (!confirm('Kill the stream?')) {
                    return false;
                }
                this.call('dropPublisher', this.stream.channel, this.stream.streamKey, (error) => {
                    if (error) {
                        this.error = error.reason;
                    } else {
                        this.error = {};
                    }
                });

                return true;
            };
        }
    };
});
