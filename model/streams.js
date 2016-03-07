Streams = new Mongo.Collection("streams");

Streams.allow({
    insert: function (userId, stream) {
        return userId;
    },
    update: function (userId, stream, fields, modifier) {
        return userId;
    },
    remove: function (userId, stream) {
        return userId;
    }
});
