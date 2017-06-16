'use strict';

/**
 * emphasis definition
 * TODO check if 'reset' and 'stop' are needed and cleanup
 *
 * @param {String} name
 * @param {Integer} duration - in ms
 *
 * @author shad
 */
exports.defineEmphasis = function( name, duration ) {

	return {

		css: false,

		beforeEnter( el ) {

			$( el ).show();

		},

		enter( el, done ) {

			$( el ).transition( name, duration, done );

			return () => $( el ).transition( 'stop' );

		},

		leave( el, done ) {

			$( el )
				.transition( 'reset' )
				.transition( name, duration, done )
				.hide();

			return () => $( el ).transition( 'stop' );

		}

	};

};

/**
 * appareance definition
 *
 * @param {String} name
 * @param {Integer} duration - in ms
 *
 * @author shad
 */
exports.defineAppareance = function( name, duration ) {

	return {

		css: false,

		enter( el, done ) {

			$( el ).transition( `${name} in`, duration, done );

		},

		leave( el, done ) {

			$( el ).transition( `${name} out`, duration, done );

		}

	};

};
