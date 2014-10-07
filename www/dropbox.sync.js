/**
 * Dropbox Sync API JS Wrapper
 *
 * Created by Christophe Coenraets on 5/18/13.
 *
 * Modified by Joseph Sikorski on 2014-10-03.
 * Changed to use NodeJS style callbacks instead of depending on (the admittedly ubiquitous) jQuery.
 */

var pluginName = "DropboxSync";
var slice = [].slice;

// callCordovaExec( commandName, cb )
// callCordovaExec( commandName, [ arg, arg, ... ], cb )
function callCordovaExec( commandName, args, cb ) {
    if( ! cb && typeof args == 'function' ) {
        cb = args;
        args = [ '' ];
    }

    if( ! args ) {
        args = [ '' ];
    }
    
    // All examples I see put in at least an empty string for arguments
    // if passing 0 arguments.
    if( args.length === 0 ) {
        args.push( '' );
    }

    if( typeof cb != 'function' ) {
        throw new TypeError( 'Provided callback is not a function.  Arguments provided: ' + String( slice.call( arguments, 0 ) ) );
    }

    Cordova.exec(
        function success( result ) {
            cb( null, result );
        },
        function failure( error ) {
            cb( error );
        },
        pluginName, commandName, args );
}

////////////////////
// Account
////////////////////

/**
 * Tries to link this app to the user's Dropbox Account.
 * Will always call cb with successful result regardless of whether or not
 * the user actually linked the app, necessitating a call to checkLink()
 * to actually check if the user succeeded.
 */
function link( cb ) {
    // Manual because of setTimeout call in success.
    Cordova.exec(
        function( result ) {
            // why timeout?
            // The android version does this too.
            // There must be some lag after the link is successful or something...
            setTimeout( function() {
                cb( null, result );
            }, 1000);
        },
        function( error ) {
            cb( error );
        },
        pluginName, "link", [""]);
}

/**
 * Checks if app is linked to the user's Dropbox Account.
 * Calls the callback with no error if the account is linked,
 * and WITH an error if the account is not linked.
 */
function checkLink( cb ) {
    callCordovaExec( 'checkLink', cb );
}

/**
 * Tries to unlink the user's Dropbox account.
 * Always calls back with success.
 */
function unlink( cb ) {
    callCordovaExec( 'unlink', cb );
}

////////////////////
// File System
////////////////////

// TODO: Add thumbExists:Boolean and iconName:String
/**
 * Lists the contents of a folder, calling back with an array of objects
 * each with the following properties:
 * - path :String
 * - modifiedTime :Number
 * - fileSize :Number - Always 0 for folders.
 * - isFolder :Boolean
 */
function listFolder( path, cb ) {
    callCordovaExec( 'listFolder', [ path ], cb );
}

function addObserver( path, cb ) {
    callCordovaExec( 'addObserver', [ path ], cb );
}

// TODO: (Add to plugin), (Add export line at EOF)
// TODO: Decide if actually need to add this.
function removeObserver( cb ) {
    callCordovaExec( 'removeObserver', cb );
}

////////////////////
// Files and Data
////////////////////

function readData( filePath, cb ) {
    callCordovaExec( 'readData', [ filePath ], cb );
}

function readString( filePath, cb ) {
    callCordovaExec( 'readString', [ filePath ], cb );
}

// TODO: (Add to plugin), (Add export line at EOF)
function writeData( filePath, data, cb ) {
    callCordovaExec( 'writeData', [ filePath, data ], cb );
}

// TODO: (Add to plugin), (Add export line at EOF)
function writeString( filePath, str, cb ) {
    callCordovaExec( 'writeString', [ filePath, str ], cb );
}

// TODO: (Add to plugin), (Add export line at EOF)
function getImageBase64String( filePath, cb ) {
    callCordovaExec( 'getImageBase64String', [ filePath ], cb );
}

// TODO: (Add to plugin), (Add export line at EOF)
function uploadFile( localPath, dropboxPath, cb ) {
    callCordovaExec( 'uploadFile', [ localPath, dropboxPath ], cb );
}

// TODO: (Add to plugin), (Add export line at EOF)
function uploadFolder( localPath, dropboxPath, cb ) {
    callCordovaExec( 'uploadFolder', [ localPath, dropboxPath ], cb );
}

// TODO: (Add to plugin), (Add export line at EOF)
function deleteFile( filePath, cb ) {
    callCordovaExec( 'deleteFile', [ filePath ], cb );
}

// TODO: (Add to plugin), (Add export line at EOF)
function createFolder( folderPath, cb ) {
    callCordovaExec( 'createFolder', [ folderPath ], cb );
}

// TODO: (Add to plugin), (Add export line at EOF)
function openFile( filePath, cb ) {
    callCordovaExec( 'openFile', [ filePath ], cb );
}

exports.link = link;
exports.checkLink = checkLink;
exports.unlink = unlink;
exports.listFolder = listFolder;
exports.addObserver = addObserver;
exports.readData = readData;
exports.readString = readString;
