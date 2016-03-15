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
                    width: this.stream.resX,
                    height: this.stream.resY,
                    volume: this.stream.defaultVolume || this.volume,
                    title: this.stream.name || '',
                    description: this.stream.description || '',
                    autostart: true,
                    controls: false
                };

                // make player available to the rest of the controller
                this.playerInstance = playerInstance;

                playerInstance.setup(playerOptions);
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
                this.volume = 0;
                this.playerInstance.setMute();
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
                    if(oldValue != undefined)
                        this.streamKeyChanged = true;
                }
            )

            this.autorun(() => {
                // Reactively check if viewer still has permission to view page
                let showStream = this.getReactively('stream.public') || false;

                // Kick user back to login screen if not logged in and the stream isn't public
                if (angular.isDefined(showStream)) {
                    if (!Meteor.userId() && showStream === false) {
                        $state.go('login');
                    };
                }

                // wait for JWPlayer, *usually* also plenty of time for helper to resolve
                if(JWPlayer.loaded()) {
                    this.initPlayer();
                }
            });

        }
    }
});
