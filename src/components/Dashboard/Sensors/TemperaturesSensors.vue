<template>

    <div>

        <h4 class="ui disabled center aligned header">Température</h4>

        <table class="ui very basic table">
            <tbody>

                <tr v-for="temperature in temperatures">

                    <!-- name -->
                    <td>{{temperature.name | uppercase}}</td>

                    <!-- record -->
                    <td class="right aligned">
                        <temperature-sensor-record :sensor_id="temperature.id"></temperature-sensor-record>
                    </td>

                </tr>

            </tbody>
        </table>

    </div>

</template>

<script type="text/babel">

    // services
    import { temperatureSensorService } from 'services';
    // components
    import TemperatureSensorRecord from './TemperatureSensorRecord.vue';

    export default {

        props: [ 'room_id' ],

        components: { TemperatureSensorRecord },

        data() {
            return {
                temperatures: []
            }
        },

        created() {
            this.getTemperatureSensorListing();
        },

        methods: {

            /**
             * get listing of available temperature 
             * for a specified room
             * @author shad
             */
            getTemperatureSensorListing() {
               temperatureSensorService.find( { query: { room_id: this.room_id } } )
                    .then( temperatures => this.temperatures = temperatures )
                    .catch( console.error ) 
            }

        }

    }

</script>