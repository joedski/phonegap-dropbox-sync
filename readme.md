PhoneGap Plugin for the Dropbox Sync API
========================================

Another fork of [Coenraets' Dropbox Sync Plugin for PhoneGap](https://github.com/ccoenraets/phonegap-dropbox-sync).

A PhoneGap plugin for the [Dropbox Sync API](https://www.dropbox.com/developers/sync).

Watch Coenraets' [video](http://youtu.be/RYky20wV0_Y).

Read Coenraets' [blog post](http://coenraets.org).

Usage
-----

The Sync API is exposed through the following global/window variable in JS: `window.dropbox.sync`.

Installation
------------

Using Cordova: 

```
cordova plugin add https://github.com/joedski/phonegap-dropbox-sync --variable 'DB_APP_KEY=<dropbox-app-key>' --variable 'DB_APP_SECRET=<dropbox-app-secret>'
```

Using Plugman:

```
plugman install https://github.com/joedski/phonegap-dropbox-sync --platform ios --project path/to/project --variable 'DB_APP_KEY=<dropbox-app-key>' --variable 'DB_APP_SECRET=<dropbox-app-secret>'
```

Obviously, you should replace <dropbox-app-key> and <dropbox-app-secret> with your app's key and secret for the Dropbox API.  For example, if your app key is `abc123xyz999` and your app secret is `herpderpderp` then you enter the command like this:

```
cordova plugin add https://github.com/joedski/phonegap-dropbox-sync --variable 'DB_APP_KEY=abc123xyz999' --variable 'DB_APP_SECRET=herpderpderp'
```

If you don't specify these variables, Cordova and Plugman will get very cross with you indeed.

Special features
----------------

Don't need to modify the auto-generated App Delegate as the necessary changes are (perhaps poorly?) implemented in a category and methods are swizzled.

Dependencies
------------

Objective-C code requires [JRSwizzle](https://github.com/rentzsch/jrswizzle) be available during compilation.  [I stuck it in a PhoneGap plugin for convenience.](https://github.com/joedski/phonegap-jrswizzle)

Other Notes
-----------

I'm mostly bumbling through this so if something looks dumb, please list it as an issue or send a pull request and I will get back to it when ever is most inconvenient to everyone.

When building the iOS app, be sure to add the Dropbox Sync framework to your project, and all its dependencies as explained [on Dropbox's site concerning the iOS framework](https://www.dropbox.com/developers/sync/sdks/ios), but then you probably already know that if you're here.

I think it goes without saying that this plugin is neither endorsed by nor supported by Dropbox and Dropbox are not responsible for any problems caused by this ... thing.  Unless you can determine that it's actually the DropboxSync framework that's causing issues, don't bother them.

License
-------

Licensed under the verbose Apache 2.0 license.
