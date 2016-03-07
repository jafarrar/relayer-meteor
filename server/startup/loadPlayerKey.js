Meteor.startup(function () {
    Meteor.settings.public.jwplayerKey = process.env.JWPLAYER_KEY || '';
});
