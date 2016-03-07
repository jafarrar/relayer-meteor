Meteor.startup(function () {
    if (Streams.find().count() === 0) {
        var streams = [
            {
                'name': 'Archon Preview',
                'slug': 'archon',
                'description': 'Preview the Archon stream without delay.',
                'streamKey': Random.id(),
                'resX': 1280,
                'resY': 720
            },
            {
                'name': 'Player 1 Cam',
                'slug': 'player1-cam',
                'description': 'Player 1 webcam.',
                'streamKey': Random.id(),
                'resX': 560,
                'resY': 1120
            },
            {
                'name': 'Player 2 Cam',
                'slug': 'player2-cam',
                'description': 'Player 2 webcam.',
                'streamKey': Random.id(),
                'resX': 560,
                'resY': 1120
            }
        ];

        for (var i = 0; i < streams.length; i++) {
            Streams.insert(streams[i]);
        }
    }
});
