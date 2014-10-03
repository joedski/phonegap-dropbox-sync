/**
 * Dropbox Sync API JS Wrapper
 *
 * Created by Christophe Coenraets on 5/18/13.
 * Changed to use NodeJS style callbacks instead of depending on (the ubiquitous) jQuery.
 */

var dropbox = (function() {
    var pluginName = "DropboxPlugin";

    var link = function( cb ) {
        Cordova.exec(
            function( result ) {
                // why timeout?
                setTimeout( function() {
                    cb( null, result );
                }, 1000);
            },
            function( error ) {
                cb( error );
            },
            pluginName, "link", [""]);
    }

    var checkLink = function( cb ) {
        Cordova.exec(
            function( result ) {
                cb( null, result );
            },
            function( error ) {
                cb( error );
            },
            pluginName, "checkLink", [""]);
    }

    var unlink = function( cb ) {
        Cordova.exec(
            function( result ) {
                cb( null, result );
            },
            function( error ) {
                cb( error );
            },
            pluginName, "unlink", [""]);
    }

    var listFolder = function( path, cb ) {
        Cordova.exec(
            function( result ) {
                cb( null, result );
            },
            function( error ) {
                console.log( "getFiles error:" );
                console.log( error );
                cb( error );
            },
            pluginName, "listFolder", [path]);
    }

    var addObserver = function( path, cb ) {
        Cordova.exec(
            function( result ) {
                cb( null, result );
            },
            function( error ) {
                cb( error );
            },
            pluginName, "addObserver", [path]);
    }

    var readData = function( fileName, cb ) {
        Cordova.exec(
            function( result ) {
                cb( null, result );
            },
            function( error ) {
                cb( error );
            },
            pluginName, "readData", [fileName]);
    }

    var readString = function( fileName, cb ) {
        Cordova.exec(
            function( result ) {
                cb( null, result );
            },
            function( error ) {
                cb( error );
            },
            pluginName, "readString", [fileName]);
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