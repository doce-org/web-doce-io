'use strict';

var merge = require( 'webpack-merge' );
var prodEnv = require( './prod.env' );

module.exports = merge( prodEnv, {
	NODE_ENV: '"development"',
	HOST_URL: '"http://192.168.1.41:3030"'
} );
