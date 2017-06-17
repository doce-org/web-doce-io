'use strict';

const express = require( 'express' );
const helmet = require( 'helmet' );
const express_enforces_ssl = require( 'express-enforces-ssl' );
const path = require( 'path' );
const serveStatic = require( 'serve-static' );
const app = express();

// helmet HSTS
app.use( helmet() );
app.enable( 'trust proxy' );

// enforce SSL
app.use( express_enforces_ssl() );
app.use( serveStatic( __dirname ) );

const port = process.env.PORT || 5000;
const server = app.listen( port );

server.on( 'listening', () => {
    console.log( 'web.doce.io started on port '+ port );
} );
