angular.module('relayer').directive('streamsList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/streams/streams-list/streams-list.html',
        controllerAs: 'sl',
        controller: function($scope, $reactive) {
            $reactive(this).attach($scope);

            this.newStream = {
                'resX': 1280,
                'resY': 720
            };

            this.subscribe('streams');

            this.helpers({
                streams: () => {
                    return Streams.find({});
                }
            });

            this.addStream = () => {
                this.newStream.creator = Meteor.user()._id;
                this.newStream.streamKey = Random.id();
                this.newStream.slug = _.slugify(this.newStream.name);

                // ugly check if slug is unique
                let count = Streams.find({'slug': this.newStream.slug}).count();

                if (count === 0) {
                    Streams.insert(this.newStream);
                    this.newStream = {};
                }

            };

            this.removeStream = (stream) => {
                Streams.remove({ _id: stream._id });
            };

        }
    }
})
