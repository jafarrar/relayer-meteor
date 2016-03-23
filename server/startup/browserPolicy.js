Meteor.startup(function () {
    BrowserPolicy.content.allowOriginForAll("fonts.googleapis.com");
    BrowserPolicy.content.allowOriginForAll("fonts.gstatic.com");
    BrowserPolicy.content.allowOriginForAll("*.jwplatform.com");
    BrowserPolicy.content.allowOriginForAll("*.jwpcdn.com");
    BrowserPolicy.content.allowOriginForAll("*.jwpsrv.com");
    BrowserPolicy.content.allowOriginForAll("jwpltx.com");
    BrowserPolicy.content.allowOriginForAll("*.jwpltx.com");
    BrowserPolicy.content.allowFontDataUrl();
    BrowserPolicy.content.allowOriginForAll(Meteor.settings.public.baseUrl);
});
