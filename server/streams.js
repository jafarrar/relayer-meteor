Meteor.publish("streams", function() {
    return Streams.find({});
});
