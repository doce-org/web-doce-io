'use strict';

import moment from 'moment';

export default ( Vue ) => {

    /**
     * format any given date or time from the format specified to the out format wanted
     *
     * @param inFormat
     * @param outFormat
     *
     * @return {*}
     *
     * @author shad
     */
    Vue.filter( 'momentFormat', function ( date, inFormat, outFormat ) {

        return moment( date, inFormat ).format( outFormat );

    } );

    /**
     * get time from now on the specified data
     *
     * @param  {date} date
     *
     * @return {string}
     *
     * @author shad
     */
    Vue.filter( 'timeFromNow', function( date) {

        return moment( date ).fromNow();
		
    } );

}
