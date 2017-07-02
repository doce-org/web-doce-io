<template>

    <div>

        <h4 class="ui disabled center aligned header">Eau</h4>

        <table class="ui very basic table">
            <tbody>

                <tr v-for="transmitter in transmitters">

                    <!-- name -->
                    <td>{{transmitter.name | uppercase}}</td>

                    <!-- record -->
                    <td class="right aligned">
                        <water-meter-record :transmitter_id="transmitter.id"></water-meter-record>
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
    import WaterMeterRecord from './WaterMeterRecord.vue';

    export default {

        props: [

			// contain the room id
			// @type {Integer}
			'room_id'

		],

        components: {

			WaterMeterRecord

		},

        data() {
            return {

				// contain the listing of transmitter water gauge
				// linked to the current room id
				// @type {Array}
                'transmitters': []

            }
        },

        created() {
            this.findTransmitterWaterMeters();
        },

        methods: {

            /**
             * get listing of available water meters for a specified room
             *
             * @author shad
             */
            findTransmitterWaterMeters() {

				const query = { query: {

					// linked to the current room id
					'room_id': this.room_id,

					// of type 'water'
					type: 'water'

				} };

               	transmitterService.find( query )
            	.then( transmitters => this.transmitters = transmitters )
                .catch( this.handlingErrors );

            }

        }

    }

</script>
