Meteor.users.allow({
    update: function (userId, user, fields, modifier) {
        return userId && user.isAdmin;
    },
    remove: function (userId, user) {
        return userId && user.isAdmin;
    }
});

Meteor.users.deny({
    update: function(userId, user) {
        return !user.isAdmin;
    }
});

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

        if (user.isAdmin)
            throw new Meteor.Error(404, "Cannot delete a current administrator");

        Meteor.users.remove(userId);
    },

    toggleAdmin: function(targetUserId, currentUserId) {
        check(targetUserId, String);
        check(currentUserId, String);

        let targetUser = Meteor.users.findOne({_id: targetUserId});
        let currentUser = Meteor.users.findOne({_id: currentUserId});

        if (!targetUser)
            throw new Meteor.Error(404, "No such user");

        if (!currentUser)
            throw new Meteor.Error(404, "You aren't logged in");

        if (!currentUser.isAdmin)
            throw new Meteor.Error(404, "Insufficient privileges");

        if (!targetUser.isAdmin) {
            Meteor.users.update(targetUserId, {
                $set: {
                    isAdmin: true
                }
            });
        } else {
            Meteor.users.update(targetUserId, {
                $set: {
                    isAdmin: false
                }
            });
        }
    }
});
