/**
 * This code is licensed under the MIT license which more or less states
 * you can do what you want with it as long as you attribute stuff so
 * just remember to always be excellent to others and everything should be good.
 */

//
//  AppDelegate+DropboxSync.m
//  herp
//  
//  Note: Depends on having JRSwizzle somewhere so it can Swizzle Methods Correctly.
//  
//  This adds Dropbox Sync API support to the AppDelegate, swizzling methods
//  so that you don't have to manually edit the auto-genned AppDelegate source.
//
//  Created by Joseph Sikorski on 2014-10-03.
//  Copyright Joseph Sikorski 2014. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"
#import "JRSwizzle.h"
#import <Cordova/CDVPlugin.h>
#import <Dropbox/Dropbox.h>



////////////////////////////////////////

@implementation AppDelegate (DropdoxSync)

#pragma mark UIApplicationDelegate implementation

+ (void) load {
    NSError *error;

    [AppDelegate
     jr_swizzleMethod: @selector(application:didFinishLaunchingWithOptions:)
     withMethod: @selector(dbs_application:didFinishLaunchingWithOptions:)
     error: &error];

    if( error != nil ) {
        NSLog( @"Swizzling application:didFinishLaunchingWithOptions: Well, something done goofed:\n%@", error );
    }

    error = nil;

    [AppDelegate
     jr_swizzleMethod: @selector(application:openURL:sourceApplication:annotation:)
     withMethod: @selector(dbs_application:openURL:sourceApplication:annotation:)
     error: &error];

    if( error != nil ) {
        NSLog( @"Swizzling application:openURL:sourceApplication:annotation: Well, something done goofed:\n%@", error );
    }
}



////////////////////////////////////////

/**
 * This is main kick off after the app inits, the views and Settings are setup here. (preferred - iOS4 and up)
 */
- (BOOL) dbs_application: (UIApplication*) application
    didFinishLaunchingWithOptions: (NSDictionary*) launchOptions
{
    NSLog( @"initializing DBAccountManager" );

    DBAccountManager *accountManager =
      [[DBAccountManager alloc] initWithAppKey:@"cxi5tuz7s3vrd0w" secret:@"x6bl7f007w38vde"];
    [DBAccountManager setSharedManager:accountManager];
    
    DBAccount *account = [accountManager.linkedAccounts objectAtIndex:0];

    if( account ) {
        DBFilesystem *filesystem = [[DBFilesystem alloc] initWithAccount:account];
        NSLog( @"App linked successfully from didFinishLaunchingWithOptions!" );
        [DBFilesystem setSharedFilesystem:filesystem];
    }

    return [self dbs_application: application didFinishLaunchingWithOptions: launchOptions];
}

/**
 * Try as Dropbox URL first, if that fails try passing to original implementation.
 * Note: I hav no idea if this is actually the correct way to do this!
 */
- (BOOL) dbs_application: (UIApplication *) app
  openURL: (NSURL *) url
  sourceApplication: (NSString *) source
  annotation: (id) annotation
{
    NSLog( @"dbs_application:openURL:sourceApplication:annotation:" );

    DBAccount *account = [[DBAccountManager sharedManager] handleOpenURL:url];

    if( account ) {
        NSLog( @"App linked successfully!" );
        DBFilesystem *filesystem = [[DBFilesystem alloc] initWithAccount:account];
        [DBFilesystem setSharedFilesystem:filesystem];
        return YES;
    }
    
    return [self dbs_application: app openURL: url sourceApplication: source annotation: annotation];
}

@end
