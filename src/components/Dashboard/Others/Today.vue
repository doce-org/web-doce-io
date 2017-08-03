<template>

    <div id="dashboard-today-component" class="tile is-child">

        <div class="overlay">

            <div class="level">
                <div class="level-left">
                    <div class="level-item">

                        <!-- date -->
                        <div class="block">
                            <p class="subtitle is-spaced is-6 has-text-light">{{getDay}}</p>
                            <h1 class="title is-1 has-text-white">{{getDate}}</h1>
                        </div>

                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">

                        <!-- time -->
                        <h1 class="title is-1 has-text-white">{{getTime}}</h1>

                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script type="text/babel">

    // lib
    import moment from 'moment';

    export default {

        data() {
            return {

				// contain the current time
				// @type {Date}
                'datetime': false

            }
        },

        created() {
            this.datetime = moment().toDate();
			// set interval to keep time and day at the right datetime
            setInterval( () => this.datetime = moment().toDate(), 1000 * 30 );
        },

        computed: {

            /**
             * get the current day
             *
             * @returns {String}
             *
             * @author shad
             */
            getDay(){

                return moment( this.datetime ).format( 'dddd' );

            },

            /**
             * get current day and month
             *
             * @returns {String}
             *
             * @author shad
             */
            getDate() {

                return moment( this.datetime ).format( 'DD MMM' );

            },

            /**
             * get the current time
             *
             * @returns {String}
             *
             * @author shad
             */
            getTime() {

                return moment( this.datetime ).format( 'HH:mm' );
                
            }

        }
    }

</script>

<style lang="scss" scoped>

	// add a background image from unsplash
    .overlay {
        display: inline-block;
        position: relative;
        height: 100%;
        width: 100%;
        padding: 2rem;
        background: url('https://source.unsplash.com/daily') center center;
        background-size: cover;
    }

	// black .1 opacity overlay on image
    .overlay:after {
        content: '';
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        background: black;
        opacity: 0.1;
    }

</style>
