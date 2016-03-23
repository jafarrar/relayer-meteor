angular.module('relayer').directive('streamView', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/streams/stream-view/stream-view.html',
        controllerAs: 'sv',
        controller: function($scope, $stateParams, $reactive, $state) {
            $reactive(this).attach($scope);

            this.volume = 25;
            this.streamKeyChanged = false;

            this.subscribe('streams');

            this.helpers({
                stream: () => {
                    return Streams.findOne({ slug: $stateParams.slug });
                },
                baseUrl: () => {
                    return Meteor.settings.public.baseUrl;
                }
            });

            this.initPlayer = () => {
                let playerInstance = jwplayer('player');

                let playerOptions = {
                    file: this.baseUrl + '/' + this.stream.channel + '/' + this.stream.streamKey,
                    aspectratio: Streams.getAspectRatio(this.stream.resX, this.stream.resY),
                    width: this.playerWidth(),
                    volume: this.stream.defaultVolume || this.volume,
                    title: this.stream.name || '',
                    description: this.stream.description || '',
                    autostart: this.stream.autoplay || false,
                    controls: false
                };

                // make player available to the rest of the controller
                this.playerInstance = playerInstance;

                playerInstance.setup(playerOptions);
            };

            this.playerWidth = () => {
                if (Streams.getAspectRatio(this.stream.resX, this.stream.resY) != '16:9') {
                    return "15%"
                } else {
                    return "75%"
                }
            };

            this.resetPlayer = () => {
                this.initPlayer();
                this.streamKeyChanged = false;
            };

            this.play = () => {
                this.playerInstance.play();
            };

            this.pause = () => {
                this.playerInstance.pause();
            };

            this.stop = () => {
                this.playerInstance.stop();
            };

            this.mute = () => {
                if (this.volume != 0) {
                    this.previousVolume = this.volume;
                    this.volume = 0;
                    this.playerInstance.setMute();
                } else {
                    this.volume = this.previousVolume || 25;
                    this.playerInstance.setVolume(this.volume);
                }
            };

            this.setVolume = () => {
                this.playerInstance.setVolume(this.volume);
            };

            $scope.$watch(
                // Watch the streamKey, allows app to prompt user to reinitialize player if necessary
                watchStreamKey = () => {
                    return this.getReactively('stream.streamKey');
                },
                handleStreamKeyChange = (newValue, oldValue) => {
                    // ignore the initial undefined period as this.stream resolves
                    if(oldValue != undefined && oldValue != newValue)
                        this.streamKeyChanged = true;
                }
            )

            // Kick user back to login screen if not logged in and the stream isn't public
            $scope.$watch(
                watchPublic = () => {
                    return this.getReactively('stream.public');
                },
                handlePublicChange = (newValue, oldValue) => {
                    if (newValue === false)
                        $state.go('login');
                }
            )

            this.autorun(() => {
                // wait for JWPlayer, *usually* also plenty of time for helper to resolve
                if(JWPlayer.loaded() && this.stream.streamKey) {
                    this.initPlayer();
                }
            });

        }
    }
});
