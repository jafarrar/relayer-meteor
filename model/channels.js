Channels = new Mongo.Collection("channels");

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
