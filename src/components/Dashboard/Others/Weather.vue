<template>

    <div>

        <div class="overlay">

            <!-- date -->
            <h1 class="ui inverted header date">
                <span class="sub header">{{getDay}}</span>
                {{getDate}}
            </h1>

            <!-- time -->
            <h1 class="ui inverted right aligned header time">{{getTime}}</h1>

        </div>

        <div class="ui basic segment">
            <h4 class="ui inverted header">Météo</h4>
        </div>

    </div>

</template>

<script type="text/babel">

    // lib
    import moment from 'moment';

    export default {

        data() {
            return {
                datetime: false
            }
        },

        created() {
            this.datetime = moment().toDate();
            setInterval( () => this.datetime = moment().toDate(), 1000 * 30 );
        },

        computed: {

            /**
             * @summary get day
             * @returns {String}
             * @author shad
             */
            getDay(){
                return moment( this.datetime ).format( 'dddd' );
            },

            /**
             * @summary get date and month
             * @returns {String}
             * @author shad
             */
            getDate() {
                return moment( this.datetime ).format( 'DD MMM' );
            },

            /**
             * @summary get time
             * @returns {String}
             * @author shad
             */
            getTime() {
                return moment( this.datetime ).format( 'HH:mm' );
            }

        }
    }

</script>

<style lang="scss" scoped>

    h1.ui.header {
        font-size: 2.5em;
        margin: calc(2rem - .14285em) 0 1rem;
    }

    .overlay {
        display: inline-block;
        position: relative;
        height: 250px;
        width: 100%;
        padding: 1rem;
        background: url('https://source.unsplash.com/daily') center center;
        background-size: cover;
    }

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

    .date {
        position: absolute;
        bottom: 10px;
        text-transform: capitalize;
    }

    .time {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }

</style>