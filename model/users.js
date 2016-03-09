Meteor.methods({
    addUser: function(newUser) {
        check(newUser, {
            email: String,
            password: String
        });

        if (newUser.password.length < 6)
            throw new Meteor.Error(400, "Password too short");

        Accounts.createUser(newUser);
    },

    removeUser: function(userId) {
        check(userId, String);

        let user = Meteor.users.findOne({_id: userId});

        if (!user)
            throw new Meteor.Error(404, "No such user");

        if (user.admin)
            throw new Meteor.Error(404, "Cannot delete a current administrator");

        Meteor.users.remove(userId);
    },

    setAdmin: function(userId) {
        check(userId, String);

        let user = Meteor.users.findOne({_id: userId});

        if (!user)
            throw new Meteor.Error(404, "No such user");

        console.log(user);

        if (!user.isAdmin) {
            Meteor.users.update(userId, {
                $set: {
                    isAdmin: true
                }
            });
        }
        else {
            Meteor.users.update(userId, {
                $set: {
                    isAdmin: false
                }
            });
        }

    }
});
