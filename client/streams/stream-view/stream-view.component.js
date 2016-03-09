angular.module('relayer').directive('streamView', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/streams/stream-view/stream-view.html',
        controllerAs: 'sv',
        controller: function($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.subscribe('streams');

            this.volume = 25;

            this.helpers({
                stream: () => {
                    return Streams.findOne({ slug: $stateParams.slug });
                },
                baseUrl: () => {
                    return Meteor.settings.public.baseUrl;
                }
            });

            this.autorun(() => {
                if(JWPlayer.loaded()) {
                    let playerInstance = jwplayer('player');
                    this.playerInstance = playerInstance;
                    playerInstance.setup({
                        file: this.baseUrl + '/' + this.stream.slug + '/' + this.stream.streamKey,
                        width: this.stream.resX,
                        height: this.stream.resY,
                        volume: this.volume,
                        title: this.stream.name || '',
                        description: this.stream.description || '',
                        autostart: true,
                        controls: false
                    });
                }
            });

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
                this.playerInstance.setMute();
            }

            this.setVolume = () => {
                this.playerInstance.setVolume(this.volume);
            }
        }
    }
});
