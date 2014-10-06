/**
 * Dropbox Sync API JS Wrapper
 *
 * Created by Christophe Coenraets on 5/18/13.
 *
 * Modified by Joseph Sikorski on 2014-10-03.
 * Changed to use NodeJS style callbacks instead of depending on (the admittedly ubiquitous) jQuery.
 */

var dropbox = (function() {
    var pluginName = "DropboxPlugin";
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

    function checkLink( cb ) {
        callCordovaExec( 'checkLink', cb );
    }

    function unlink( cb ) {
        callCordovaExec( 'unlink', cb );
    }

    ////////////////////
    // File System
    ////////////////////

    function listFolder( path, cb ) {
        callCordovaExec( 'listFolder', [ path ], cb );
    }

    function addObserver( path, cb ) {
        callCordovaExec( 'addObserver', [ path ], cb );
    }

    function removeObserver( observerId, cb ) {
        callCordovaExec( 'removeObserver', [ observerId ], cb );
    }

    ////////////////////
    // Files and Data
    ////////////////////

    function readData( fileName, cb ) {
        callCordovaExec( 'readData', [ fileName ], cb );
    }

    function readString( fileName, cb ) {
        callCordovaExec( 'readString', [ fileName ], cb );
    }

    function getImageBase64String( fileName, cb ) {
        callCordovaExec( 'getImageBase64String', [ fileName ], cb );
    }

    return {
        link: link,
        checkLink: checkLink,
        unlink: unlink,
        listFolder: listFolder,
        addObserver: addObserver,
        readData: readData,
        readString: readString
    }

}());