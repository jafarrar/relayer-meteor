angular.module('relayer').directive('streamsList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/streams/streams-list/streams-list.html',
        controllerAs: 'sl',
        controller: function($scope, $reactive) {
            $reactive(this).attach($scope);

            this.newStream = {};

            this.subscribe('streams');

            this.helpers({
                streams: () => {
                    return Streams.find({});
                }
            });

            this.addStream = () => {
                this.newStream.creator = Meteor.user()._id;
                Streams.insert(this.newStream);
                this.newStream = {};
            };

            this.removeStream = (stream) => {
                Streams.remove({ _id: stream._id });
            };
        }
    }
})
