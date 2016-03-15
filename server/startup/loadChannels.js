Meteor.startup(function () {
    //load channels/applications from RTMP server
    Meteor.call('updateAppList');
});
