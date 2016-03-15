Streams = new Mongo.Collection("streams");

isAdmin = (userId) => {
    let user = Meteor.users.findOne(userId);
    return user.isAdmin === true;
};

// Helper for Streams Collection insert
// Checks that a slug is provided and is unique
slugExistsAndIsUnique = (slug) => {
    if (!slug)
        throw new Meteor.Error(403, "No slug provided.");

    let slugExists = Streams.find({ slug: slug}, {limit: 1}).count() > 0;

    if (slugExists)
        throw new Meteor.Error(403, "Slug already in use. Please choose a unique name.");
    else
        return true;
};

// Helper for Streams Collection update
// Checks if the slug is unique, but allows it to save if it's the same as its current db value
updateSlugUniqueCheck = (stream, modifier) => {
    if (!modifier.$set.slug)
        throw new Meteor.Error(403, "No slug provided.");

    if (stream.slug === modifier.$set.slug)
        return true;

    let slugExists = Streams.find({ slug: stream.slug}, {limit: 1}).count() > 0;

    if (slugExists)
        throw new Meteor.Error(403, "Slug already in use. Please choose a unique name.");
    else
        return true;
};

Streams.allow({
    insert: function (userId, stream) {
        return isAdmin(userId) && slugExistsAndIsUnique(stream.slug);
    },
    update: function (userId, stream, fields, modifier) {
        return isAdmin(userId) && updateSlugUniqueCheck(stream, modifier);
    },
    remove: function (userId, stream) {
        return isAdmin(userId);
    }
});


Meteor.methods({
    updateAppList:function(){
        HTTP.get(Meteor.settings.public.statUrl,{},
            function(xmlError,xmlResponse){
                if(xmlError){
                    console.error('xmlError',xmlError);
                }else{
                    xml2js.parseString(xmlResponse.content, {explicitArray:false, emptyTag:undefined}, function (jsError, jsResult) {
                    if(jsError){
                        console.error('xml2js error',jsError);
                    }else{
                        Meteor.settings.public.applicationList = [];

                        _.each(jsResult.rtmp.server.application, function(application) {
                            Meteor.settings.public.applicationList.push(application.name);
                        })
                        console.log(Meteor.settings.public.applicationList);
                    }
                });
            }
        });
    },
    dropPublisher: function(app, key){
        console.log(`${Meteor.settings.public.controlUrl}/drop/publisher?app=${app}&name=${key}`);

        try {
            let result = HTTP.call("GET", `${Meteor.settings.public.controlUrl}/drop/publisher?app=${app}&name=${key}`,
                                    {params: {user: Meteor.settings.nginxUser, password: Meteor.settings.nginxPassword}});
            console.log(result);
            return true;
        }
        catch (e) {
            return false;
        }
    }
});
