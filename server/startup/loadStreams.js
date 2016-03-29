Meteor.startup(function () {
    if (Streams.find().count() === 0) {
        const streams = [
            {
                name: 'Archon Preview',
                slug: 'archon',
                description: 'Preview the Archon stream without delay.',
                channel: 'archon-feed',
                streamKey: Random.id(),
                resX: 1280,
                resY: 720
            },
            {
                name: 'Player 1 Cam',
                slug: 'player1-cam',
                description: 'Player 1 webcam.',
                channel: 'player1-cam',
                streamKey: Random.id(),
                resX: 560,
                resY: 1120
            },
            {
                name: 'Player 2 Cam',
                slug: 'player2-cam',
                description: 'Player 2 webcam.',
                channel: 'player2-cam',
                streamKey: Random.id(),
                resX: 560,
                resY: 1120
            }
        ];

        for (let i = 0; i < streams.length; i++) {
            Streams.insert(streams[i]);
        }
    }
});
