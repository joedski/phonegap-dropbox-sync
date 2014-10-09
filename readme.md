PhoneGap Plugin for the Dropbox Sync API
========================================

__This is under development and so the exposed JS API may (will probably) be unstable.__

Another fork of [Coenraets' Dropbox Sync Plugin for PhoneGap](https://github.com/ccoenraets/phonegap-dropbox-sync).

A PhoneGap plugin for the [Dropbox Sync API](https://www.dropbox.com/developers/sync).

Watch Coenraets' [video](http://youtu.be/RYky20wV0_Y).

Read Coenraets' [blog post](http://coenraets.org).

Usage
-----

The Sync API is exposed through the following global/window variable in JS: `window.dropbox.sync`.  Currently the API is geared towards having only 1 account, or rather there is no current support for dealing with more than 1 account, although this may be changed later.

### Primary Methods

- Methods dealing with accounts
    - `link( cb :Function )`
        - Activates the Dropbox Account linking login screen.  Calls callback immediately with result of "OK".  (I don't currently know when/if it can fail.)
    - `checkLink( cb :Function )`
        - Checks whether or not at least 1 account is linked.  Result is `true` if at least 1 account is linked, `false` otherwise.
    - `unlink( cb :Function )`
        - Unlinks the last account linked to this app.  Always calls callback immediately with `"OK"` regardless.
- Methods dealing with files and the file system
    - `listFolder( path, cb )`
    - `addObserver( path, cb )`
- Methods dealing with reading, creating and modifying files
    - `readData( path, cb )`
    - `readString( path, cb )`

### Events

Callbacks that respond to events should be in the form of `function someCallback( eventProperties ) { ... }`.  Not all events populate eventProperties, so it may be an empty object.

- `on( eventName :String, cb :Function )`
    - Adds cb as a callback which responds to a given event.
- `off( eventName :String, cb :Function )`
    - Removes cb as a callback for the given event.
- `off( eventName :String )`
    - Removes all callbacks for the given event.
- `trigger( eventName, eventProperties )`
    - Triggers a given event, optionally with event-specific properties in eventProperties.

#### Events currently used

- `fileChange` indicates that a file or folder changed.
    - `eventProperties.path` is the path of the file which is observed for changes.  It may not necessarily be the file or folder that actually changed.
    - `eventProperties.descendants` indicates that the file or folder observered was observed for changes to itself and all descendants.
- `accountChange` indicates that an account was added, removed, or otherwise changed.  Currently does not pass any `eventProperties` to callbacks.


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
