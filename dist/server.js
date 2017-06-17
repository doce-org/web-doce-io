'use strict';

const express = require( 'express' );
const helmet = require( 'helmet' );
const path = require( 'path' );
const serveStatic = require( 'serve-static' );
const app = express();

// helmet HSTS
app.use( helmet() );
app.enable( 'trust proxy' );

app.use( serveStatic( __dirname ) );

const port = process.env.PORT || 8080;
const server = app.listen( port );

server.on( 'listening', () => {
    console.log( 'web.doce.io started on port '+ port );
} );
