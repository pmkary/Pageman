#! /usr/bin/env node

//
// Pageman - HTML, Markdown and Legend mixer that Loves Jekyll...
//    Copyright 2016 by Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import pageman   = require('./pageman');
    import parseArgs = require('minimist');
    import fs        = require('fs');
    import path      = require('path');

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    function main( ) { 
        // our arguments
        let args = parseArgs( process.argv.slice( 2 ) );

        // compiling files
        args._.forEach( arg => {
            loadCompileAndStoreFile( arg );
        });
    }

    main( );

//
// ─── LOADING THE FILE ───────────────────────────────────────────────────────────
//

    function loadCompileAndStoreFile( address: string ) {
        // our file path
        let filePath = path.join( __dirname , address );
        // do we have the file?
        fs.exists( filePath , exists => {
            if ( exists ) {
                // opening the file
                fs.readFile( address, 'utf8', ( err, data ) => {
                    // if could not open the file
                    if ( err ) { 
                        console.log('--> PME002: Could not open the file'); 
                        return; 
                    }
                    // could open the file
                    let compiledSource = pageman.compile( data.toString( ) );
                    console.log( compiledSource );
                });
            } else {
                console.log(`--> PME001: File '${ address }' does not exists`);
            }
        });
    }

// ────────────────────────────────────────────────────────────────────────────────