Channels = new Mongo.Collection("channels");

// Retrieve the channel/application list from nginx-rtmp's stat module
// Parse the XML, then add the channels to the db
// In the future, this should also (optionally?) prune or at least flag inactivate channels
// Reference: http://stackoverflow.com/questions/29184651/how-to-parse-xml-in-meteor-backend/34007083#34007083
Meteor.methods({
    updateAppList:function(){
        HTTP.get(Meteor.settings.public.statUrl,{},
            function(xmlError,xmlResponse){
                if(xmlError){
                    console.error('xmlError',xmlError);
                } else{
                    try {
                        xml2js.parseString(xmlResponse.content, {explicitArray:false, emptyTag:undefined}, function (jsError, jsResult) {
                            if(jsError){
                                console.error('xml2js error',jsError);
                            }else{
                                _.each(jsResult.rtmp.server.application, function(application) {
                                    Channels.upsert({name: application.name}, {
                                        $set: {
                                            name: application.name
                                        }
                                    });
                                })
                            }
                        });
                    } catch (e) {
                        // catch clientside error when it tries to execute this even though it shouldn't becuase this is a server method BUT WHATEVER
                        return false;
                    }
            }
        });
    },
});
