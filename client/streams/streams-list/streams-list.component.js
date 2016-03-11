angular.module('relayer').directive('streamsList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/streams/streams-list/streams-list.html',
        controllerAs: 'sl',
        controller: function($scope, $reactive) {
            $reactive(this).attach($scope);

            this.newStream = {
                'slug': '',
                'resX': 1280,
                'resY': 720
            };

            this.error = "";

            this.subscribe('streams');

            this.helpers({
                streams: () => {
                    return Streams.find({});
                }
            });

            this.autorun(() => {
                this.newStream.slug = _.slugify(this.getReactively('newStream.name'));
            });

            this.addStream = () => {
                this.newStream.creator = Meteor.user()._id;
                this.newStream.streamKey = Random.id();

                if(this.newStream.slug && this.newStream.channel) {
                    Streams.insert(this.newStream,
                        (error, result) => {
                            if (error) {
                                console.log(error)
                            }
                            if (result) {
                                console.log(result);
                            }
                    });
                    this.newStream = {};
                }
                else {
                    this.error = "Please complete the form before submitting.";
                }

            };

            this.removeStream = (stream) => {
                if(!confirm("Remove stream?")) {
                    return false;
                }

                Streams.remove({ _id: stream._id });
            };

        }
    }
})
