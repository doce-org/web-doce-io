'use strict';

import transitions from './transitions';

/**
 * emphasis available listing
 *
 * @type {Array}
 *
 * @author shad
 */
const emphasis = [
	'jiggle',
	'flash',
	'shake',
	'pulse',
	'tada',
	'bounce'
];

/**
 * appareances available listing
 *
 * @type {Array}
 *
 * @author shad
 */
const appareances = [
	'scale',
	'fade', 'fade up', 'fade down', 'fade left', 'fade right',
	'horizontal flip', 'vertical flip',
	'drop',
	'fly left', 'fly right', 'fly up', 'fly down',
	'swing left', 'swing right', 'swing up', 'swing down',
	'browser', 'browse right',
	'slide left', 'slide right', 'slide up', 'slide down'
];

/**
 * register transitions
 *
 * @param {Object} Vue
 * @param {Object} options
 *
 * @author shad
 */
export default ( Vue, options = { duration: 500 } ) => {

	emphasis.forEach( emphase => {

		const definition = transitions.defineEmphasis( emphase, options.duration );
		const id = emphase.replace( ' ', '-' );

		Vue.transition( id, definition );

	} );

	appareances.forEach( animation => {

		const definition = transitions.defineAppareance( animation, options.duration );
		const id = animation.replace( ' ', '-' );

		Vue.transition( id, definition );

	} );

};
