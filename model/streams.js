class StreamsCollection extends Mongo.Collection {
    getAspectRatio(width, height) {
        if (!width || !height) {
            return '16:9';
        }

        const gcd = (a, b) => {
            return (b === 0) ? a : gcd(b, a % b);
        };

        const r = gcd(width, height);

        return `${width / r}:${height / r}`;
    }
}

Streams = new StreamsCollection("streams");

const isAdmin = (userId) => {
    const user = Meteor.users.findOne(userId);
    return user.isAdmin === true;
};

// Helper for Streams Collection insert
// Checks that a slug is provided and is unique
const slugExistsAndIsUnique = (slug) => {
    if (!slug) {
        throw new Meteor.Error(403, 'No slug provided.');
    }

    const slugExists = Streams.find({ slug: slug}, {limit: 1}).count() > 0;

    if (slugExists) {
        throw new Meteor.Error(403, 'Slug already in use. Please choose a unique name.');
    } else {
        return true;
    }
};

// Helper for Streams Collection update
// Checks if the slug is unique, but allows it to save if it's the same as its current db value
const updateSlugUniqueCheck = (stream, modifier) => {
    if (!modifier.$set.slug) {
        throw new Meteor.Error(403, 'No slug provided.');
    }

    if (stream.slug === modifier.$set.slug) {
        return true;
    }

    const slugExists = Streams.find({ slug: stream.slug}, {limit: 1}).count() > 0;

    if (slugExists) {
        throw new Meteor.Error(403, 'Slug already in use. Please choose a unique name.');
    } else {
        return true;
    }
};

Streams.allow({
    insert: (userId, stream) => {
        return isAdmin(userId) && slugExistsAndIsUnique(stream.slug);
    },
    update: (userId, stream, fields, modifier) => {
        return isAdmin(userId) && updateSlugUniqueCheck(stream, modifier);
    },
    remove: (userId) => {
        return isAdmin(userId);
    }
});


Meteor.methods({
    dropPublisher: (app, key) => {
        try {
            HTTP.call('GET',
                    `${Meteor.settings.public.controlUrl}/drop/publisher?app=${app}&name=${key}`, {
                        params: {
                            user: Meteor.settings.nginxUser,
                            password: Meteor.settings.nginxPassword
                        }
                    });
            return true;
        } catch (e) {
            return false;
        }
    }
});
