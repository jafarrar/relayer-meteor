Meteor.publish("users", function () {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1, isAdmin: 1}});
});

Accounts.config({forbidClientAccountCreation: true});
