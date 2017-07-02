<template>

    <div>

        <h4 class="ui disabled center aligned header">Humidité</h4>

        <table class="ui very basic table">
            <tbody>

                <tr v-for="transmitter in transmitters">

                    <!-- name -->
                    <td>{{transmitter.name | uppercase}}</td>

                    <!-- record -->
                    <td class="right aligned">
                        <humidity-sensor-record :transmitter_id="transmitter.id"></humidity-sensor-record>
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
    import HumiditySensorRecord from './HumiditySensorRecord.vue';

    export default {

        props: [

			// contain the room id
			// @type {Integer}
			'room_id'

		],

        components: {

			HumiditySensorRecord

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
            this.findTransmitterHumiditiesSensors();
        },

        methods: {

            /**
             * get listing of available humidities sensors for a specified room
             *
             * @author shad
             */
            findTransmitterHumiditiesSensors() {

				const query = { query: {

					// linked to the current room id
					'room_id': this.room_id,

					// of type 'temperature'
					type: 'humidity'

				} };

               	transmitterService.find( query )
            	.then( transmitters => this.transmitters = transmitters )
                .catch( this.handlingErrors );

            }

        }

    }

</script>
