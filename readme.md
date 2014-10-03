PhoneGap Plugin for the Dropbox Sync API
========================================

Another fork of [Coenraets' Dropbox Sync Plugin for PhoneGap](https://github.com/ccoenraets/phonegap-dropbox-sync).

A PhoneGap plugin for the [Dropbox Sync API](https://www.dropbox.com/developers/sync).

Watch Coenraets' [video](http://youtu.be/RYky20wV0_Y).

Read Coenraets' [blog post](http://coenraets.org).

Installation
------------

Inside of your phonegap project, run this:

```
cordova plugin add https://github.com/joedski/phonegap-dropbox-sync
```

You can probably use Plugman too.  I dunno.

Special features
----------------

Don't need to modify the auto-generated App Delegate as the necessary changes are (perhaps poorly?) implemented in a category and methods are swizzled.

Dependencies
------------

Objective-C code requires [JRSwizzle](https://github.com/rentzsch/jrswizzle) be available during compilation.

Other Notes
-----------

I'm mostly bumbling through this so if something looks dumb, please list it as an issue or send a pull request and I will get back to it when ever is most inconvenient to everyone.

When building the iOS app, be sure to add the Dropbox Sync framework to your project, and all its dependencies as explained [on Dropbox's site concerning the iOS framework](https://www.dropbox.com/developers/sync/sdks/ios), but then you probably already know that if you're here.

License
-------

Licensed under the verbose Apache 2.0 license.
