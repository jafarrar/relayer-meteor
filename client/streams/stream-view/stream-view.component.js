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

            this.autorun(() => {
                if(JWPlayer.loaded()) {
                    jwplayer('player').setup({
                        file: 'rtmp://kegwen.com/' + this.stream.slug + '/' + this.stream.streamKey,
                        width: this.stream.resX,
                        height: this.stream.resY,
                        autostart: true
                    });
                }
            });
        }
    }
});
