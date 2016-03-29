Meteor.startup(function () {
    if (Meteor.users.find().count() === 0) {
        let firstUser = {
            email: 'test@test.cool',
            password: Meteor.settings.baseUserPassword
        };

        Accounts.createUser(firstUser);

        const firstUserId = Meteor.users.findOne({});

        Meteor.users.update(firstUserId._id, {
            $set: {
                isAdmin: true
            }
        });
    }
});
