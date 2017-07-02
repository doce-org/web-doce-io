<template>

    <div>

        <h4 class="ui disabled center aligned header">
			Température
		</h4>

        <table class="ui very basic table">
            <tbody>

                <tr v-for="transmitter in transmitters">

                    <!-- name -->
                    <td>{{transmitter.name | uppercase}}</td>

                    <!-- record -->
                    <td class="right aligned">
                        <temperature-sensor-record :transmitter_id="transmitter.id"></temperature-sensor-record>
                    </td>

                </tr>

            </tbody>
        </table>

    </div>

</template>

<script type="text/babel">

    // services
    import { transmitterService } from 'services';
    // components
    import TemperatureSensorRecord from './TemperatureSensorRecord.vue';

    export default {

        props: [

			// contain the room id
			// @type {Integer}
			'room_id'

		],

        components: {

			TemperatureSensorRecord

		},

        data() {
            return {

				// contain the listing of transmitter sensors
				// linked to the current room id
				// @type {Array}
                'transmitters': []

            }
        },

        created() {
            this.findTransmitterTemperatureSensors();
        },

        methods: {

            /**
             * get listing of available temperature for a specified room
             *
             * @author shad
             */
            findTransmitterTemperatureSensors() {

				const query = { query: {

					// linked to the current room id
					'room_id': this.room_id,

					// of type 'temperature'
					type: 'temperature'

				} };

               	transmitterService.find( query )
            	.then( transmitters => this.transmitters = transmitters )
                .catch( this.handlingErrors );

            }

        }

    }

</script>
