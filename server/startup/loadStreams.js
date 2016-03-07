Meteor.startup(function () {
    if (Streams.find().count() === 0) {
        var streams = [
            {
                'name': 'Archon Preview',
                'description': 'Preview the Archon stream without delay.',
                'resX': 1280,
                'resY': 720
            },
            {
                'name': 'Player 1 Cam',
                'description': 'Player 1 webcam.',
                'resX': 560,
                'resY': 1120
            },
            {
                'name': 'Player 2 Cam',
                'description': 'Player 2 webcam.',
                'resX': 560,
                'resY': 1120
            }
        ];

        for (var i = 0; i < streams.length; i++) {
            Streams.insert(streams[i]);
        }
    }
});
