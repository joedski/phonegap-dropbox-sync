Workarounds
===========

A personal notes file of things I had to do to work around or else solve some problem that isn't described well in documentation.

Putting the Dropbox API Keys into the *-Info.plist file for iOS
===============================================================

I couldn't find any actual good documentation on how this works for iOS.  The documentation on the [Cordova/Phonegap](http://docs.phonegap.com/en/3.3.0/plugin_ref_spec.md.html#Plugin%20Specification) website is pretty sparse about what you're supposed to do here for iOS, so it took some finagling to figure this out.

I started out naïvely with this:

```xml
<platform name="ios">
  <config-file target="*-Info.plist">
  <key>DropboxAppKey</key>
  <string>$DB_APP_KEY</string>
  <key>DropboxAppSecret</key>
  <string>$DB_APP_SECRET</string>
  </config-file>
  ...
</platform>
```

With that, *-Info.plist gets this added to the end:

```xml
<key>undefined</key>
<string>herpderpderp</string>
```

which is kind of not what I'm looking for.  Trying this in the plugin.xml instead:

```xml
<platform name="ios">
  <config-file target="*-Info.plist">
  <dict>
    <key>DropboxAppKey</key>
    <string>$DB_APP_KEY</string>
    <key>DropboxAppSecret</key>
    <string>$DB_APP_SECRET</string>
  </dict>
  </config-file>
</platform>
```

Same result.  Trying this:

```xml
<platform name="ios">
  <config-file target="*-Info.plist"  parent="/*">
  <key>DropboxAppKey</key>
  <string>$DB_APP_KEY</string>
  <key>DropboxAppSecret</key>
  <string>$DB_APP_SECRET</string>
  </config-file>
  ...
</platform>
```

Same result.  Tried adding a specific parent, and it instead replaced the value of that parent.

Finally, found something that worked:

```xml
<platform name="ios">
  <config-file target="*-Info.plist"  parent="DropboxAppKey">
  <string>$DB_APP_KEY</string>
  </config-file>
  <config-file target="*-Info.plist"  parent="DropboxAppSecret">
  <string>$DB_APP_SECRET</string>
  </config-file>
  ...
</platform>
```

This produces this at the end of the plist:

```xml
<key>DropboxAppKey</key>
<string>abc123xyz999</string>
<key>DropboxAppSecret</key>
<string>herpderpderp</string>
```

Which is what I want.  So, it seems that if you specify a parent, that is what key it will be put under.  *But*, said key need not exist before hand.  That is, you can specify a new key rather than a pre-existing one.  To me, the documentation was not clear on this front, and still isn't.
