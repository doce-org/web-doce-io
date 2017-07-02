<template>

    <div>

        <h4 class="ui disabled center aligned header">Énergie</h4>

        <table class="ui very basic table">
            <tbody>

                <tr v-for="transmitter in transmitters">

                    <!-- name -->
                    <td>{{transmitter.name | uppercase}}</td>

                    <!-- record -->
                    <td class="right aligned">
                        <power-meter-record :transmitter_id="transmitter.id"></power-meter-record>
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
    import PowerMeterRecord from './PowerMeterRecord.vue';

    export default {

        props: [

			// contain the room id
			// @type {Integer}
			'room_id'

		],

        components: {

			PowerMeterRecord

		},

        data() {
            return {

				// contain the listing of transmitter energy gauge
				// linked to the current room id
				// @type {Array}
                'transmitters': []

            }
        },

        created() {
            this.findTransmitterPowerMeters();
        },

        methods: {

            /**
             * get listing of available power for a specified room
             *
             * @author shad
             */
            findTransmitterPowerMeters() {

				const query = { query: {

					// linked to the current room id
					'room_id': this.room_id,

					// of type 'energy'
					type: 'energy'

				} };

               	transmitterService.find( query )
            	.then( transmitters => this.transmitters = transmitters )
                .catch( this.handlingErrors );

            }

        }

    }

</script>
